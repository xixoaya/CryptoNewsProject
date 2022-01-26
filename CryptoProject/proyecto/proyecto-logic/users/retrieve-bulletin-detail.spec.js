require('dotenv').config()

const { expect } = require('chai')
const retrieveBulletinDetail = require('./retrieve-bulletin-detail')
const { mongoose, models: { Bulletin } } = require('proyecto-data')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError} = require('proyecto-errors')

const { env: { MONGO_URL } } = process

describe('Retrieve Bulletin Detail', () => {
    before(() => mongoose.connect(MONGO_URL))
    //beforeEach(() => Bulletin.deleteMany())
    let bulletin, bulletinId
    
    describe('When CT notice detail doesnt exist', () => {
        
        // beforeEach(() => {
        //     bulletin = {
        //         title: " La blockchain empresarial desempeñará un papel fundamental en la creación de un futuro sostenible ",
        //         subTitle: " Las empresas están recurriendo a soluciones empresariales basadas en blockchain para cumplir con los objetivos de sostenibilidad medioambiental, así como con las exigencias empresariales ",
        //         url: "https://es.cointelegraph.com/news/enterprise-blockchain-to-play-a-pivotal-role-in-creating-a-sustainable-future",
        //         badge: " Opinión ",
        //         imageSrc: "Unknown image Src",
        //         author: " Matthew Van Niekerk ",
        //         date: "2021-12-13",
        //         source: "cointelegraph",
        //         savedDate: new Date()
        //     }
        //     return Bulletin.create(bulletin)
        //         .then(bulletin => bulletinId = bulletin.id)
        // })
    
    
        it('should suceed with correct id of an existing bulletin of CT and add impContent', () => {
            //const { title, url, subTitle, badge, author, source } = bulletin
    
            return retrieveBulletinDetail("61bcb7b3e66bbefecfc1b9f0")
                // .then(bulletin => {
                    
                //     expect(bulletin).to.exist
                //     expect(bulletin.imageSrc).to.exist
                //     expect(bulletin.title).to.equal(title)
                //     expect(bulletin.url).to.equal(url)
                //     expect(bulletin.subTitle).to.equal(subTitle)
                //     expect(bulletin.badge).to.equal(badge)
                //     expect(bulletin.author).to.equal(author)
                //     expect(bulletin.source).to.equal(source)
                //     expect(bulletin.impContent).to.have.lengthOf.above(0)
                // })      
        }).timeout(50000)
    });

    // describe('When OB notice detail doesnt exist', () => {
        
    //     beforeEach(() => {
    //         bulletin = {
    //             title: "FMI señala aumento de conexiones entre criptodivisas y finanzas reguladas",
    //             subTitle: "El Fondo Monetario Internacional (FMI) ha señalado el aumento de las interconexiones entre las criptodivisas y el sistema financiero regulado.…",
    //             url: "https://observatorioblockchain.com/criptomonedas/fmi-senala-aumento-de-conexiones-entre-criptodivisas-y-finanzas-reguladas/",
    //             badge: "CRIPTOMONEDAS",
    //             author: " OBSERVATORIO BLOCKCHAIN",
    //             createdTime: "DIC 10, 2021",
    //             source: "observatorioblockchain",
    //             savedDate: new Date()

    //         }
    //         return Bulletin.create(bulletin)
    //             .then(bulletin => bulletinId = bulletin.id)
    //     })
    
    
    //     it('should suceed with correct id of an existing bulletin of CT and add impContent', () => {
    //         const { title, url, subTitle, badge, author, source } = bulletin
    
    //         return retrieveBulletinDetail(bulletinId)
    //             .then(bulletin => {
                    
    //                 expect(bulletin).to.exist
    //                 // expect(bulletin.imageSrc).to.exist
    //                 expect(bulletin.title).to.equal(title)
    //                 expect(bulletin.url).to.equal(url)
    //                 expect(bulletin.subTitle).to.equal(subTitle)
    //                 expect(bulletin.badge).to.equal(badge)
    //                 expect(bulletin.author).to.equal(author)
    //                 expect(bulletin.source).to.equal(source)
    //                 expect(bulletin.impContent).to.have.lengthOf.above(0)
    //             })      
    //     }).timeout(50000)
    // });
    
    describe('When C24 notice detail doesnt exist', () => {
        
        beforeEach(() => {
            bulletin = {
                title: "Precio de Bitcoin: BTC no logra mantenerse y vuelve a caer un 2%",
                url: "https://www.cripto247.com/comunidad-cripto/precio-de-bitcoin-btc-no-logra-mantenerse-y-vuelve-a-caer-un-2-208449",
                badge: "COTIZACIÓN",
                source: "cripto247",
                savedDate: new Date()
            }
            return Bulletin.create(bulletin)
                .then(bulletin => bulletinId = bulletin.id)
        })
    
    
        it('should suceed with correct id of an existing bulletin of C24 and add impContent', () => {
            const { title, url, badge, source } = bulletin
    
            return retrieveBulletinDetail(bulletinId)
                .then(bulletin => {
                    debugger
                    expect(bulletin).to.exist
                    // expect(bulletin.imageSrc).to.exist
                    expect(bulletin.title).to.equal(title)
                    expect(bulletin.url).to.equal(url)
                    // expect(bulletin.badge).to.equal(badge)
                    // expect(bulletin.author).to.exist
                    expect(bulletin.source).to.equal(source)
                    expect(bulletin.impContent).to.have.lengthOf.above(0)
                    // expect(bulletin.subTitle).to.exist
                })      
        }).timeout(50000)
    });


    it('should fail with incorrect id', () => {
        bulletinId = new ObjectId().toString()

        return retrieveBulletinDetail(bulletinId)
        .then(() => { throw new Error('Should not arrive here') })
        .catch(error => {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`Not news founded with id ${bulletinId}`)
        })
    });

    describe('when parameters are not valid', () => {
        describe('when id is not valid', () => {
            it('should fail when id is not a string', () => {
                expect(() => retrieveBulletinDetail(true, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveBulletinDetail(123, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveBulletinDetail({}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveBulletinDetail(() => { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveBulletinDetail([], () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('should fail when id is empty or blank', () => {
                expect(() => retrieveBulletinDetail('', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveBulletinDetail('   ', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => retrieveBulletinDetail(' abcd1234abcd1234abcd1234 ', () => { })).to.throw(FormatError, 'id has blank spaces')

                expect(() => retrieveBulletinDetail('abcd 1234abc d1234abc d1234', () => { })).to.throw(FormatError, 'id has blank spaces')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => retrieveBulletinDetail('abc', () => { })).to.throw(FormatError, 'id doesn\'t have 24 characters')
            })
        })

    })

    after(() =>
        //Bulletin.deleteMany()
          //  .then(() => mongoose.disconnect())
          mongoose.disconnect()
    )
    
})
