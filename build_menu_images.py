# Resuelve UNA VEZ la foto de cada plato local (menu semanal + platos del mundo)
# desde Wikipedia y la guarda en menu_images.json, para que la app no busque fotos en vivo.
import re, json, time, os, urllib.request, urllib.parse

UA = {'User-Agent': 'Mozilla/5.0'}

src = open('app.js', encoding='utf-8').read()
titles = re.findall(r"createRecipe\(\s*'((?:[^'\\]|\\.)*)'", src)
titles = [t.replace("\\'", "'") for t in titles]

# Platos del mundo (worldRaw): titulos dentro de los arrays por categoria.
m = re.search(r'const worldRaw = \{(.*?)\n\};', src, re.S)
if m:
    for arr in re.findall(r'\[([^\]]*)\]', m.group(1)):
        titles += [t.replace("\\'", "'") for t in re.findall(r"'((?:[^'\\]|\\.)*)'", arr)]

# Excepciones definidas en la app (titulo -> articulo de Wikipedia).
overrides = {}
m = re.search(r'const dishWikiOverride = \{(.*?)\n\};', src, re.S)
if m:
    for k, v in re.findall(r"'((?:[^'\\]|\\.)*)':\s*'((?:[^'\\]|\\.)*)'", m.group(1)):
        overrides[k.replace("\\'", "'")] = v.replace("\\'", "'")

titles = list(dict.fromkeys(titles))  # unicos, en orden
print('platos a resolver:', len(titles), flush=True)

CONNECTORS = re.compile(r' cu | con | a la | al | la | en salsa | estilo | de temporada | caser', re.I)

def queries(title):
    no_paren = re.sub(r'\(.*?\)', '', title).strip()
    first = CONNECTORS.split(no_paren)[0].strip()
    out = [title, no_paren]
    if first and first != no_paren:
        out.append(first)
    seen, res = set(), []
    for q in out:
        if q and q not in seen:
            seen.add(q); res.append(q)
    return res

def summary_img(lang, q):
    try:
        url = 'https://%s.wikipedia.org/api/rest_v1/page/summary/%s' % (lang, urllib.parse.quote(q))
        req = urllib.request.Request(url, headers=UA)
        d = json.load(urllib.request.urlopen(req, timeout=20))
        src = (d.get('thumbnail') or {}).get('source')
        if src:
            return re.sub(r'/\d+px-', '/640px-', src)
    except Exception:
        return None
    return None

def search_img(lang, term):
    try:
        url = ('https://%s.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=%s'
               '&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=640&format=json&origin=*'
               % (lang, urllib.parse.quote(term)))
        req = urllib.request.Request(url, headers=UA)
        d = json.load(urllib.request.urlopen(req, timeout=20))
        pages = (d.get('query') or {}).get('pages') or {}
        for p in pages.values():
            src = (p.get('thumbnail') or {}).get('source')
            if src:
                return src
    except Exception:
        return None
    return None

def resolve(title):
    qs = ([overrides[title]] if title in overrides else []) + queries(title)
    for lang in ('es', 'ro', 'en'):
        for q in qs:
            img = summary_img(lang, q)
            if img:
                return img
            time.sleep(0.15)
    term = qs[-1]
    for lang in ('es', 'ro', 'en'):
        img = search_img(lang, term)
        if img:
            return img
        time.sleep(0.15)
    return None

# Reanudar: conserva lo ya resuelto (solo busca titulos nuevos o sin foto).
result = {}
if os.path.exists('menu_images.json'):
    try:
        result = json.load(open('menu_images.json'))
    except Exception:
        result = {}

ok = sum(1 for t in titles if result.get(t))
for i, t in enumerate(titles, 1):
    if result.get(t):
        continue
    img = resolve(t)
    result[t] = img
    if img:
        ok += 1
    if i % 10 == 0 or i == len(titles):
        json.dump(result, open('menu_images.json', 'w'), ensure_ascii=False, indent=0)
        print('%d/%d  con foto:%d' % (i, len(titles), ok), flush=True)

json.dump(result, open('menu_images.json', 'w'), ensure_ascii=False, indent=0)
print('LISTO fotos_locales=%d/%d' % (ok, len(titles)), flush=True)
