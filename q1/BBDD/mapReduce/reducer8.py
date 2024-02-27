
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para calcular los top tres tipos de archivos (.gif, .html, etc.) que más tráfico generan en bytes por dominio

import sys

def checkOrden(top_ext, ext, bytes_acumulados):
    # Insertar y ordenar los tipos de archivos por bytes acumulados
    top_ext.append((bytes_acumulados, ext))
    top_ext.sort(reverse=True, key=lambda x: x[0])

    # Mantener solo los tres tipos de archivos con más tráfico
    while len(top_ext) > 3:
        top_ext.pop()

def recorrerStdinReduce():
    # Inicializar una lista de tuplas para almacenar los top tipos de archivos con sus bytes
    top_ext = [(0, ''), (0, ''), (0, '')]
    ext_anterior = ''
    bytes_acumulados = 0

    for linea in sys.stdin:
        ext_actual, bytes_str = linea.split("\t")
        bytes_actuales = int(bytes_str)

        # Acumular bytes para el mismo tipo de archivo
        if ext_actual == ext_anterior:
            bytes_acumulados += bytes_actuales
        else:
            # Procesar el tipo de archivo anterior y comenzar con el nuevo
            checkOrden(top_ext, ext_anterior, bytes_acumulados)
            ext_anterior = ext_actual
            bytes_acumulados = bytes_actuales

    # Procesar el último tipo de archivo
    checkOrden(top_ext, ext_anterior, bytes_acumulados)

    # Imprimir los resultados
    print("Top tres tipos de archivos con más tráfico en bytes:")
    for bytes, ext in top_ext:
        print(f"{ext}\t{bytes}")

# Ejecutar la función
recorrerStdinReduce()
