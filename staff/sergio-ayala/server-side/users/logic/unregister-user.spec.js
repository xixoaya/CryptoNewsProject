const { expect } = require('chai')
const unregisterUser = require('./unregister-user')
const { MongoClient, ObjectId } = require('mongodb')
const context = require('./context');

describe('Unregister', () => {
    let users, db, client

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect(error => {
            if (error) done(error)
            else {

                db = client.db('demo')
                context.db = db

                users = db.collection('users')

                users.createIndex({ username: 1 }, { unique: true })

                done()
            }
        })
    })

    beforeEach(done => {
        users.deleteMany({}, done)
    })

    let user, userId

    beforeEach(done => {
        user = {
            name: 'Juana la Loca',
            username: 'crazyJ',
            password: '123123123'
        }
        users.insertOne(user, (error, result) => {
            if (error) done(error)
            else {
                userId = result.insertedId.toString()

                done()
            }
        })
    })

    describe('when user with id given exists', () => {
        it('should succed if password is correct', (done) => {
            const { password} = user

            unregisterUser(userId, password, (error) => {
                if (error) return done(error)
                // expect(res).to.equal({Succeed: 'user deleted'})
                expect(error).to.be.null

                users.findOne({_id: ObjectId(userId)}, (error, user) => {
                    if (error) return done(error)

                    expect(user).to.be.null
                })
                done () 
            }) 
             
        });

        it('should fail if password is wrong', (done) => {
            let { password} = user

            password += '-wrong'

            unregisterUser(userId, password, (error, res) => {
                expect(error).to.exist
                expect(error.message).to.equal('invalid password to delete account')

                done()
            })   
        }); 
        
    });

    describe('When id given doesnt match any user', () => {
        it('should fail if userId doesnt exist', (done) => {
            const userId = ObjectId().toString()
            const { password} = user

            unregisterUser(userId, password, (error) => {
                expect(error).to.exist
                expect(error.message).to.equal(`User not found with the id: ${userId}`)
                
                done () 
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
                expect(() => unregisterUser('', '123123123', () => { })).to.throw(Error, 'id is empty or blank')

                expect(() => unregisterUser('   ', '123123123', () => { })).to.throw(Error, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => unregisterUser(' abcd1234abcd1234abcd1234 ', '123123123', () => { })).to.throw(Error, 'id has blank spaces')

                expect(() => unregisterUser('abcd 1234abc d1234abc d1234', '123123123', () => { })).to.throw(Error, 'id has blank spaces')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => unregisterUser('abc', '123123123', () => { })).to.throw(Error, 'id doesn\'t have 24 characters')
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
                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '' , () => { })).to.throw(Error, 'password is empty or blank')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '   ' , () => { })).to.throw(Error, 'password is empty or blank')
            })

            it('should fail when password has spaces', () => {
                expect(() => unregisterUser('abcd1234abcd1234abcd1234', ' 123123123 ' , () => { })).to.throw(Error, 'password has blank spaces')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '123 123 123' , () => { })).to.throw(Error, 'password has blank spaces')
            })

            it('should fail when password length is less that 6 characters', () => {
                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '12123' , () => { })).to.throw(Error, 'password is to short')
            })
        })

        describe('when callback is not valid', () => {
            it('should fail when callback is not a string', () => {
                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '123123123', true)).to.throw(TypeError, 'callback is not a function')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '123123123', 123)).to.throw(TypeError, 'callback is not a function')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '123123123', {})).to.throw(TypeError, 'callback is not a function')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '123123123', '...')).to.throw(TypeError, 'callback is not a function')

                expect(() => unregisterUser('abcd1234abcd1234abcd1234', '123123123', [])).to.throw(TypeError, 'callback is not a function')
            })
        })
    });

    after(done => users.deleteMany({}, error => {
        if (error) return done(error)
        client.close(done)
    }))
    
});
