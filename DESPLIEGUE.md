# Publicar y mantener NutriPlan (GitHub Pages)

La app está publicada en **https://florrincheptine-sketch.github.io/** desde el
repositorio `florrincheptine-sketch/florrincheptine-sketch.github.io` (la URL es
corta porque el repo lleva el nombre especial de usuario de GitHub Pages).

## Publicar cambios

En la carpeta del proyecto, ejecuta:

```bash
./publicar.sh
```

Las credenciales ya están guardadas en este equipo (`~/.git-credentials`).
Si el token caduca o se revoca, crea otro en
https://github.com/settings/tokens → "Tokens (classic)" → permiso `repo`.

## Salir en Google (Search Console)

Google tarda semanas en encontrar una web nueva por sí solo. Para acelerarlo:

1. Entra en https://search.google.com/search-console con tu cuenta de Google.
2. Añade la propiedad **Prefijo de URL**: `https://florrincheptine-sketch.github.io/`
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
