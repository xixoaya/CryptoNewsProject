// require('dotenv').config()

// const { expect } = require('chai')
// const registerUser = require('./register-user')
// const { mongoose, models: { Bulletin } } = require('proyecto-data')
// //const { ConflictError, FormatError } = require('proyecto-errors')
// //const bcrypt = require('bcryptjs')

// const { env: { MONGO_URL } } = process

// describe('Register User', () => {

//     before(() => mongoose.connect(MONGO_URL))

//     beforeEach(() => Bulletin.deleteMany())

//     describe('When Url doesnt exists', () => {

//         it('should succeed with new Bulletin url', () => {
//             const bulletin = {
//                 title: "Precio de Bitcoin: BTC no logra mantenerse y vuelve a caer un 2%",
//                 url: "https://www.cripto247.com/comunidad-cripto/precio-de-bitcoin-btc-no-logra-mantenerse-y-vuelve-a-caer-un-2-208449",
//                 badge: "COTIZACIÓN"
//             },

//             return saveBulletin(bulletin = { title, url, badge })
//                 .then(res => {
//                     expect(res).to.be.undefined

//                     return Bulletin.findOne({ url })
//                 })
//                 .then(bulletin => {
//                     expect(bulletin).to.exist
//                     expect(bulletin.title).to.equal(title)
//                     expect(bulletin.url).to.equal(url)
//                     expect(bulletin.badge).to.equal(badge)
//                     //expect(bcrypt.compareSync(password, user.password)).to.be.true
//                 })
//         });

//         it('should succeed with new Bulletin url with more info', () => {
//             const bulletin = {
//                 title: " La blockchain empresarial desempeñará un papel fundamental en la creación de un futuro sostenible ",
//                 subTitle: " Las empresas están recurriendo a soluciones empresariales basadas en blockchain para cumplir con los objetivos de sostenibilidad medioambiental, así como con las exigencias empresariales ",
//                 url: "https://es.cointelegraph.com/news/enterprise-blockchain-to-play-a-pivotal-role-in-creating-a-sustainable-future",
//                 badge: " Opinión ",
//                 imageSrc: "Unknown image Src",
//                 author: " Matthew Van Niekerk ",
//                 date: "2021-12-13"
//             },

//             return saveBulletin(bulletin = { title, subTitle, url, badge, imageSrc, author, date })
//                 .then(res => {
//                     expect(res).to.be.undefined

//                     return Bulletin.findOne({ url })
//                 })
//                 .then(bulletin => {
//                     expect(bulletin).to.exist
//                     expect(bulletin.title).to.equal(title)
//                     expect(bulletin.url).to.equal(url)
//                     expect(bulletin.badge).to.equal(badge)
//                     expect(bulletin.imageSrc).to.equal(imageSrc)
//                     expect(bulletin.author).to.equal(author)
//                     expect(bulletin.date).to.equal(date)
//                     //expect(bcrypt.compareSync(password, user.password)).to.be.true
//                 })
//         });
//     });

//     describe('When url bulletin already exists', () => {
//         let bulletin
//         beforeEach(() => {
//             bulletin = {
//                 title: "El futuro de los NFT: ¡Es la comunidad, estúpido!",
//                 //subTitle: "Cuando empezaba en esto de Blockchain e intentaba comprender la lógica social, además de la tecnológica y económica, de esta…",
//                 url: "https://observatorioblockchain.com/nft/el-futuro-de-los-nft-es-la-comunidad-estupido/",
//                 badge: "NFT",
//                 //author: " JAVIER CALLEJO",
//                 createdTime: "DIC 12, 2021"
//             }
//             return Bulletin.create(bulletin)
//         })

//         it('should succeed updating title and ading info of an existing url', () => {
//             const { title,
//                 url,
//                 badge,
//                 createdTime
//             } = bulletin

//             const subTitle = "Cuando empezaba en esto de Blockchain e intentaba comprender la lógica social, además de la tecnológica y económica, de esta…",
//             const author = " JAVIER CALLEJO"
//             const content = [
//                 "La gestora de activos WisdomTree, con sede en Nueva York, ha modificado su presentación de un fondo de Bitcoin cotizado en bolsa ante la Comisión de Valores para nombrar a U.S. Bank como su custodio. ",
//                 "WisdomTree incluyó a U.S. Bank National Association como custodio de las acciones de su fondo de Bitcoin (BTC). La presentación es una enmienda a su registro del 11 de marzo ",
//                 " la SEC rechazó una propuesta de cambio de reglas del Cboe BZX Exchange para listar y negociar acciones del Bitcoin Trust de WisdomTree. ",
//                 " Una solicitud de ETF separada para el Ethereum Trust de WisdomTree presentada a la SEC en mayo sigue siendo objeto de revisión.",
//                 "Con más de 76,000 millones de dólares en activos gestionados, WisdomTree también ha lanzado cuatro índices de criptomonedas en Estados Unidos y Europa",
//                 "Los organismos reguladores de Estados Unidos aún no han aprobado un fondo cotizado en bolsa de criptomonedas. Sin embargo, la SEC dio luz verde a productos vinculados a los criptofuturos, incluidos los ETF de futuros de BTC de los gestores de inversiones ProShares y Valkyrie."
//             ]
//             const tags = [
//                 " #Bitcoin ",
//                 " #Empresas ",
//                 " #Inversiones ",
//                 " #SEC ",
//                 " #ETF "
//             ]

//             return saveBulletin({ title: 'updated title', subTitle, url, badge, author, createdTime, content, tags })
//                 .then(res => {
//                     expect(res).to.be.undefined

//                     return Bulletin.findOne({ url })
//                 })
//                 .then(bulletin => {
//                     expect(bulletin).to.exist
//                     expect(bulletin.title).to.equal(title)
//                     expect(bulletin.url).to.equal(url)
//                     expect(bulletin.badge).to.equal(badge)
//                     expect(bulletin.author).to.equal(author)
//                     expect(bulletin.content).to.equal(content)
//                     expect(bulletin.tags).to.equal(tags)
//                     //expect(bcrypt.compareSync(password, user.password)).to.be.true
//                 })
//         });

//         it('should fail updating url if title is empty', () => {
//             const { title,
//                 url,
//                 badge,
//                 createdTime
//             } = bulletin

//             const subTitle = "Cuando empezaba en esto de Blockchain e intentaba comprender la lógica social, además de la tecnológica y económica, de esta…",
//             const author = " JAVIER CALLEJO"

//             return saveBulletin({ title: ' ', subTitle, url, badge, author, createdTime })
//                 .then(() => { throw new Error('Should not arrive here') })
//                 .catch(error => {
//                     expect(error).to.exist
//                     expect(error).to.be.instanceOf(ConflictError)
//                     expect(error.message).to.equal(`cant find title for de url: ${url}`)
//                 })
//         });

//         it('should not update url info for new empty info but yes new info', () => {
//             const { title,
//                 url,
//                 badge,
//                 createdTime
//             } = bulletin

//             const subTitle = "Cuando empezaba en esto de Blockchain e intentaba comprender la lógica social, además de la tecnológica y económica, de esta…",
//             const author = " JAVIER CALLEJO"

//             return saveBulletin({ title, subTitle, url, badge: ' ', author, createdTime })
//                 .then(res => {
//                     expect(res).to.be.undefined

//                     return Bulletin.findOne({ url })
//                 })
//                 .then(bulletin => {
//                     expect(bulletin).to.exist
//                     expect(bulletin.title).to.equal(title)
//                     expect(bulletin.url).to.equal(url)
//                     expect(bulletin.badge).to.equal(badge)
//                     expect(bulletin.author).to.equal(author)
//                     expect(bulletin.createdTime).to.equal(createdTime)
//                     expect(bulletin.subTitle).to.equal(subTitle)
//                 })
//         });

//     });

//     // describe('validation parameters with invalid data', () => {
//     //     describe('When name is not valid', () => {
//     //         it('should fail when name is not a string', () => {
//     //             expect(() => registerUser(true, 'pepito84', '123213123', () => { })).to.throw(TypeError, 'name is not a string')
//     //             expect(() => registerUser({}, 'pepito84', '123213123', () => { })).to.throw(TypeError, 'name is not a string')
//     //             expect(() => registerUser(123, 'pepito84', '123213123', () => { })).to.throw(TypeError, 'name is not a string')
//     //             expect(() => registerUser(() => { }, 'pepito84', '123213123', () => { })).to.throw(TypeError, 'name is not a string')
//     //         });
//     //         it('should fail when name is empty or blank', () => {
//     //             expect(() => registerUser('', 'pepito84', '123213123', () => { })).to.throw(FormatError, 'name is empty or blank')
//     //             expect(() => registerUser('   ', 'pepito84', '123213123', () => { })).to.throw(FormatError, 'name is empty or blank')

//     //         });
//     //         it('should fail when name has spaces around', () => {
//     //             expect(() => registerUser('pepito palotes ', 'pepito84', '123213123', () => { })).to.throw(FormatError, 'name has spaces around')
//     //         });

//     //     });

//     //     describe('When username is not valid', () => {
//     //         it('should fail when username is not a string', () => {
//     //             expect(() => registerUser('Pepito palotes', true, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
//     //             expect(() => registerUser('Pepito palotes', {}, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
//     //             expect(() => registerUser('Pepito palotes', 123, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
//     //             expect(() => registerUser('Pepito palotes', () => { }, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
//     //         });
//     //         it('should fail when username is empty or blank', () => {
//     //             expect(() => registerUser('Pepito palotes', '', '123213123', () => { })).to.throw(FormatError, 'username is empty or blank')
//     //             expect(() => registerUser('Pepito palotes', '  ', '123213123', () => { })).to.throw(FormatError, 'username is empty or blank')

//     //         });
//     //         it('should fail when username has spaces around', () => {
//     //             expect(() => registerUser('pepito palotes', 'pepi to84', '123213123', () => { })).to.throw(FormatError, 'username has blank spaces')
//     //             expect(() => registerUser('pepito palotes', 'pepito84 ', '123213123', () => { })).to.throw(FormatError, 'username has blank spaces')
//     //         });
//     //         it('should fail when username has less than 4 chars', () => {
//     //             expect(() => registerUser('pepito palotes', 'pep', '123213123', () => { })).to.throw(FormatError, 'username has less than 4 characters')
//     //             expect(() => registerUser('pepito palotes', 'p', '123213123', () => { })).to.throw(FormatError, 'username has less than 4 characters')
//     //         });

//     //     });

//     //     describe('When password is not valid', () => {
//     //         it('should fail when password is not a string', () => {
//     //             expect(() => registerUser('Pepito palotes', 'pepito84', true, () => { })).to.throw(TypeError, 'password is not a string')
//     //             expect(() => registerUser('Pepito palotes', 'pepito84', {}, () => { })).to.throw(TypeError, 'password is not a string')
//     //             expect(() => registerUser('Pepito palotes', 'pepito84', 123, () => { })).to.throw(TypeError, 'password is not a string')
//     //             expect(() => registerUser('Pepito palotes', 'pepito84', () => { }, () => { })).to.throw(TypeError, 'password is not a string')
//     //         });
//     //         it('should fail when password is empty or blank', () => {
//     //             expect(() => registerUser('Pepito palotes', 'pepito84', '', () => { })).to.throw(FormatError, 'password is empty or blank')
//     //             expect(() => registerUser('Pepito palotes', 'pepito84', '  ', () => { })).to.throw(FormatError, 'password is empty or blank')

//     //         });
//     //         it('should fail when password has spaces around', () => {
//     //             expect(() => registerUser('pepito palotes', 'pepito84', '123213 123', () => { })).to.throw(FormatError, 'password has blank spaces')
//     //             expect(() => registerUser('pepito palotes', 'pepito84', ' 123213123', () => { })).to.throw(FormatError, 'password has blank spaces')
//     //         });
//     //         it('should fail when password has less than 6 chars', () => {
//     //             expect(() => registerUser('pepito palotes', 'pepito84', '12', () => { })).to.throw(FormatError, 'password has less than 6 characters')
//     //             expect(() => registerUser('pepito palotes', 'pepito84', '12321', () => { })).to.throw(FormatError, 'password has less than 6 characters')
//     //         });

//     //     });

//     // });

//     after(() =>
//         Bulletin.deleteMany()
//             .then(() => mongoose.disconnect())
//     )

// });