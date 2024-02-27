
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para contar el número de peticiones GET

import sys

def recorrerStdinReduce():
    # Inicializar un contador para peticiones GET
    numGET = 0

    # Iterar a través de cada línea de la entrada estándar
    for linea in sys.stdin:
        # Incrementar el contador por cada línea, asumiendo que cada línea representa una petición GET
        numGET += 1

    # Imprimir el número total de peticiones GET
    print(numGET)

# Ejecutar la función
recorrerStdinReduce()
