require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('./unregister-user')
const { mongoose, models: { User } } = require('data')
const { Types: { ObjectId } } = mongoose
// const context = require('./context');
const { NotFoundError, CredentialsError, FormatError } = require('errors')

const { env: { MONGO_URL } } = process


describe('Unregister', () => {

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

    describe('when user with id given exists', () => {
        it('should succed if password is correct', () => {
            const { password} = user

            return unregisterUser(userId, password)
                .then(res => {
                    expect(res).to.be.undefined

                    return User.findById(userId)
                })
                .then(user => {
                    expect(user).to.be.null
                    
                })
             
        });

        it('should fail if password is wrong', () => {
            let { password} = user

            password += '-wrong'

            return unregisterUser(userId, password)
                .then(() => { throw new Error('Should not arrive here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal('invalid password to delete account')
                })   
        }); 
        
    });

    describe('When id given doesnt match any user', () => {
        it('should fail if userId doesnt exist', () => {
            const userId = ObjectId().toString()
            const { password} = user

            return unregisterUser(userId, password)
                .then(() => { throw new Error('Should not arrive here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`User not found with the id: ${userId}`)
                })
             
        }); 
    });
    
    describe('when parameters are not valid', () => {

        describe('when id is not valid', () => {
            it('should fail when id is not a string', () => {
                expect(() => unregisterUser(true, '123123123', () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser(123, '123123123', () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser({}, '123123123', () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser(() => { }, '123123123', () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser([], '123123123', () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('should fail when id is empty or blank', () => {
                expect(() => unregisterUser('', '123123123', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => unregisterUser('   ', '123123123', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => unregisterUser(' abcd1234abcd1234abcd1234 ', '123123123', () => { })).to.throw(FormatError, 'id has blank spaces')

                expect(() => unregisterUser('abcd 1234abc d1234abc d1234', '123123123', () => { })).to.throw(FormatError, 'id has blank spaces')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => unregisterUser('abc', '123123123', () => { })).to.throw(FormatError, 'id doesn\'t have 24 characters')
            })
        })
        
        describe('when password is not valid', () => {
            it('should fail when password is not a string', () => {
                expect(() => unregisterUser('abcd1234abcd1234abcd1234', true , () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', 123 , () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', {} , () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', () => { } , () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', [] , () => { })).to.throw(TypeError, 'password is not a string')
            })

            it('should fail when password is empty', () => {
                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '' , () => { })).to.throw(FormatError, 'password is empty or blank')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '   ' , () => { })).to.throw(FormatError, 'password is empty or blank')
            })

            it('should fail when password has spaces', () => {
                expect(() => unregisterUser('abcd1234abcd1234abcd1234', ' 123123123 ' , () => { })).to.throw(FormatError, 'password has blank spaces')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '123 123 123' , () => { })).to.throw(FormatError, 'password has blank spaces')
            })

            it('should fail when password length is less that 6 characters', () => {
                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '12123' , () => { })).to.throw(FormatError, 'password has less than 6 characters')
            })
        })

    });

    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )
    
});
