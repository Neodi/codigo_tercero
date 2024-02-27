
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mapear cada línea a una petición de tipo GET

import sys

def recorrerStdinMap():
    # Iterar a través de cada línea de la entrada estándar
    for linea in sys.stdin:
        # Llamar a la función contarCampos con cada línea y el delimitador ";"
        contarCampos(linea, ";")

def contarCampos(linea, char):
    # Dividir la línea basándose en el delimitador
    lista = linea.split(char)
    # Verificar si la línea tiene 9 campos y el quinto campo es "GET"
    if(len(lista) == 9 and lista[4] == "GET"):
        # Imprimir el tipo de petición
        print(lista[4])

# Ejecutar la función
recorrerStdinMap()
