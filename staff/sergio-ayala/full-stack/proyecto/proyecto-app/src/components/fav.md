# acciones del usuario 
- yo clico y lo añado a favoritos
- yo clico y si está en favoritos lo quito

# lugares de ejecución
- results
- detail 
- favs

# división de la acción
- delcaración del clic -> en los lugares de ejecución
- manejo del clic -> home
- conexión con la api -> ./logics

# conexión con la Api (toggle)
Mi función deberá esperar un vehículo que se quiera añadir a favoritos y tendré que preguntar a la Api primero si este vehiculo ya está en los favoritos de mi usuario y sino tendré que añadirlo, en caso de que ya estuviese deberemos de sacarlo. Esta función tiene un comportamiento de toggle(si esta se quita sino se añade)
- lo primero es obtener la info de usuario a cambio de un token.
- en esa información del usuario comprobar si hay favoritos (propiedad -> favs)
- si no existe propiedad favs en el usuario, habrá que crearla y añadir el vehiculo en la posición 0.
- si existe propiedad favs, habrá que analizar todas las posiciones del array favs en busca del vehículo, si está quitarlo con un Slice y sino añadirlo con un push.
- ahora hay que actualizar en la api la información del usuario con la nueva propiedad favs.
- la función devuelve si ese id de vehiculo se ha añadido o quitado.

# maneja la conexión 
Esta función deberá llamar a la función que conecta con la Api y manejar la respuesta recibida por esta.
- que necesito para esto? (el token y el Id del vehiculo favorito)
- que manejo (el error si lo hay y sino, si ha quitado o añadido el favorito)
- que devuelvo (nada, cambio los state)

# maneja el click
Esta función es la encargada de percibir el click del usuario y el id en el que está hecho y llamar a la función que maneja la conexión.
- que necesito (el id)
- que manejo (llamo a la función que maneja la conexión)
- que devuelvo (nada)


