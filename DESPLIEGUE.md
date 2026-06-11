# Publicar y mantener NutriPlan (GitHub Pages)

La app está publicada con GitHub Pages desde el repositorio
`florrincheptine-skech/menu-diario`.

## Dirección corta (un solo paso, gratis)

Para que la app quede en **https://florrincheptine-skech.github.io/** (sin el
`/menu-diario/` final), renombra el repositorio:

1. Abre https://github.com/florrincheptine-skech/menu-diario/settings
2. En el primer campo ("Repository name") escribe exactamente:
   `florrincheptine-skech.github.io`
3. Pulsa **Rename**.
4. Ve a **Settings → Pages** y comprueba que Source sigue siendo
   *Deploy from a branch* → `main` → `/ (root)`.
5. En ~1 minuto la app responde en https://florrincheptine-skech.github.io/

> El enlace antiguo (…/menu-diario/) dejará de funcionar; comparte el nuevo.

## Publicar cambios

En la carpeta del proyecto, ejecuta:

```bash
./publicar.sh
```

Te pedirá tu usuario de GitHub y un **token** (créalo en
https://github.com/settings/tokens → "Tokens (classic)" → permiso `repo`).

## Salir en Google (Search Console)

Google tarda semanas en encontrar una web nueva por sí solo. Para acelerarlo:

1. Entra en https://search.google.com/search-console con tu cuenta de Google.
2. Añade la propiedad **Prefijo de URL**: `https://florrincheptine-skech.github.io/`
3. Verifica con la opción **Etiqueta HTML**: te dará una línea tipo
   `<meta name="google-site-verification" content="XXXX"/>`.
   Pásamela y la añado al `index.html` (o pégala tú dentro de `<head>`),
   publica con `./publicar.sh` y pulsa "Verificar".
4. En Search Console, ve a **Sitemaps** y envía: `sitemap.xml`
5. En **Inspección de URLs**, pega la URL de la app y pulsa
   **Solicitar indexación**.

Con esto Google suele indexar en días. La app ya incluye título, descripción,
datos estructurados, `robots.txt` y `sitemap.xml` para salir bien presentada.

## Notas

- `serve.py` es solo para verla en local/móvil; no afecta a la web publicada.
- Si regeneras recetas o fotos (`build_recipes.py`, `build_menu_images.py`),
  recuerda publicar también los JSON.
