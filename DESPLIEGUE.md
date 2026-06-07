# Publicar NutriPlan gratis en internet (GitHub Pages)

La app es 100% estática (HTML + JS + CSS), así que se puede alojar gratis y sin
servidor. Las recetas, fotos y traducciones se obtienen de servicios públicos
gratuitos desde el navegador del usuario. **No hace falta login: es abierta.**

El repositorio ya está inicializado y con un primer commit hecho. Solo falta
subirlo a tu cuenta de GitHub y activar Pages.

## Opción A — GitHub Pages (la que elegiste)

1. Entra en https://github.com y crea un repositorio **público** nuevo, por
   ejemplo `menu-diario`. **No** marques "Add a README".

2. En una terminal, dentro de la carpeta `Menu Diario`, ejecuta (cambia
   `TU-USUARIO` por tu usuario de GitHub):

   ```bash
   git remote add origin https://github.com/TU-USUARIO/menu-diario.git
   git branch -M main
   git push -u origin main
   ```

   Te pedirá usuario y un **token** (no la contraseña). Crea el token en
   https://github.com/settings/tokens (Tokens classic → marca el permiso `repo`).

3. En GitHub, ve a tu repo → **Settings** → **Pages**:
   - **Source**: *Deploy from a branch*
   - **Branch**: `main` y carpeta `/ (root)` → **Save**

4. Espera ~1 minuto. Tu app estará en:

   ```
   https://TU-USUARIO.github.io/menu-diario/
   ```

   Ese enlace lo puedes abrir y compartir desde cualquier móvil u ordenador.

## Opción B — Más fácil aún, sin comandos (Netlify Drop)

Si prefieres no usar git:

1. Entra en https://app.netlify.com/drop
2. Arrastra la carpeta `Menu Diario` entera a la página.
3. Te dará una URL pública gratuita al instante (puedes personalizar el nombre).

## Notas

- `serve.py` solo sirve para verlo en tu móvil por la red local; **no es
  necesario** para la web publicada.
- Si actualizas el código, vuelve a hacer `git add -A && git commit -m "cambios"
  && git push` y Pages se actualiza solo.
