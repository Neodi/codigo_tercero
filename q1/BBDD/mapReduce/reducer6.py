
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para calcular el incremento/decremento por hora (en porcentaje) del tráfico en bytes

import sys

def recorrerStdinReduce():
    # Inicializar variables para almacenar los bytes actuales, anteriores y la hora anterior
    bytes_actuales = 0
    bytes_anteriores = 0
    hora_anterior = '0'
    print(f"hora\tvariación_%")

    for linea in sys.stdin:
        lista = linea.split("\t")
        hora_actual = lista[0]

        # Si la hora actual es diferente a la anterior, calcular la variación
        if(hora_anterior != hora_actual):
            variacion = bytes_actuales - bytes_anteriores
            if(bytes_anteriores != 0):
                porcentaje = (variacion/bytes_anteriores)*100
                porcentaje = f"{porcentaje:.6f}"
            else:   
                porcentaje = 'infinito'
            print(f"{hora_anterior}\t{porcentaje}")
            hora_anterior = hora_actual
            bytes_anteriores = bytes_actuales
            bytes_actuales = 0

        # Sumar los bytes actuales
        bytes_actuales += int(lista[1])

# Ejecutar la función
recorrerStdinReduce()
