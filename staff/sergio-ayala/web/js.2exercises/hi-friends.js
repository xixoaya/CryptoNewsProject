// function hiFriends(friends) {
//     var hello = "Hello ";

//     for(var i = 0; i < friends.length; i++) {
//         hello += friends[i] + ", ";
//     }
//     return hello;
// }

// Declaro un esquema porque me encuentro la palabra function

// Este esquema lo llamo hiFriends porque me encuentro esete nombre entre function y ()

// Este esquema necesita de una cosa que luego tendré que buscar para realizar las acciones de mi esquema
// 	porque encuentro un parámentro dentro de ()

// Abro la caja donde están el resto de cosas que necesito hacer según el esquema porque me encuentro {

// Reservo un espacio en mi cabeza porque encuentro la palabra reservada var

// Este espacio lo llamo hello porque me encuentro este nombre estre var y =

// En mi espacio asignado hello guardo la información "Hello " porque me encuentro esto entre "=" y ";"

// Entro en un bucle porque veo la palabra for

// En este bucle entro con 3 herramientas, un contador a 0 porque "var i = 0", un stopper que es "i < friends.length" y un temporizador
// que aumenta 1 mi contador porque "i++"

// Por cada vuelta de bucle voy a hacer 3 tareas:
// En la primera vuelta será
// 	- 1 tarea (ver si sigo con el bucle): Comprobamos si "i < friends.length"
// 		. Recordamos el valor de i que es 0
// 		. Recoramos el valor de friends.length que en el ejemplo es 3
// 		. Comprobamos la condición que es 0 < 3 "i < friends.length" si es true seguimos si no nos salimos del bucle
// 	- 2 tarea (lo que está entre llaves): a hello le añado el valor "hello += friends[i] + ", "".
// 		. Recordamos el valor de hello que es "Hello "
// 		. Recordamos el valor de i que es 0
// 		. Analizo en valor de friends[i] que es "Ventu"
// 		. Reasigno el valor de hello con lo dado, el nuevo valor será "Hello Ventu, "
// 	- 3 tarea (sumar al contador 1 por el temporizador): se queda en 1
// En la segunda vuelta será
// 	- 1 tarea (ver si sigo con el bucle): Comprobamos si "i < friends.length"
// 		. Recordamos el valor de i que es 1
// 		. Recoramos el valor de friends.length que en el ejemplo es 3
// 		. Comprobamos la condición que es 1 < 3 "i < friends.length" si es true seguimos si no nos salimos del bucle
// 	- 2 tarea (lo que está entre llaves): a hello le añado el valor "hello += friends[i] + ", "".
// 		. Recordamos el valor de hello que es "Hello Ventu, "
// 		. Recordamos el valor de i que es 1
// 		. Analizo en valor de friends[i] que es "Manu"
// 		. Reasigno el valor de hello con lo dado, el nuevo valor será "Hello Ventu, Manu, "
// 	- 3 tarea (sumar al contador 1 por el temporizador): se queda en 2
// En la tercera vuelta será
// 	- 1 tarea (ver si sigo con el bucle): Comprobamos si "i < friends.length"
// 		. Recordamos el valor de i que es 2
// 		. Recoramos el valor de friends.length que en el ejemplo es 3
// 		. Comprobamos la condición que es 2 < 3 "i < friends.length" si es true seguimos si no nos salimos del bucle
// 	- 2 tarea (lo que está entre llaves): a hello le añado el valor "hello += friends[i] + ", "".
// 		. Recordamos el valor de hello que es "Hello Ventu, Manu, "
// 		. Recordamos el valor de i que es 2
// 		. Analizo en valor de friends[i] que es "Zoraida"
// 		. Reasigno el valor de hello con lo dado, el nuevo valor será "Hello Ventu, Manu, Zoraida, "
// 	- 3 tarea (sumar al contador 1 por el temporizador): se queda en 3
// En la cuarta vuelta será
// 	- 1 tarea (ver si sigo con el bucle): Comprobamos si "i < friends.length"
// 		. Recordamos el valor de i que es 3
// 		. Recoramos el valor de friends.length que en el ejemplo es 3
// 		. Comprobamos la condición que es 3 < 3 "i < friends.length" si es true seguimos si no nos salimos del bucle
// 	- 2 tarea Salir del bucle porque nos encontramos un false

// Devuelvo un valor porque me encuentro la palabra reservada return

// El valor que devuelvo es hello porque me lo encuentro entre "return" y ";". El valor devuelto será "Hello Ventu, Manu, Zoraida, "


// Hacer el seguimiento de forma escrita, como sifuésemos el compilador del navegador

function hiFriends(friends) {
    var hello = "Hello ";

    for(var i = 0; i < friends.length; i++) {
        if(friends.length - 1 === i) {
            hello += friends[i];
        } else {
            hello += friends[i] + ", ";
        }
    }
    return hello;
}

// Declaro un esquema porque me encuentro la palabra function

// Este esquema lo llamo hiFriends porque me encuentro este nombre entre function y ()

// Este esquema necesita de una cosa que luego tendré que buscar para realizar las acciones de mi esquema
// porque encuentro un parámentro dentro de ()

// Abro la caja a la que hace referencia el esquema porque me encuentro {

// Lo primero que me encuentro es un aviso de que guarde en mi cerebro un espacio porque veo ‘var’ al cual llamaré hello porque es la palabra que viene a continuación separada por un “__“ (espacio)

// Dentro del espacio hello guardaré la información “hello” porque var hello = “hello”;

// A continuación entro en un bucle porque veo la palabra for.

// En este bucle entro con 3 herramientas, un contador a 0 porque "var i = 0", un stopper que es "i < friends.length" y un temporizador
// que aumenta 1 mi contador porque "i++"

//  Por cada vuelta de bucle voy a hacer 3 tareas:

// En la PRIMERA vuelta será
//   - 1 tarea (ver si sigo con el bucle): Comprobamos si "i < friends.length"
//       . Recordamos el valor de i que es 0
//       . Recordamos el valor de friends.length que en el ejemplo es 3
//       . Comprobamos la condición que es 0 < 3 "i < friends.length" si es true seguimos si no nos salimos del bucle

// - 2 tarea (lo que está entre llaves): me encuentro una función condicionante, en la que si se cumple una cierta condición pasará una cosa y sino pasará otra.
// La condición es que si a friend.length Le Resto 1 y el resultado es igual a la i, tengo que sumarle a hello, hello + el valor de la array friends en la posición de la i.

// En el ejemplo,  friends.length = 3 por lo que en la primera vuelta 3 - 1 = 0 => False.

// Por lo que ejecutamos lo que pone en el ELSE que es sumarle al espacio hello, el valor de friends en la posición i=0 que en este ejemplo es ventu y concatenarle además el string “, “.

// - 3 tarea sumarle 1 a la i porque el temporizador i++ significa que hay que sumarle 1 a la i a cada vuelta del bucle y pasamos a la segunda vuelta con i=1

// En la SEGUNDA vuelta será
//   - 1 tarea (ver si sigo con el bucle): Comprobamos si "i < friends.length"
//       . Recordamos el valor de i que es ahora es 1
//       . Recordamos el valor de friends.length que en el ejemplo es 3 y es un valor constante
//       . Comprobamos la condición que es 1 < 3 "i < friends.length" si es true seguimos si no nos salimos del bucle, en este caso sigue siendo true.

// - 2 tarea (lo que está entre llaves): me encuentro una función condicionante, en la que si se cumple una cierta condición pasará una cosa y sino pasará otra.
// La condición es que si a friend.length Le Resto 1 y el resultado es igual a la i, tengo que sumarle a hello, hello + el valor de la array friends en la posición de la i.

// En el ejemplo,  friends.length = 3 por lo que en la SEGUNDA vuelta 3 - 1 = 1 => False.

// Por lo que ejecutamos lo que pone en el ELSE que es sumarle al espacio hello, el valor de friends en la posición i=1 que en este ejemplo es Manu y concatenarle además el string “, “.

// - 3 tarea sumarle 1 a la i porque el temporizador i++ significa que hay que sumarle 1 a la i a cada vuelta del bucle y pasamos a la tercera vuelta con i=2

// En la TERCERA vuelta será
//   - 1 tarea (ver si sigo con el bucle): Comprobamos si "i < friends.length"
//       . Recordamos el valor de i que es ahora es 2
//       . Recordamos el valor de friends.length que en el ejemplo es 3 
//       . Comprobamos la condición que es 2 < 3 "i < friends.length" si es true seguimos si no nos salimos del bucle, en este caso sigue siendo true.

// - 2 tarea (lo que está entre llaves): me encuentro una función condicionante, en la que si se cumple una cierta condición pasará una cosa y sino pasará otra.
// La condición es que si a friend.length Le Resto 1 y el resultado es igual a la i, tengo que sumarle a hello, hello + el valor de la array friends en la posición de la i.

// En el ejemplo,  friends.length = 3 por lo que en la SEGUNDA vuelta 3 - 1 = 2 => TRUE.

// Por lo que ejecutamos lo que pone en el IF que es sumarle al espacio hello, el valor de friends en la posición i=2 que en este ejemplo es Zoraida y nada más.

// - 3 tarea sumarle 1 a la i porque el temporizador i++ significa que hay que sumarle 1 a la i a cada vuelta del bucle y pasamos a la cuarta vuelta con i=3

// En la CUARTA vuelta será
//   - 1 tarea (ver si sigo con el bucle): Comprobamos si "i < friends.length"
//       . Recordamos el valor de i que es ahora es 3
//       . Recordamos el valor de friends.length que en el ejemplo es 3 
//       . Comprobamos la condición que es 3 < 3 "i < friends.length" si es true seguimos si no nos salimos del bucle, en esta vuelta pasa a ser falso por lo que salimos del bucle.

// Devuelvo un valor porque me encuentro la palabra reservada return

// El valor que devuelvo es hello porque me lo encuentro entre "return" y ";". El valor devuelto será "Hello Ventu, Manu, Zoraida"