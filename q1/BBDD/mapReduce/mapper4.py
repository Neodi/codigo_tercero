
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mapear tipos de respuesta por familia (2XX, 3XX, 4XX y 5XX) por tipo de petición (GET, POST, PUT, etc.)

import sys

def recorrerStdinMap():
    for linea in sys.stdin:
        contarCampos(linea, ";")

def contarCampos(linea, char):
    # Divide la línea por el delimitador y mapea por familia de respuesta y tipo de petición
    lista = linea.split(char)
    if(len(lista) == 9):
        try:
            num = int(lista[-2])
            if(num >= 200 and num < 600):
                print(f"{lista[4]}	{lista[-2][0]}xx")
        except:
            i = 0

# Ejecutar la función
recorrerStdinMap()
