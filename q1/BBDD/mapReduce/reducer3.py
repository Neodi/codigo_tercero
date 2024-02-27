
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para calcular la media/porcentaje de peticiones por tipo (GET, POST, PUT, etc.)

import sys

def recorrerStdinReduceCHAT():
    # Diccionario para almacenar la frecuencia de cada tipo de petición
    lineas_frecuencias = {}
    nLineas = 0
    for linea in sys.stdin:
        nLineas += 1
        linea = linea.strip()
        # Actualizar el diccionario de frecuencias
        lineas_frecuencias[linea] = lineas_frecuencias.get(linea, 0) + 1

    # Imprimir el porcentaje de cada tipo de petición
    for linea, frecuencia in lineas_frecuencias.items():
        porcentaje = (frecuencia / nLineas) * 100
        print(f"{linea}	: {porcentaje:.2f}%")

# Ejecutar la función
recorrerStdinReduceCHAT()
