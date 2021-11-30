nuestras rutas deben admitir token menos resgister y auth.

el token nos los pasan en el headers: {authorization} del req

esto lo pasamos como objeto junto con el secreto a nnuestras funciones del lógic.
quedando las funciones del lógic con tres parámetros, user, obejto{token+secret} y callback.

hacemos el jwt.verify en las lógicas.

asegurarse implementaciones con control de errores.

y estaría bien después implementar los test

los test tendrán que generar un token en sí mismos.