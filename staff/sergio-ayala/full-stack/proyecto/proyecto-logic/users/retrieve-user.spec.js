require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('proyecto-data')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError} = require('proyecto-errors')

const { env: { MONGO_URL } } = process

describe('Retrieve User', () => {
    before(() => mongoose.connect(MONGO_URL))
    beforeEach(() => User.deleteMany())
    let user, userId

    beforeEach(() => {
        user = {
            name: 'Juana la Loca',
            username: 'crazyJ',
            password: '123123123'
        }
        return User.create(user)
            .then(user => userId = user.id)
    })


    it('should suceed with correct id of an existing user', () => {
        const { name, username } = user

        return retrieveUser(userId)
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.username).to.equal(username)
            })      
    });

    it('should fail with incorrect id', () => {
        userId = new ObjectId().toString()

        return retrieveUser(userId)
        .then(() => { throw new Error('Should not arrive here') })
        .catch(error => {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`No user with the id: ${userId}`)
        })
    });

    describe('when parameters are not valid', () => {
        describe('when id is not valid', () => {
            it('should fail when id is not a string', () => {
                expect(() => retrieveUser(true, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser(123, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser({}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser(() => { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser([], () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('should fail when id is empty or blank', () => {
                expect(() => retrieveUser('', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveUser('   ', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => retrieveUser(' abcd1234abcd1234abcd1234 ', () => { })).to.throw(FormatError, 'id has blank spaces')

                expect(() => retrieveUser('abcd 1234abc d1234abc d1234', () => { })).to.throw(FormatError, 'id has blank spaces')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => retrieveUser('abc', () => { })).to.throw(FormatError, 'id doesn\'t have 24 characters')
            })
        })

    })

    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )
    
})
