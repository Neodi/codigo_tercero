
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para calcular el balance de tráfico en bytes por dominio, sumando las descargas (GET) y restando las subidas (POST)

import sys

def reducer_rapido():
    # Inicializar variables para el dominio actual y los bytes actuales
    dominio_actual = 'z'  # Valor inicial arbitrario
    bytes_actuales = 0

    for linea in sys.stdin:
        linea = linea.strip()
        dominio, tipo_peticion, bytes_str = linea.split('\t')
        bytes = int(bytes_str)

        # Si el dominio cambia, imprimir el balance anterior y reiniciar el contador
        if dominio != dominio_actual:
            print(f"{dominio_actual}\t{bytes_actuales}")
            bytes_actuales = 0

        dominio_actual = dominio

        # Sumar o restar los bytes dependiendo del tipo de petición
        if tipo_peticion == 'GET':
            bytes_actuales += bytes
        elif tipo_peticion == 'POST':
            bytes_actuales -= bytes

    # Imprimir el balance del último dominio
    print(f"{dominio_actual}\t{bytes_actuales}")

# Ejecutar la función
reducer_rapido()
