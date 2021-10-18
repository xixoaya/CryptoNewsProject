describe("Test concat")

// CASE 1

var group1 = new Biblio('hola','adios')
var group2 = new Biblio(1,2,3)
var res = group1.concat(group2)

if (res instanceof Biblio
    && res.length === 5
    && res[0] === group1[0])

    success('test ok')
else
    fail('test failed')


    // CASE 2

var group1 = new Biblio (1, 2, 3)
var group2 = new Biblio ('hola','adios')
var group3 = new Biblio ('mundo','cruel')
var res = group1.concat(group2, group3)

if (res instanceof Biblio
    && res.length === 7
    && res[0] === group1[0]
    && res[1] === group1[1]
    && res[2] === group1[2]
    && res[3] === group2[0]
    && res[4] === group2[1]
    && res[5] === group3[0]
    && res[6] === group3[1])
    success('test ok')
else
    fail('test failed')