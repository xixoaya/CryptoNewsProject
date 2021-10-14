function slice(string, inicio, final) {
 var copyInicio = inicio
 var copyFinal = final 
 var stringResult = ''

 copyInicio = copyInicio ? copyInicio : 0;
 copyInicio = copyInicio < 0 ? string.length + copyInicio : copyInicio;
 copyFinal = copyFinal ? copyFinal : string.length;
 copyFinal = copyFinal < 0 ? string.length + copyFinal : copyFinal

 
 for (var i = copyInicio; i < copyFinal; i++) {
     var char = string[i];
     stringResult += char
 }
 return stringResult
}
