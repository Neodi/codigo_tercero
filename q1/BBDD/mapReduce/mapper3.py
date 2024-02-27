
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mapear la media/porcentaje de peticiones por tipo (GET, POST, PUT, etc.)

import sys

def recorrerStdinMap():
    # Iterar a través de cada línea de la entrada estándar
    for linea in sys.stdin:
        contarCampos(linea, ";")

def contarCampos(linea, char):
    # Dividir la línea basándose en el delimitador y mapear por tipo de petición
    lista = linea.split(char)
    if(len(lista) == 9):
        # Imprimir el tipo de petición
        print(lista[4])

# Ejecutar la función
recorrerStdinMap()
