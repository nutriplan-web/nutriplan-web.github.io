# Descarga las 666 recetas de TheMealDB y las traduce al espanol UNA VEZ,
# dejandolas guardadas en recipes.json para que la app funcione rapido y sin internet.
import urllib.request, urllib.parse, json, time, sys, os

CAT = {
    'Beef': 'Carne', 'Chicken': 'Pollo', 'Pork': 'Cerdo', 'Lamb': 'Cordero', 'Goat': 'Cabra',
    'Seafood': 'Pescado y marisco', 'Pasta': 'Pasta', 'Dessert': 'Postres', 'Breakfast': 'Desayuno',
    'Vegan': 'Vegano', 'Vegetarian': 'Vegetariano', 'Side': 'Guarnicion', 'Starter': 'Aperitivos',
    'Miscellaneous': 'Varios'
}
AREA = {
    'American': 'Estadounidense', 'British': 'Britanica', 'Canadian': 'Canadiense', 'Chinese': 'China',
    'Croatian': 'Croata', 'Dutch': 'Holandesa', 'Egyptian': 'Egipcia', 'Filipino': 'Filipina', 'French': 'Francesa',
    'Greek': 'Griega', 'Indian': 'India', 'Irish': 'Irlandesa', 'Italian': 'Italiana', 'Jamaican': 'Jamaicana',
    'Japanese': 'Japonesa', 'Kenyan': 'Keniana', 'Malaysian': 'Malasia', 'Mexican': 'Mexicana', 'Moroccan': 'Marroqui',
    'Polish': 'Polaca', 'Portuguese': 'Portuguesa', 'Russian': 'Rusa', 'Spanish': 'Espanola', 'Thai': 'Tailandesa',
    'Tunisian': 'Tunecina', 'Turkish': 'Turca', 'Ukrainian': 'Ucraniana', 'Vietnamese': 'Vietnamita',
    'Algerian': 'Argelina', 'Argentinian': 'Argentina', 'Australian': 'Australiana', 'Norwegian': 'Noruega',
    'Saudi Arabian': 'Saudi', 'Slovakian': 'Eslovaca', 'Syrian': 'Siria', 'Uruguayan': 'Uruguaya',
    'Venezuelan': 'Venezolana', 'Unknown': 'Internacional'
}

UA = {'User-Agent': 'Mozilla/5.0', 'Origin': 'https://nutriplan.app'}

def get(url, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            return json.load(urllib.request.urlopen(req, timeout=25))
        except Exception as e:
            if i == tries - 1:
                raise
            time.sleep(1.5 * (i + 1))

def translate(text, tries=5):
    if not text.strip():
        return text
    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + urllib.parse.quote(text)
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            d = json.load(urllib.request.urlopen(req, timeout=25))
            return ''.join(seg[0] for seg in d[0] if seg[0])
        except Exception:
            time.sleep(1.5 * (i + 1))
    return None  # marca fallo

def chunk(text, mx=3500):
    out, cur = [], ''
    for part in text.split('\n'):
        if len(cur) + len(part) + 1 > mx and cur:
            out.append(cur); cur = part
        else:
            cur = cur + '\n' + part if cur else part
    if cur:
        out.append(cur)
    return out

# 1) Descargar todas las recetas
meals = {}
for L in 'abcdefghijklmnopqrstuvwxyz':
    d = get('https://www.themealdb.com/api/json/v1/1/search.php?f=' + L)
    for m in (d.get('meals') or []):
        meals[m['idMeal']] = m
    print('fetch', L, len(meals), flush=True)

ids = sorted(meals.keys(), key=int)
print('TOTAL recetas:', len(ids), flush=True)

# 2) Reanudar si ya hay progreso
out_path = 'recipes.json'
done = {}
if os.path.exists(out_path):
    try:
        done = {r['id']: r for r in json.load(open(out_path))}
    except Exception:
        done = {}

failures = []
results = dict(done)
for n, mid in enumerate(ids, 1):
    if mid in done:
        continue
    m = meals[mid]
    ings = []
    for i in range(1, 21):
        ing = (m.get('strIngredient%d' % i) or '').strip()
        mea = (m.get('strMeasure%d' % i) or '').strip()
        if ing:
            ings.append((mea + ' ' + ing).strip() if mea else ing)
    title_en = (m.get('strMeal') or '').strip()
    instr_en = (m.get('strInstructions') or '').strip()

    # Traducir titulo + ingredientes en una llamada (newline-preserving)
    head_payload = title_en + '\n' + '\n'.join(ings)
    head_es = translate(head_payload)
    time.sleep(0.25)
    # Traducir instrucciones (troceadas si son largas)
    instr_es_parts = []
    ok_instr = True
    for c in chunk(instr_en):
        t = translate(c)
        time.sleep(0.25)
        if t is None:
            ok_instr = False; break
        instr_es_parts.append(t)

    if head_es is None or not ok_instr:
        failures.append(mid)
        title_es = title_en
        ings_es = ings
        instr_es = instr_en
    else:
        lines = head_es.split('\n')
        title_es = lines[0].strip() if lines else title_en
        ings_es = [l.strip() for l in lines[1:] if l.strip()]
        if len(ings_es) != len(ings):  # desajuste -> conserva originales por seguridad
            ings_es = ings
        instr_es = '\n'.join(instr_es_parts)

    results[mid] = {
        'id': mid,
        'title': title_es,
        'titleEN': title_en,
        'category': CAT.get(m.get('strCategory'), m.get('strCategory') or 'Varios'),
        'area': AREA.get(m.get('strArea'), m.get('strArea') or 'Internacional'),
        'image': m.get('strMealThumb') or '',
        'ingredients': ings_es,
        'instructions': instr_es
    }

    if n % 10 == 0 or n == len(ids):
        json.dump([results[k] for k in sorted(results, key=int)], open(out_path, 'w'),
                  ensure_ascii=False, indent=0)
        print('progreso %d/%d  fallos:%d' % (len(results), len(ids), len(failures)), flush=True)

json.dump([results[k] for k in sorted(results, key=int)], open(out_path, 'w'),
          ensure_ascii=False, indent=0)
print('LISTO. total=%d fallos=%d %s' % (len(results), len(failures), failures), flush=True)
