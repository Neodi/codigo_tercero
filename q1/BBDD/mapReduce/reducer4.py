
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mostrar los tipos de respuesta por familia (2XX, 3XX, 4XX y 5XX) por tipo de petición (GET, POST, PUT, etc.)

import sys

def recorrerStdinReduce():
    # Conjunto para almacenar las líneas ya vistas
    lineas_vistas = set()

    for linea in sys.stdin:
        linea = linea.strip("
")    
        # Si la línea no ha sido vista antes, imprímela
        if(linea not in lineas_vistas):
            lineas_vistas.add(linea)
            print(linea)

# Ejecutar la función
recorrerStdinReduce()
