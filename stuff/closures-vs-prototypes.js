// Programación funcional vs programación orientada a objetos
//  https://yosoydani.com/la-diferencia-programacion-funcional-orientada-objetos/

// Documentación de prototype
//  https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes

// Documentación de closures
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

// Explicación patrón módulo
//  https://anexsoft.com/patron-modulo-con-javascript-module-pattern


// Implementa la lógica de una calculadora con una closure y el patrón módulo --- P. funcional
var closureCalc = (function () {

    var result = 0;

    return({
        getResult: function() {
            return result;
        },
        setResult: function(x) {
            result = x;
            return this.getResult();
        },
        reset: function() {
            result = 0;
            return this.getResult();
        },
        sum: function() {
            for (let i = 0; i < arguments.length; i++) {
                result += arguments[i];
            }
            return this.getResult();
        },
        sub: function() {
            for (let i = 0; i < arguments.length; i++) {
                result -= arguments[i];
            }
            return this.getResult();
        }
    })
})()


// Implementa la lógica de una calculadora utilizando prototype --- POO
function ProtoCalc() {
    this.result = 0;
}

ProtoCalc.prototype.getResult = function() {
    return this.result;
}

ProtoCalc.prototype.setResult = function(x) {
    this.result = x;
    return this.getResult();
}

ProtoCalc.prototype.reset = function() {
    this.result = 0;
    return this.getResult();
}

ProtoCalc.prototype.sum = function() {
    for (let i = 0; i < arguments.length; i++) {
        this.result += arguments[i];
    }
    return this.getResult();
}

ProtoCalc.prototype.sub = function() {
    for (let i = 0; i < arguments.length; i++) {
        this.result -= arguments[i];
    }
    return this.getResult();
}

var protoCalc = new ProtoCalc;