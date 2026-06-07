# NutriPlan - Vista móvil

## Cómo ver la app en tu móvil

1. Abre una terminal en la carpeta `Menu Diario`.
2. Ejecuta:

```bash
python3 serve.py
```

3. El script te mostrará la dirección local exacta.
4. Abre en el móvil el navegador e ingresa la URL que imprima el script, por ejemplo:

```text
http://192.168.1.12:8000
```

> Si el script no funciona, usa este comando alternativo:
>
> ```bash
> python3 -m http.server 8000
> ```
>
> Luego abre `http://<tu-ip-local>:8000` en el móvil.

## Uso con Tailscale

Si quieres acceder al menú desde otro móvil sin depender de la red Wi-Fi local, instala Tailscale en ambos dispositivos y actívalo.

1. Instala Tailscale en el ordenador donde vas a ejecutar `serve.py`.
2. Inicia sesión y ejecuta `tailscale up`.
3. Obtén la IP de Tailscale con `tailscale ip -4`.
4. En el móvil, abre el navegador e ingresa:

```text
http://<ip-de-tailscale>:8000
```

## Nota importante

- No necesitas abrir VS Code para usar la app. Basta con tener Python 3 instalado y ejecutar el servidor local.
- Las cantidades de ingredientes están fijadas por receta y no se escalan automáticamente según el número de comensales.
