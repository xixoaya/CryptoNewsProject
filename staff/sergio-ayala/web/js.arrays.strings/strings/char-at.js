function charAt(string, position) {
   var position = position? position : 0; 
   if (position < 0 || position > string.length - 1) { position = 0}

   return string[position]
}