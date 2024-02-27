
#!/home/david/ia/zZ_Entorno_Virtual_Zz/bin/python

# Script para mapear el incremento/decremento por hora (en porcentaje) del tráfico en bytes

import sys

def recorrerStdinMap():
    for linea in sys.stdin:
        contarCampos(linea, ";")

def contarCampos(linea, char):
    # Divide la línea por el delimitador y mapea la hora y los bytes
    lista = linea.split(char)   
    if(len(lista) == 9):
        try:
            bytes = int(lista[-1])
            if(bytes > 0):
                hora = lista[3].split(" ")[1]
                nhora = int(hora.split(":")[0])
                print(f"{nhora}\t{bytes} ")
        except:
            i = 0;

# Ejecutar la función
recorrerStdinMap()
