
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mapear los dominios con su tráfico en bytes

import sys

def recorrerStdinMap():
    for linea in sys.stdin:
        contarCampos(linea, ";")

def contarCampos(linea, char):
    # Divide la línea por el delimitador y mapea el dominio con los bytes
    lista = linea.split(char)   
    if(len(lista) == 9):
        try:
            bytes = int(lista[-1])
            dom = lista[0]
            if(bytes > 0):
                print(f"{dom}\t{bytes} ")
        except:
            i = 0;

# Ejecutar la función
recorrerStdinMap()
