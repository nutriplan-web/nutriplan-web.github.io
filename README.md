# NutriPlan

Planificador de menú semanal con recetario mundial (+1100 platos en español
con receta completa), cantidades por comensales y lista de la compra automática.
App web estática e instalable (PWA), funciona sin conexión.

**Web:** https://nutriplan-web.github.io/

## Estructura

- `index.html`, `app.js`, `styles.css` — la aplicación.
- `recipes.json` — 666 recetas de TheMealDB ya traducidas al español
  (se genera una sola vez con `build_recipes.py`).
- `world_recipes.json` — 364 platos famosos del mundo con receta completa
  en español (ingredientes para 2 raciones y preparación detallada).
- `menu_images.json` — fotos pre-resueltas de los platos locales y del mundo
  (se genera una sola vez con `build_menu_images.py`).
- `sw.js`, `manifest.json` — instalación y modo sin conexión.
- `robots.txt`, `sitemap.xml`, `og-image.png` — SEO y vista previa al compartir.

La app **no llama a APIs externas en vivo** para recetas, traducción ni fotos:
todo viene empaquetado en los JSON. Si añades platos nuevos, vuelve a ejecutar
los scripts `build_*.py` y haz commit de los JSON actualizados.

## Ver la app en local

```bash
python3 serve.py
```

El script imprime la dirección para abrirla desde el móvil en la misma red
(por ejemplo `http://192.168.1.12:8000`).

## Publicar cambios

```bash
./publicar.sh
```

(o `git add -A && git commit -m "cambios" && git push`). GitHub Pages se
actualiza solo en ~1 minuto.
