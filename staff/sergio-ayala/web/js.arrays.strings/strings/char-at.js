function charAt(string, position = 0) {
   var res = ''
   if (position >= 0 && position <= string.length - 1) { res = string[position]}

   return res
}