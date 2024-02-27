
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mapear los tipos de archivos con su tráfico en bytes

import sys

def recorrerStdinMap():
    for linea in sys.stdin:
        contarCampos(linea, ";")

def contarCampos(linea, char):
    # Divide la línea por el delimitador y mapea el tipo de archivo con los bytes
    lista = linea.split(char)   
    if(len(lista) == 9):
        try:
            bytes = int(lista[-1])
            fichero = lista[-4]
            ext = fichero.split(".")[-1]
            if(bytes > 0):
                print(f"{ext}\t{bytes} ")
        except:
            pass

# Ejecutar la función
recorrerStdinMap()
