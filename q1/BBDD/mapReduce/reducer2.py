
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para contar el número de peticiones por tipo (GET, POST, PUT, etc.)
# Nota: No se puede usar un diccionario para contar

import sys

def recorrerStdinReduceCHAT():
    # Variable temporal para almacenar el tipo de petición de la línea anterior
    temp = ""
    # Contador para el tipo de petición actual
    cont = 0

    # Iterar a través de cada línea de la entrada estándar
    for linea in sys.stdin:
        
        # Verificar si el tipo de petición de la línea actual es diferente del anterior
        if(temp != linea):
            # Imprimir el conteo y el tipo de petición, luego reiniciar el contador
            print(cont)
            print(linea)
            cont = 1
            temp = linea
        else:
            # Incrementar el contador si el tipo de petición es el mismo que el anterior
            cont += 1

    # Imprimir el conteo para el último tipo de petición
    print(cont)

# Ejecutar la función
recorrerStdinReduceCHAT()
