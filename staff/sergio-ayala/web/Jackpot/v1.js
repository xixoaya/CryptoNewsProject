function jackpot(initCash) {
    var _initCash = initCash

    return {
        bet: function (ourbet) {
            if (_initCash >= 20 && ourbet === Math.floor(Math.random()*6)){
                console.log('Has acertado!')
                _initCash = _initCash + 10;
            }else if(_initCash >= 20 ){
                console.log('Has perdido!')
                _initCash = _initCash - 20;
            }else{
                console.log('No tienes dinero para apostar, tienes '+ _initCash +'. Usa jackpot.addCash(cantidad)')         
            }
        },

        addCash: function (cash) {
            _initCash += cash
            console.log('Se ha añadido '+ cash +' a tu cuenta. Saldo: '+ _initCash)
        },

        viewCash: function () {
            console.log('tienes un saldo disponible de '+ _initCash +'€')
        },

        checkOut: function(cash) {
            if(cash<_initCash){
                _initCash -= cash
                console.log('Se ha extraido '+ cash +' de tu cuenta. Saldo: '+ _initCash)
            }
            else console.log('No tienes tanto dinero. Saldo: '+ _initCash)

        }
    }
}

var play = jackpot(100)
