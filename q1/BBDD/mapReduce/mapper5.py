
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mapear tipos de archivo (.gif, .html, etc.) no encontrados (404) en una hora determinada

import sys

def recorrerStdinMap():
    for linea in sys.stdin:
        contarCampos(linea, ";")

def contarCampos(linea, char):
    # Divide la línea por el delimitador y mapea según tipo de archivo y hora para errores 404
    lista = linea.split(char)   
    if(len(lista) == 9):
        try:
            num = int(lista[-2])
            if(num == 404):
                ruta = lista[5]
                archivo = ruta.split("/")[-1]
                extension = archivo.split(".")[-1]
                hora = lista[3].split(" ")[1]
                print(f"{hora} 	 {extension} ")
        except:
            i = 0

# Ejecutar la función
recorrerStdinMap()
