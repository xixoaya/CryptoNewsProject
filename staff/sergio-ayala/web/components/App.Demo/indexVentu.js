var myCollection = new UsersCollection

function defaultUser() {
    var manu = new User("Manu", "manu@neoland.es", "headTeacher");
    var ventu = new User("Ventu", "ventu@neoland.es", "12345678");
    var sergio = new User("Sergio", "sergio@neoland.es", "876544321");
    var ana = new User("Ana", "ana@neoland.es", "qwertyui");
    var noelia = new User("Noelia", "noelia@neoland.es", "iuytrewq");
    var alvaro = new User("Álvaro", "alvaro@neoland.es", "asdfghjk");
    var ismael = new User("Ismael", "ismael@neoland.es", "kjhgfdsa");
    var andreu = new User("Andreu", "andreu@neoland.es", "zxcvbnmm");
    var riccardo = new User("Riccardo", "riccardo@neoland.es", "mmnbvcxz");
    var nico = new User("Nico", "nico@neoland.es", "hgfedcba");
    var adrian = new User("Adrián", "adrian@neoland.es", "abcdefgh");
    var neoland = [manu, ventu, sergio, ana, noelia, alvaro, ismael, andreu, riccardo, nico, adrian];
    for (var i = 0; i < neoland.length; i++) {
        var element = neoland[i];
        myCollection.signUp(element);
    }
}
defaultUser();


var formSignIn = document.getElementById("formLogin");
formSignIn.onsubmit = function(event) {
    event.preventDefault();
    var inputs = this.getElementsByTagName("input");
    var user = new User("", inputs[0].value, inputs[1].value);
    var userLogIn = myCollection.signIn(user);
    if(userLogIn.alias === undefined) alert("Este usuario no está registrado");
    else alert("El usuario logueado es " + JSON.stringify(userLogIn))
    formSignIn.reset();
}