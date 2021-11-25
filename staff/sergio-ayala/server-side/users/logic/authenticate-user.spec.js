const { expect } = require('chai')
const authenticateUser = require('./authenticate-user')
const { MongoClient } = require('mongodb')
const context = require('./context')

describe('Authenticate User', () => {
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

    it('should pass when username and password are correct and of an existing user', (done) => {
        const { username, password } = user

        authenticateUser(username, password, (error, id) => {
            if (error) done(error)
            else {
                expect(id).to.exist
                expect(id).to.equal(userId)
                done()
            }
        })

    });

    it('should fail when username doesnt match any existing user', (done) => {
        const { username, password } = user

        authenticateUser(username + 'wrong', password, (error, id) => {

            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials')

            expect(id).to.be.undefined
            done()

        })

    });

    it('should fail when password is incorrect for an existing username', (done) => {
        const { username, password } = user

        authenticateUser(username , password + 'wrong', (error, id) => {

            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials')

            expect(id).to.be.undefined
            done()

        })

    });

    it('should fail when password & username are incorrect', (done) => {
        const { username, password } = user

        authenticateUser(username + 'Wrong' , password + 'wrong', (error, id) => {

            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials')

            expect(id).to.be.undefined
            done()

        })

    });

    describe('validation parameters with invalid data', () => {
        
        describe('When username is not valid', () => {
            it('should fail when username is not a string', () => {
                expect(() => authenticateUser(true, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
                expect(() => authenticateUser({}, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
                expect(() => authenticateUser(123, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
                expect(() => authenticateUser(()=>{}, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
            });
            it('should fail when username is empty or blank', () => {
                expect(() => authenticateUser( '', '123213123', ()=>{ })).to.throw(Error, 'username is empty or blank')
                expect(() => authenticateUser( '  ', '123213123', ()=>{ })).to.throw(Error, 'username is empty or blank')
                
            });
            it('should fail when username has spaces around', () => {
                expect(() => authenticateUser( 'pepi to84', '123213123', ()=>{ })).to.throw(Error, 'username has blank spaces')  
                expect(() => authenticateUser( 'pepito84 ', '123213123', ()=>{ })).to.throw(Error, 'username has blank spaces')  
            });
            it('should fail when username has less than 6 chars', () => {
                expect(() => authenticateUser( 'pepi', '123213123', ()=>{ })).to.throw(Error, 'username is to short')  
                expect(() => authenticateUser( 'pepit', '123213123', ()=>{ })).to.throw(Error, 'username is to short')  
            });
            
        });

        describe('When password is not valid', () => {
            it('should fail when password is not a string', () => {
                expect(() => authenticateUser('pepito84',true, ()=>{ })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('pepito84',{}, ()=>{ })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('pepito84',123, ()=>{ })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('pepito84',()=>{}, ()=>{ })).to.throw(TypeError, 'password is not a string')
            });
            it('should fail when password is empty or blank', () => {
                expect(() => authenticateUser( 'pepito84', '', ()=>{ })).to.throw(Error, 'password is empty or blank')
                expect(() => authenticateUser( 'pepito84', '  ', ()=>{ })).to.throw(Error, 'password is empty or blank')
                
            });
            it('should fail when password has spaces around', () => {
                expect(() => authenticateUser( 'pepito84', '123213 123', ()=>{ })).to.throw(Error, 'password has blank spaces')  
                expect(() => authenticateUser( 'pepito84', ' 123213123', ()=>{ })).to.throw(Error, 'password has blank spaces')  
            });
            it('should fail when password has less than 6 chars', () => {
                expect(() => authenticateUser( 'pepito84', '12', ()=>{ })).to.throw(Error, 'password is to short')  
                expect(() => authenticateUser( 'pepito84', '12321', ()=>{ })).to.throw(Error, 'password is to short')  
            });
            
        });

        describe('When callback is not valid', () => {
            it('should fail when callback is not a function', () => {
                expect(() => authenticateUser('pepito84', '123123', true)).to.throw(TypeError, 'callback is not a function')
                expect(() => authenticateUser('pepito84', '123123', {})).to.throw(TypeError, 'callback is not a function')
                expect(() => authenticateUser('pepito84', '123123', 123)).to.throw(TypeError, 'callback is not a function')
                expect(() => authenticateUser('pepito84', '123123', 'callback')).to.throw(TypeError, 'callback is not a function')
            });
            
        });
         
    });
    



    after(done => users.deleteMany({}, error => {
        if (error) return done(error)
        client.close(done)
    }))

});
