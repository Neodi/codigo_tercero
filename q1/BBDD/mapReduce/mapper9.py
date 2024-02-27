
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mapear el balance de tráfico en bytes (último dato) por dominio, diferenciando descargas (GET) y subidas (POST)

import sys

def recorrerStdinMap():
    for linea in sys.stdin:
        contarCampos(linea, ";")

def contarCampos(linea, char):
    # Divide la línea por el delimitador y mapea el dominio, la petición y los bytes
    lista = linea.split(char)   
    if len(lista) == 9:
        dominio, peticion, bytes = lista[0], lista[4], lista[-1]
        try:
            bytes = int(bytes)
            if peticion in ['GET', 'POST'] and bytes > 0:
                print(f"{dominio}\t{peticion}\t{bytes}")
        except: 
            pass

# Ejecutar la función
recorrerStdinMap()
