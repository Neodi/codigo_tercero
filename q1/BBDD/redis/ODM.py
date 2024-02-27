__author__ = 'Nombres_y_Apellidos'
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import time
import os
from typing import Generator, Any, Self
from geojson import Point
import pymongo  
import yaml
import json
import redis as r
import hashlib
import random
from datetime import datetime, timedelta


def getLocationPoint(address: str) -> Point:
    """ 
    Obtiene las coordenadas de una direcciÃ³n evn formato geojson.Point
    Utilizar la API de geopy para obtener las coordenadas de la direccion
    Cuidado, la API es publica tiene limite de peticiones, utilizar sleeps.

    Parameters
    ----------
        address : str
            direccion completa de la que obtener las coordenadas
    Returns
    -------
        geojson.Point
            coordenadas del punto de la direccion
    """
    location = None
    while location is None:
        try:
            time.sleep(1)
            #TODO
            # Es necesario proporcionar un user_agent para utilizar la API
            # Utilizar un nombre aleatorio para el user_agent
            location = Nominatim(user_agent="DavidIker").geocode(address) 
        except GeocoderTimedOut:
            # Puede lanzar una excepcion si se supera el tiempo de espera
            # Volver a intentarlo
            continue
    #TODO   HECHO
    # Devolver un GeoJSON de tipo punto con la latitud y longitud almacenadas
    point = Point(location.longitude, location.latitude)
    return point

class Model:
    """ 
    Clase de modelo abstracta
    Crear tantas clases que hereden de esta clase como  
    colecciones/modelos se deseen tener en la base de datos.

    Attributes
    ----------
        required_vars : set[str]
            conjunto de variables requeridas por el modelo
        admissible_vars : set[str]
            conjunto de variables admitidas por el modelo
        db : pymongo.collection.Collection
            conexion a la coleccion de la base de datos
    
    Methods
    -------
        __setattr__(name: str, value: str | dict) -> None
            Sobreescribe el metodo de asignacion de valores a las
            variables del objeto con el fin de controlar las variables
            que se asignan al modelo y cuando son modificadas.
        save()  -> None
            Guarda el modelo en la base de datos
        delete() -> None
            Elimina el modelo de la base de datos
        find(filter: dict[str, str | dict]) -> ModelCursor
            Realiza una consulta de lectura en la BBDD.
            Devuelve un cursor de modelos ModelCursor
        aggregate(pipeline: list[dict]) -> pymongo.command_cursor.CommandCursor
            Devuelve el resultado de una consulta aggregate.
        find_by_id(id: str) -> dict | None
            Busca un documento por su id utilizando la cache y lo devuelve.
            Si no se encuentra el documento, devuelve None.
        init_class(db_collection: pymongo.collection.Collection, requiered_vars: set[str], admissible_vars: set[str]) -> None
            Inicializa las variables de clase en la inicializacion del sistema.

    """
    required_vars: set[str]
    admissible_vars: set[str]
    db: pymongo.collection.Collection
    redis: r.Redis

    def __init__(self, **kwargs: dict[str, str | dict]):
        """
        Inicializa el modelo con los valores proporcionados en kwargs
        Comprueba que los valores proporcionados en kwargs son admitidos
        por el modelo y que las variables requeridas son proporcionadas.

        Parameters
        ----------
            kwargs : dict[str, str | dict]
                diccionario con los valores de las variables del modelo
        Nombre,apellido, direccion
        """
        #TODO
        # Realizar las comprabociones y gestiones necesarias
        # antes de la asignacion.

        # Asigna todos los valores en kwargs a las variables con 
        # nombre las claves en kwargs
        
        #Comprueba que los valores proporcionados en kwargs son admitidos por el modelo y que las variables requeridas son proporcionadas.
        for key, value in kwargs.items():
            if(key not in self.admissible_vars and key not in self.required_vars):
                print("Error, la variable no es admitida", key)
            else: 
                self.__setattr__(key, value)


    def __setattr__(self, name: str, value: str | dict) -> None:
        """ Sobreescribe el metodo de asignacion de valores a las 
        variables del objeto con el fin de controlar las variables
        que se asignan al modelo y cuando son modificadas.
        """
        #TODO
        # Realizar las comprabociones y gestiones necesarias
        # antes de la asignacion.

        # Asigna el valor value a la variable name
        if(name not in self.admissible_vars and name not in self.required_vars):
            print("Error, la variable no es admitida: ", name)
        else:
            self.__dict__[name] = value
        
    def save(self) -> None:
        """
        Guarda el modelo en la base de datos
        Si el modelo no existe en la base de datos, se crea un nuevo
        documento con los valores del modelo. En caso contrario, se
        actualiza el documento existente con los nuevos valores del
        modelo.
        """
        if "_id" in self.__dict__.keys():
            self.db.update_one({"_id": self.__dict__["_id"]}, {"$set": self.__dict__})
        else:
            self.db.insert_one(self.__dict__)


    

    def delete(self) -> None:
        """
        Elimina el modelo de la base de datos
        """
        self.db.delete_one({"_id": self.__dict__["_id"]})
    
    @classmethod
    def find(cls, filter: dict[str, str | dict]) -> Any:
        """ 
        Utiliza el metodo find de pymongo para realizar una consulta
        de lectura en la BBDD.
        find debe devolver un cursor de modelos ModelCurso

        Parameters
        ----------
            filter : dict[str, str | dict]
                diccionario con el criterio de busqueda de la consulta
        Returns
        -------
            ModelCursor
                cursor de modelos
        """ 
        #TODO
        cursor = cls.db.find(filter)
        return ModelCursor(cls, cursor)

        
    @classmethod
    def aggregate(cls, pipeline: list[dict]) -> pymongo.command_cursor.CommandCursor:
        """ 
        Devuelve el resultado de una consulta aggregate. 
        No hay nada que hacer en esta funcion.
        Se utilizara para las consultas solicitadas
        en el segundo apartado de la practica.

        Parameters
        ----------
            pipeline : list[dict]
                lista de etapas de la consulta aggregate 
        Returns
        -------
            pymongo.command_cursor.CommandCursor
                cursor de pymongo con el resultado de la consulta
        """ 
        return cls.db.aggregate(pipeline)
    
    @classmethod
    def find_by_id(cls, id: str) -> Self | None:
        """ 
        NO IMPLEMENTAR HASTA LA SEGUNDA PRACTICA
        Busca un documento por su id utilizando la cache y lo devuelve.
        Si no se encuentra el documento, devuelve None.

        Parameters
        ----------
            id : str
                id del documento a buscar
        Returns
        -------
            Self | None
                Modelo del documento encontrado o None si no se encuentra
        """ 
        documento_serializado = cls.redis.get(id)
    
        if documento_serializado is None:
            document = cls.db.find_one({"_id": id})
            if document is not None:
                documento_serializado = json.dumps(document)
                cls.redis.set(id, documento_serializado, ex=86400)
                return cls(**document)
            else:
                return None
        else:
            document = json.loads(documento_serializado)
            return cls(**document)
        

    @classmethod
    def init_class(cls, db_collection: pymongo.collection.Collection, required_vars: set[str], admissible_vars: set[str]) -> None:
        """ 
        Inicializa las variables de clase en la inicializacion del sistema.
        En principio nada que hacer aqui salvo que se quieran realizar
        comprobaciones o cambios adicionales.

        Parameters
        ----------
            db_collection : pymongo.collection.Collection
                Conexion a la collecion de la base de datos.
            requiered_vars : set[str]
                Set de variables requeridas por el modelo
            admissible_vars : set[str] 
                Set de variables admitidas por el modelo
        """
        cls.db = db_collection
        cls.required_vars = required_vars
        cls.admissible_vars = admissible_vars
        

class ModelCursor:
    """ 
    Cursor para iterar sobre los documentos del resultado de una
    consulta. Los documentos deben ser devueltos en forma de objetos
    modelo.

    Attributes
    ----------
        model_class : Model
            Clase para crear los modelos de los documentos que se iteran.
        command_cursor : pymongo.command_cursor.CommandCursor
            Cursor de pymongo a iterar

    Methods
    -------
        __iter__() -> Generator
            Devuelve un iterador que recorre los elementos del cursor
            y devuelve los documentos en forma de objetos modelo.
    """

    def __init__(self, model_class: Model, cursor: pymongo.cursor.Cursor):
        """
        Inicializa el cursor con la clase de modelo y el cursor de pymongo

        Parameters
        ----------
            model_class : Model
                Clase para crear los modelos de los documentos que se iteran.
            command_cursor: pymongo.command_cursor.CommandCursor
                Cursor de pymongo a iterar
        """
        self.model = model_class
        self.cursor = cursor
    
    def __iter__(self) -> Generator:
        """
        Devuelve un iterador que recorre los elementos del cursor
        y devuelve los documentos en forma de objetos modelo.
        Utilizar yield para generar el iterador
        Utilizar la funcion next para obtener el siguiente documento del cursor
        Utilizar alive para comprobar si existen mas documentos.
        """
        #TODO
        while self.cursor.alive:
            doc = next(self.cursor)
            yield self.model(**doc)

def initApp(definitions_path: str = "./models.yml", mongodb_uri="mongodb://localhost:27017/", db_name="MiModelo") -> None:
    """ 
    Declara las clases que heredan de Model para cada uno de los 
    modelos de las colecciones definidas en definitions_path.
    Inicializa las clases de los modelos proporcionando las variables 
    admitidas y requeridas para cada una de ellas y la conexiÃ³n a la
    collecion de la base de datos.
    
    Parameters
    ----------
        definitions_path : str
            ruta al fichero de definiciones de modelos
        mongodb_uri : str
            uri de conexion a la base de datos
        db_name : str
            nombre de la base de datos
    """
    #TODO
    # Inicializar base de datos llamando al driver de pymongo
    client = pymongo.MongoClient(mongodb_uri)
    db = client[db_name]

    #Inicializar el redis
    
    redis = r.Redis(host='localhost', port=6379, db=0)
    Model.redis = redis

    
    #TODO
    # Declarar tantas clases modelo colecciones existan en la base de datos
    # Leer el fichero de definiciones de modelos para obtener las colecciones

    with open("./models.yml", "r") as f:
        models = yaml.safe_load(f)
    # y las variables admitidas y requeridas para cada una de ellas.
    # Ejemplo de declaracion de modelo para colecion llamada MiModelo
    globals()["Persona"] = type("Persona", (Model,), {})
    globals()["Centro_Educativo"] = type("Centro_Educativo", (Model,), {})
    globals()["Empresas"] = type("Empresas", (Model,), {})
    #Iniciamos la clase Persona con las requeridas y admissibles que estan en el fichero models.yml
    Persona.init_class(db_collection=db.Persona, required_vars=models["Persona"]["required_vars"], admissible_vars=models["Persona"]["admissible_vars"])
    Centro_Educativo.init_class(db_collection=db.Centro_Educativo, required_vars=models["Centro_Educativo"]["required_vars"], admissible_vars=models["Centro_Educativo"]["admissible_vars"])
    Empresas.init_class(db_collection=db.Empresas, required_vars=models["Empresas"]["required_vars"], admissible_vars=models["Empresas"]["admissible_vars"])
    # Ignorar el warning de Pylance sobre MiModelo, es incapaz de detectar
    # que se ha declarado la clase en la linea anterior ya que se hace
    # en tiempo de ejecucion.



# TODO 
# Almacenar los pipelines de las consultas en Q1, Q2, etc. 
# EJEMPLO

# Q1: Listado de todas personas que han estudiado en la UPM o UAM.
Q1 =[{'$match': {"centro_educativo":{ '$regex': "UPM|UAM"    }}}]

# Q2: Listado de las diferentes universidades en las que han estudiado las personas residentes en Madrid
Q2 = [
  { '$match': { 'direccion': {'$regex':  "Madrid", '$options': 'i'} } }, 
  { '$group': { '_id': '$centro_educativo' } }
]

# Q3: Personas que, en la descripción de su perfil, incluye los términos “Big Data” o “Ingeligencia Artificial”
Q3 = [
    {'$match': {'$or': [
                {'especializacion': {'$regex': 'Big Data', '$options': 'i'}},
                {'especializacion': {'$regex': 'Inteligencia Artificial', '$options': 'i'}}     
                ]      }
    }
]

# Q4: Guarda en una tabla nueva el listado de las personas que ha terminado alguno de sus estudios en el 2017 o después.
Q4 = [
    {'$match': {'fecha_graduacion': {'$gte': '2017-01-01'}}},
    {'$out': 'Graduados_GTE_2017'}
]

# Q5: Calcular el número medio de estudios realizados por las personas que han trabajado o trabajan en la Microsoft
Q5 = [
  { '$match': { 'empresa': 'Microsoft Corporation' } },
  { '$group': { '_id': None, 'promedioEstudios': { '$avg': '$num_estudios' } } }
]

# Q6: Distancia media al trabajo (distancia geodésica) de los actuales trabajadores de Google. Se pueden indicar las coordenadas de la oficina de Google manualmente.
# IMPORTANTE hay que hacer un indice primero: db.Persona.createIndex({ "location": "2dsphere" })

Q6 = [
    {'$geoNear': {'near': {'type': 'Point','coordinates': [-122.084240, 37.423070]}, #Coordenadas google
                'distanceField': 'DistanciaAGoogle','spherical': True}
    },
    {'$match': {'empresa': 'Google'}}, 
    {'$group': {'_id': None,'avgDistanciaAGoogle': {'$avg': '$DistanciaAGoogle'}}}
]

# Q7: Listado de las tres universidades que más veces aparece como centro de estudios de las personas registradas. Mostrar universidad y el número de veces que aparece
Q7 = [
  { '$group': { '_id': '$centro_educativo', 'count': { '$sum': 1 } } },
  { '$sort': { 'count': -1 }  },  
  { '$limit': 3},  
  { '$project': { '_id': 1, 'count': 1 } }
]
def get_hashed_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def register(nombre, usuario, password):
    # Comprobar si el usuario ya existe en Redis
    if Model.redis.hexists(f"user:{usuario}", "password"):
        return "Usuario ya existe."

    hashed_password = get_hashed_password(password)
    privileges = random.randint(1, 5)

    # Almacenar la información del usuario en Redis
    Model.redis.hset(f"user:{usuario}", mapping={
        "nombre": nombre,
        "password": hashed_password,
        "privileges": privileges
    })
    return "Usuario registrado correctamente"


def login(usuario, password):
    # Comprobar si el usuario existe y la contraseña coincide
    if Model.redis.hexists(f"user:{usuario}", "password") and \
       Model.redis.hget(f"user:{usuario}", "password").decode() == get_hashed_password(password):
        session_token = hashlib.sha256(str(random.randint(1, 100000)).encode()).hexdigest()
        expiry_date = (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d %H:%M:%S')
        # Almacenar el token y la fecha de expiración en Redis
        Model.redis.hset(f"user:{usuario}", mapping={
            "session_token": session_token,
            "token_expiry": expiry_date
        })
        privileges = Model.redis.hget(f"user:{usuario}", "privileges").decode()
        return session_token, privileges
    return None, -1


def login_with_token(token):
    # Comprobar si el token de sesión existe y es válido
    user = Model.redis.hgetall(f"token:{token}")
    if user:
        usuario = user[b'usuario'].decode()
        if Model.redis.hget(f"user:{usuario}", "session_token").decode() == token:
            if datetime.strptime(r.hget(f"user:{usuario}", "token_expiry").decode(), '%Y-%m-%d %H:%M:%S') > datetime.now():
                privileges = r.hget(f"user:{usuario}", "privileges").decode()
                return privileges
    return -1

def update_user(usuario, nombre=None, password=None):
    update_fields = {}
    if nombre:
        update_fields['nombre'] = nombre
    if password:
        update_fields['password'] = get_hashed_password(password)

    # Actualizar la información del usuario en Redis
    # Desempaquetar el diccionario update_fields
    if update_fields:
        Model.redis.hset(f"user:{usuario}", mapping=update_fields)
    return "User updated successfully!"
def request_help_with_priority(user_id, priority):
    """
    Registra una petición de ayuda para un usuario con una prioridad dada.
    
    :param user_id: El ID del usuario que hace la petición
    :param priority: La prioridad de la petición (números más bajos indican mayor prioridad)
    """
    # En Redis, los scores más bajos tienen mayor prioridad en un sorted set
    Model.redis.zadd('help_requests', {user_id: priority})

def attend_highest_priority_user():
    """
    Obtiene y atiende la petición de ayuda de mayor prioridad.
    
    :return: El ID del usuario de la petición atendida o None si no hay peticiones.
    """
    # Obtener y eliminar el item con menor score (mayor prioridad)
    attended_request = Model.redis.zpopmin('help_requests')
    
    if attended_request:
        # zpopmin retorna una lista de tuplas (elemento, score), extraemos el ID del usuario
        user_id = attended_request[0][0].decode()  # Decodificar bytes a str si es necesario
        return user_id
    else:
        # No hay peticiones pendientes
        return None

if __name__ == '__main__':
    
    # Inicializar base de datos y modelos con initApp
    initApp()
    print(register("John Doe", "johndoe", "password123"))

    # Prueba de inicio de sesión
    session_token, privileges = login("johndoe", "password123")
    print(f"Session Token: {session_token}, Privileges: {privileges}")

    # Prueba de inicio de sesión con token
    print(login_with_token(session_token))

    # Prueba de actualización de usuario
    print(update_user("johndoe", nombre="John Updated", password="newpassword123"))

    # Registrar algunas peticiones de ayuda con diferentes prioridades
    request_help_with_priority("johndoe", 1)  # Prioridad alta
    request_help_with_priority("janedoe", 2)  # Prioridad media
    request_help_with_priority("alexdoe", 3)  # Prioridad baja

    # Atender a la petición de mayor prioridad
    attended_user_id = attend_highest_priority_user()
    print(f"Se atendió a la petición de: {attended_user_id}")

    # Cola de prioridad: recorrer e imprimir información de los usuarios
    user_keys = Model.redis.keys("user:*")
    for user_key in user_keys:
        user_data = Model.redis.hgetall(user_key)
        
        # Imprimir la información del usuario
        print(f"Usuario: {user_key.decode().split(':')[1]}")  # Solo mostrar el nombre de usuario
        for field, value in user_data.items():
            if field.decode() != "password":  # No imprimir la contraseña
                print(f"{field.decode()}: {value.decode()}")
        print("\n")

    # Ahora, si quieres verificar las peticiones restantes después de atender la de mayor prioridad, puedes hacerlo así:
    remaining_requests = Model.redis.zrange('help_requests', 0, -1, withscores=True)
    print("Peticiones de ayuda restantes (ID del usuario, prioridad):")
    for user_id, priority in remaining_requests:
        print(f"Usuario: {user_id.decode()}, Prioridad: {priority}")