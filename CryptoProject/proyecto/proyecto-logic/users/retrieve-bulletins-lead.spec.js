require('dotenv').config()

const { expect } = require('chai')
const retrieveBulletinsLead = require('./retrieve-bulletins-lead')
const { mongoose, models: { Bulletin } } = require('proyecto-data')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('proyecto-errors')

const { env: { MONGO_URL } } = process

describe('Retrieve bulletins lead', () => {
    before(() => mongoose.connect(MONGO_URL))
    //beforeEach(() => Bulletin.deleteMany())

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
            // const { title, url, subTitle, badge, author, source } = bulletin

            return retrieveBulletinsLead(['61bb4004bf1ece624db16847', '61bb4004bf1ece624db16848', '61bb4004bf1ece624db16846', '61bb3ece2283a95e88c02165', '61bb3ece2283a95e88c02164' ])
        //         .then(bulletin => {

        //             expect(bulletin).to.exist
        //             expect(bulletin.imageSrc).to.exist
        //             expect(bulletin.title).to.equal(title)
        //             expect(bulletin.url).to.equal(url)
        //             expect(bulletin.subTitle).to.equal(subTitle)
        //             expect(bulletin.badge).to.equal(badge)
        //             expect(bulletin.author).to.equal(author)
        //             expect(bulletin.source).to.equal(source)
        //             expect(bulletin.impContent).to.have.lengthOf.above(0)
        //         })
         }).timeout(50000)
    });


    after(() => 
       // Bulletin.deleteMany()
        //    .then(() => mongoose.disconnect())
        mongoose.disconnect()
    )
})