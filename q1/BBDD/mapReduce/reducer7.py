
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para calcular los top tres dominios que más tráfico tienen en bytes

import sys

def checkOrden(top_dominios, dominio, bytes_acumulados):
    # Insertar y ordenar los dominios por bytes acumulados
    top_dominios.append((bytes_acumulados, dominio))
    top_dominios.sort(reverse=True, key=lambda x: x[0])

    # Mantener solo los tres dominios con más tráfico
    while len(top_dominios) > 3:
        top_dominios.pop()

def recorrerStdinReduce():
    # Inicializar una lista de tuplas para almacenar los top dominios con sus bytes
    top_dominios = [(0, ''), (0, ''), (0, '')]
    dominio_anterior = ''
    bytes_acumulados = 0

    for linea in sys.stdin:
        dominio_actual, bytes_str = linea.strip().split("\t")
        bytes_actuales = int(bytes_str)

        # Acumular bytes para el mismo dominio
        if dominio_actual == dominio_anterior:
            bytes_acumulados += bytes_actuales
        else:
            # Procesar el dominio anterior y comenzar con el nuevo
            checkOrden(top_dominios, dominio_anterior, bytes_acumulados)
            dominio_anterior = dominio_actual
            bytes_acumulados = bytes_actuales

    # Procesar el último dominio
    checkOrden(top_dominios, dominio_anterior, bytes_acumulados)

    # Imprimir los resultados
    print("Top tres dominios con más tráfico en bytes:")
    for bytes, dominio in top_dominios:
        print(f"{dominio}\t{bytes}")

# Ejecutar la función
recorrerStdinReduce()
