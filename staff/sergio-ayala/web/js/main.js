// var createTag = function(tag, value) {
//     return '<' + tag + '>' + value + '</' + tag + '>'
// }

// var createList = function(values) {
//     var list = '<ul>'

//     for (var i = 0; i < values.length; i++) {
//         var value = values[i]

//         list = list + createTag('li', value)
//     }

//     list = list + '</ul>'

//     return list
// }

// var students = ['Sergio', 'Nico', 'Adrian', 'Gerard', 'Riccardo', 'Xavier', 'Noelia']

// var list = createList(students)

// document.write(list)

// // TODO build a <table> with headers in <thead> all items from cart and the total in the <tfoot>

// var bananas = { name: 'Banana', quantity: 4, price: 2 }
// var oranges = { name: 'Orange', quantity: 10, price: 2 }
// var kiwis = { name: 'Kiwi', quantity: 2, price: 6 }

// var cart = [bananas, oranges, kiwis]
// var total = 0

// for (var i = 0; i < cart.length; i++) { // i++ => i = i + 1
//     var item = cart[i]

//     total = total + item.quantity * item.price
// }

// document.write('total is ', total)
// document.write('<table class="table"><tr><th>name</th></tr><tr><td>Pepito</td></tr></table>')

////////////////////////////////////////////
// Empieza el challenge

var manzana = {
    name: 'Manzana',
    quantity: 5,
    price: 2
}

var melon = {
    name: 'Melon',
    quantity: 7,
    price: 1
}

var uvas = {
    name: 'Uvas',
    quantity: 2,
    price: 6
}

var frutas = [manzana, melon, uvas];

function createRows(arr) { // espera que le pasemos un array
    var rows ='';
    for(var i = 0; i < arr.length; i++) {
        arr[i]

        var row = '<tr>' + 
        '<td>' + arr[i].name + '</td>' + 
        '<td>' + arr[i].quantity + '</td>' +
        '<td>' + arr[i].price + '</td>' + 
        '<td>' + arr[i].price * arr[i].quantity + '</td>' + 
        '</tr>';

        // rows = rows + row; Es lo mismo que lo de abajo!!
        rows += row;
    }
    return '<tbody class="table__body">' + rows + '</tbody>';
}

// document.write('<table>' + createRow(frutas) + '</table>');

var createTitle = 
        '<thead class="table__header">' +
           '<tr>' +
            '<th>Nombre</th>' +
            '<th>Cantidad en Kilos</th>' + 
            '<th>Precio de un Kilo</th>' + 
            '<th>Total por producto</th>' + 
          '</tr>' +
        '</thead>';
    


var createFooter = function(arr) {
    var totalPrice = 0;

    for (let i = 0; i < arr.length; i++) {
        var totalProductPrice = arr[i].quantity * arr[i].price 
        totalPrice += totalProductPrice;
    }
    
    // Declaramos la raviable y luego la devolvemos
    // var footer =
    // '<tfoot>' + 
    //     '<tr>' + 
    //       '<td>total: ' + totalPrice + 'euros</td>' +
    //     '</tr>' +
    //     '</tfoot>'
    //     ;
    //     return footer;
    
    // Directamente devolvemos el valor sin necesidad de pasar por la variable
    return (
        '<tfoot class="table__footer">' + 
        '<tr>' + 
          '<td>total: ' + totalPrice + 'euros</td>' +
        '</tr>' +
        '</tfoot>'
    )
}

document.write("<table class='table'>" + createTitle + createRows(frutas) + createFooter(frutas) + "</table>");


var camisetas = {
    name: 'Camisetas',
    quality: 'Medium',
    quantity: 3,
    price: 15
}

var pantalones = {
    name: 'Pantalones',
    quality: 'Low',
    quantity: 1,
    price: 20
}

var calcetines = {
    name: 'Calcetines',
    quality: 'top',
    quantity: 5,
    price: 5
}

var calzoncillos = {
    name: 'Calzoncillos',
    quality: 'Medium',
    quantity: 5,
    price: 10,
}

var ropa = [camisetas, pantalones, calcetines, calzoncillos]

var createRows = function (arr) {
    rows = '';

    for (let i = 0; i < arr.length; i++) {
        var row = '<tr>'
        '<td>' + array[i].name + '</td>' +
        '<td>' + array[i].quality + '</td>' +
        '<td>' + array[i].quantity + '</td>' +
        '<td>' + array[i].price + '</td>' +
        '<td>' + '<strong>' + array[i].price * array[i].quantity + '</strong>' + '</td>' +
        '</tr>'
        ;
        rows = rows + row;
    }
     return '<tbody class="table__body">' + rows + '</tbody>';
}

var title = 
'<thead class="table__header">' +
'<tr>' +
 '<th>Nombre</th>' +
 '<th>Calidad</th>' + 
 '<th>Cantidad</th>' + 
 '<th>Precio/th>' + 
 '<th>Total por producto</th>' + 
'</tr>' +
'</thead>';

var createFooter = function(arr) {
    var totalPrice = 0;

    for (let i = 0; i < arr.length; i++) {
        var totalProductPrice = arr[i].quantity * arr[i].price 
        totalPrice += totalProductPrice;
    }
    return (
        '<tfoot class="table__footer">' + 
        '<tr>' + 
          '<td>total: ' + totalPrice + 'euros</td>' +
        '</tr>' +
        '</tfoot>'
    )
}

