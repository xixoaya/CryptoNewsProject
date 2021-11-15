console.log(process)

const fs = require('fs')
const { readFile, writeFile } = fs

const { argv: [, , comand, name] } = process
// process.argv[3] = comand

if (comand === 'saludar') {
    console.log(`hola ${name}`)
}

if (comand === 'despedir') {
    console.log(`adiós ${name}`)
}