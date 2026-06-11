#!/usr/bin/env bash
# Publica NutriPlan en GitHub Pages: añade los cambios, hace commit y push.
# Si GitHub pide credenciales: tu usuario + un token "classic" con permiso repo
# (https://github.com/settings/tokens).
set -e
cd "$(dirname "$0")"

# Si el repo ya se renombró a florrincheptine-sketch.github.io, apunta el remoto ahí.
if git ls-remote https://github.com/florrincheptine-sketch/florrincheptine-sketch.github.io.git HEAD >/dev/null 2>&1; then
  git remote set-url origin https://github.com/florrincheptine-sketch/florrincheptine-sketch.github.io.git
fi

git add -A
if ! git diff --cached --quiet; then
  echo "Mensaje del commit (Enter para usar uno genérico):"
  read -r MSG
  git commit -m "${MSG:-Actualización de NutriPlan}"
else
  echo "No hay cambios nuevos que commitear; subiendo lo pendiente…"
fi

git push -u origin main
echo
echo "✔ Subido. GitHub Pages se actualiza en ~1 minuto."
