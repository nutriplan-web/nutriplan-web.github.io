#!/usr/bin/env python3
import http.server
import socket
import socketserver
import sys
from contextlib import closing


def get_local_ip():
    try:
        with closing(socket.socket(socket.AF_INET, socket.SOCK_DGRAM)) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        try:
            return socket.gethostbyname(socket.gethostname())
        except Exception:
            return "127.0.0.1"


def main():
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass

    local_ip = get_local_ip()
    print("Iniciando el servidor Python 3 para el proyecto Menu Diario")
    print(f"Abre en tu móvil: http://{local_ip}:{port}")
    print("Presiona Ctrl+C para detener el servidor.")
    print("Si usas Tailscale, abre http://<tu-ip-de-tailscale>:8000 desde el móvil.")

    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("0.0.0.0", port), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")


if __name__ == "__main__":
    main()
