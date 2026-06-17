# Genera las traducciones de la app UNA VEZ (mismo método que build_recipes.py):
#   i18n_ro.json    -> menú semanal español + zumos + líquidos, traducidos al rumano
#   i18n_es.json    -> platos rumanos del menú, traducidos al español
#   i18n_en.json    -> menú completo (ES y RO) + zumos + líquidos, traducidos al inglés
#   catalog_ro.json -> recetario completo (recipes.json + world_recipes.json) en rumano
#   catalog_en.json -> recetario completo en inglés (usa titleEN original si existe)
# Uso:  python3 build_i18n.py --dry         (solo extrae y cuenta, sin red)
#       python3 build_i18n.py --menu        (traduce el menú a RO y ES, rápido)
#       python3 build_i18n.py --menu-en     (traduce el menú al inglés, rápido)
#       python3 build_i18n.py --catalog     (recetario a rumano, lento, reanudable)
#       python3 build_i18n.py --catalog-en  (recetario a inglés, lento, reanudable)
import json, re, time, urllib.request, urllib.parse, os, sys

UA = {'User-Agent': 'Mozilla/5.0'}

def translate(text, sl, tl, tries=5):
    if not text.strip():
        return text
    url = ('https://translate.googleapis.com/translate_a/single?client=gtx&sl=%s&tl=%s&dt=t&q=' % (sl, tl)) + urllib.parse.quote(text)
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            d = json.load(urllib.request.urlopen(req, timeout=25))
            return ''.join(seg[0] for seg in d[0] if seg[0])
        except Exception:
            time.sleep(1.5 * (i + 1))
    return None

def translate_lines(lines, sl, tl):
    """Traduce una lista de líneas conservando el número de líneas."""
    out = []
    buf = []
    def flush():
        if not buf:
            return
        t = translate('\n'.join(buf), sl, tl)
        time.sleep(0.25)
        parts = [p.strip() for p in t.split('\n')] if t is not None else []
        if len(parts) != len(buf):
            parts = []
            for l in buf:  # desajuste: una a una (lento pero seguro)
                tt = translate(l, sl, tl)
                time.sleep(0.25)
                parts.append((tt or l).strip())
        out.extend(parts)
        buf.clear()
    for l in lines:
        if buf and sum(len(x) + 1 for x in buf) + len(l) > 3000:
            flush()
        buf.append(l)
    flush()
    return out

def translate_block(text, sl, tl):
    """Traduce un texto largo troceándolo por párrafos."""
    chunks, cur = [], ''
    for part in text.split('\n'):
        if len(cur) + len(part) + 1 > 3000 and cur:
            chunks.append(cur); cur = part
        else:
            cur = cur + '\n' + part if cur else part
    if cur:
        chunks.append(cur)
    out = []
    for c in chunks:
        t = translate(c, sl, tl)
        time.sleep(0.25)
        out.append(t if t is not None else c)
    return '\n'.join(out)

def translate_liquid(d, sl, tl):
    """Traduce un líquido del menú con todo su detalle: {t,v,i,s,b}."""
    det = LIQ_DETAILS.get(d['name'], {})
    ings = det.get('ingredients', [])
    prep = det.get('prep', '')
    btext = det.get('benefitsText', '')
    lines = translate_lines([d['name'], d['value']] + ings + [prep, btext], sl, tl)
    n = len(ings)
    return {'t': lines[0], 'v': lines[1], 'i': lines[2:2 + n],
            's': lines[2 + n], 'b': lines[3 + n]}

# --------------------------------------------------------------------------
# Extracción de datos de app.js
# --------------------------------------------------------------------------
SRC = open('app.js', encoding='utf-8').read()

def unq(s):
    s = s.strip()
    if s and s[0] in '\'"':
        return s[1:-1].replace("\\'", "'").replace('\\"', '"')
    return s

def find_calls(name, text):
    """Localiza llamadas name(...) y separa sus argumentos de primer nivel."""
    calls = []
    i = 0
    while True:
        j = text.find(name + '(', i)
        if j < 0:
            break
        if text[max(0, j - 9):j] == 'function ':
            i = j + 1
            continue
        k = j + len(name) + 1
        depth, instr, q = 1, False, ''
        args, cur = [], ''
        while depth > 0 and k < len(text):
            c = text[k]
            if instr:
                cur += c
                if c == '\\':
                    cur += text[k + 1]; k += 1
                elif c == q:
                    instr = False
            else:
                if c in '\'"`':
                    instr, q = True, c; cur += c
                elif c in '([{':
                    depth += 1; cur += c
                elif c in ')]}':
                    depth -= 1
                    if depth == 0:
                        args.append(cur.strip()); break
                    cur += c
                elif c == ',' and depth == 1:
                    args.append(cur.strip()); cur = ''
                else:
                    cur += c
            k += 1
        calls.append((j, args))
        i = k
    return calls

menu_start = SRC.find('const menuData = {')
ro_start = SRC.find('  ro: {', menu_start)
menu_end = SRC.find('const dietRules', menu_start)

dishes = {'es': [], 'ro': []}
for pos, args in find_calls('createRecipe', SRC[menu_start:menu_end]):
    title = unq(args[0])
    ings = [unq(m) for m in re.findall(r"name:\s*('(?:[^'\\]|\\.)*')", args[4])]
    instr = unq(args[5])
    origin = 'ro' if (pos + menu_start) > ro_start else 'es'
    dishes[origin].append({'title': title, 'ings': ings, 'instr': instr})

liquids = {'es': [], 'ro': []}
for m in re.finditer(r"\{ name: '((?:[^'\\]|\\.)*)', value: '((?:[^'\\]|\\.)*)' \}", SRC[menu_start:menu_end]):
    origin = 'ro' if (m.start() + menu_start) > ro_start else 'es'
    liquids[origin].append({'name': unq("'%s'" % m.group(1)), 'value': unq("'%s'" % m.group(2))})

# Detalle de los líquidos (LIQUID_DETAILS es JSON válido dentro de app.js).
_ld_start = SRC.find('const LIQUID_DETAILS = ')
_ld_brace = SRC.find('{', _ld_start)
_ld_end = SRC.find('\n};', _ld_brace)
LIQ_DETAILS = json.loads(SRC[_ld_brace:_ld_end] + '}')

juice_start = SRC.find('const juiceData = [')
juice_end = SRC.find('].map(', juice_start)
juices = []
for entry in re.finditer(
    r"\{ title: '((?:[^'\\]|\\.)*)',.*?benefitsText: '((?:[^'\\]|\\.)*)',\s*ingredients: \[(.*?)\],\s*instructions: '((?:[^'\\]|\\.)*)'",
    SRC[juice_start:juice_end], re.S):
    title, btext, ings_raw, instr = entry.groups()
    ings = [unq(x) for x in re.findall(r"'(?:[^'\\]|\\.)*'", ings_raw)]
    juices.append({'title': unq("'%s'" % title), 'b': unq("'%s'" % btext),
                   'ings': ings, 'instr': unq("'%s'" % instr)})

print('Extraído: %d platos ES, %d platos RO, %d líquidos ES, %d líquidos RO, %d zumos'
      % (len(dishes['es']), len(dishes['ro']), len(liquids['es']), len(liquids['ro']), len(juices)), flush=True)

if '--dry' in sys.argv:
    for d in dishes['es'][:2] + dishes['ro'][:2]:
        print(' ·', d['title'], '|', len(d['ings']), 'ingredientes')
    for j in juices[:2]:
        print(' ·', j['title'], '|', len(j['ings']), 'líneas')
    sys.exit(0)

# --------------------------------------------------------------------------
# Menú: i18n_ro.json (ES->RO) e i18n_es.json (RO->ES)
# --------------------------------------------------------------------------
if '--menu' in sys.argv:
    for target, sl, tl, dish_list, liq_list, juice_list in (
            ('i18n_ro.json', 'es', 'ro', dishes['es'], liquids['es'], juices),
            ('i18n_es.json', 'ro', 'es', dishes['ro'], liquids['ro'], [])):
        out = {}
        for n, d in enumerate(dish_list, 1):
            lines = translate_lines([d['title']] + d['ings'] + [d['instr']], sl, tl)
            out[d['title']] = {'t': lines[0], 'i': lines[1:-1], 's': lines[-1]}
            if n % 10 == 0:
                print('%s platos %d/%d' % (target, n, len(dish_list)), flush=True)
        for d in liq_list:
            out[d['name']] = translate_liquid(d, sl, tl)
        for n, j in enumerate(juice_list, 1):
            lines = translate_lines([j['title']] + j['ings'] + [j['instr'], j['b']], sl, tl)
            out[j['title']] = {'t': lines[0], 'i': lines[1:-2], 's': lines[-2], 'b': lines[-1]}
            if n % 10 == 0:
                print('%s zumos %d/%d' % (target, n, len(juice_list)), flush=True)
        json.dump(out, open(target, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
        print('OK %s (%d entradas)' % (target, len(out)), flush=True)

# --------------------------------------------------------------------------
# Menú completo al inglés: i18n_en.json (ES->EN y RO->EN en una sola tabla)
# --------------------------------------------------------------------------
if '--menu-en' in sys.argv:
    out = {}
    for sl, dish_list, liq_list, juice_list in (
            ('es', dishes['es'], liquids['es'], juices),
            ('ro', dishes['ro'], liquids['ro'], [])):
        for n, d in enumerate(dish_list, 1):
            lines = translate_lines([d['title']] + d['ings'] + [d['instr']], sl, 'en')
            out[d['title']] = {'t': lines[0], 'i': lines[1:-1], 's': lines[-1]}
            if n % 10 == 0:
                print('i18n_en.json platos %s %d/%d' % (sl, n, len(dish_list)), flush=True)
        for d in liq_list:
            out[d['name']] = translate_liquid(d, sl, 'en')
        for n, j in enumerate(juice_list, 1):
            lines = translate_lines([j['title']] + j['ings'] + [j['instr'], j['b']], sl, 'en')
            out[j['title']] = {'t': lines[0], 'i': lines[1:-2], 's': lines[-2], 'b': lines[-1]}
            if n % 10 == 0:
                print('i18n_en.json zumos %d/%d' % (n, len(juice_list)), flush=True)
    json.dump(out, open('i18n_en.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print('OK i18n_en.json (%d entradas)' % len(out), flush=True)

# --------------------------------------------------------------------------
# Recetario completo: catalog_ro.json (ES->RO) / catalog_en.json (ES->EN),
# reanudables. En inglés se usa titleEN original de TheMealDB si existe.
# --------------------------------------------------------------------------
for flag, out_path, tl in (('--catalog', 'catalog_ro.json', 'ro'), ('--catalog-en', 'catalog_en.json', 'en')):
    if flag not in sys.argv:
        continue
    done = {}
    if os.path.exists(out_path):
        try:
            done = json.load(open(out_path, encoding='utf-8'))
        except Exception:
            done = {}
    jobs = []
    for r in json.load(open('recipes.json', encoding='utf-8')):
        jobs.append(('db:' + r['id'], r['title'], r.get('ingredients') or [], r.get('instructions') or '', r.get('titleEN')))
    for r in json.load(open('world_recipes.json', encoding='utf-8')):
        jobs.append(('w:' + r['title'], r['title'], r.get('ingredients') or [], r.get('instructions') or '', None))
    print('Recetario -> %s: %d recetas (%d ya hechas)' % (tl, len(jobs), len(done)), flush=True)
    fails = 0
    for n, (key, title, ings, instr, title_en) in enumerate(jobs, 1):
        if key in done:
            continue
        try:
            lines = translate_lines([title] + ings, 'es', tl)
            s = translate_block(instr, 'es', tl) if instr else ''
            t_out = title_en if (tl == 'en' and title_en) else lines[0]
            done[key] = {'t': t_out, 'i': lines[1:], 's': s}
        except Exception as e:
            fails += 1
            print('FALLO %s: %s' % (key, e), flush=True)
        if n % 10 == 0 or n == len(jobs):
            json.dump(done, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
            print('catálogo %s %d/%d  fallos:%d' % (tl, len(done), len(jobs), fails), flush=True)
    json.dump(done, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print('LISTO catálogo %s: %d entradas, %d fallos' % (tl, len(done), fails), flush=True)

# --------------------------------------------------------------------------
# Colecciones por secciones: secciones_ro.json / secciones_en.json, reanudables.
# Estructura: { "sec:<id>": "<título>", "<dish.id>": {t,i,s} }
#   python3 build_i18n.py --secciones      (a rumano)
#   python3 build_i18n.py --secciones-en   (a inglés)
# --------------------------------------------------------------------------
for flag, out_path, tl in (('--secciones', 'secciones_ro.json', 'ro'), ('--secciones-en', 'secciones_en.json', 'en')):
    if flag not in sys.argv:
        continue
    done = {}
    if os.path.exists(out_path):
        try:
            done = json.load(open(out_path, encoding='utf-8'))
        except Exception:
            done = {}
    data = json.load(open('secciones.json', encoding='utf-8'))['secciones']
    jobs = []
    for s in data:
        jobs.append(('sec:' + s['id'], None, s['titulo'], None))  # título de sección
        for d in s['platos']:
            jobs.append((d['id'], d['title'], None, (d.get('ingredients') or [], d.get('instructions') or '')))
    total = len(jobs)
    print('Secciones -> %s: %d entradas (%d ya hechas)' % (tl, total, len(done)), flush=True)
    fails = 0
    for n, (key, title, sectitle, body) in enumerate(jobs, 1):
        if key in done:
            continue
        try:
            if sectitle is not None:          # título de sección
                done[key] = translate(sectitle, 'es', tl) or sectitle
                time.sleep(0.25)
            else:                              # plato: {t,i,s}
                ings, instr = body
                lines = translate_lines([title] + ings, 'es', tl)
                s_out = translate_block(instr, 'es', tl) if instr else ''
                done[key] = {'t': lines[0], 'i': lines[1:], 's': s_out}
        except Exception as e:
            fails += 1
            print('FALLO %s: %s' % (key, e), flush=True)
        if n % 10 == 0 or n == total:
            json.dump(done, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
            print('secciones %s %d/%d  fallos:%d' % (tl, len(done), total, fails), flush=True)
    json.dump(done, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print('LISTO secciones %s: %d entradas, %d fallos' % (tl, len(done), fails), flush=True)
