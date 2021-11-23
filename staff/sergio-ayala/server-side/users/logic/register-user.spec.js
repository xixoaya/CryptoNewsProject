const { expect } = require('chai')
const registerUser = require('./register-user')
const { MongoClient } = require('mongodb')
const context = require('./context')

describe('Register User', () => {
    let users, db, client

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect(error => {
            if (error) return done(error)
            db = client.db('demo')
            context.db = db

            users = db.collection('users')

            users.createIndex({ username: 1 }, { unique: true })

            done()
        })
    })

    beforeEach(done => {
        users.deleteMany({}, done)
    })
    
    
    describe('When user doesnt exists', () => {

        it('should succeed with new user', (done) => {
            const name = 'Juana la Loca'
            const username = 'crazyJ'
            const password = '123123123'

            registerUser(name, username, password, (error) => {
                if (error) return done(error)

                users.findOne({ username }, (error, user) => {
                    if (error) return done(error)

                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(password)
                    done()
                })
            })

        });
    });

    describe('When username already exists', () => {
        let user
        beforeEach(done => {
            user = {
                name: 'Pepito palotes',
                username: 'pepito84',
                password: '123123123'
            }
            users.insertOne(user, done)
        })

        it('should fail when username already exists', (done) => {
            const {name, username, password} = user

            registerUser(name, username, password, error => {
                expect(error).to.exist
                expect(error.message).to.equal(`User with username ${username} already exists`)
                done()
            })

        });
   
    });

    describe('validation parameters with invalid data', () => {
        describe('When name is not valid', () => {
            it('should fail when name is not a string', () => {
                expect(() => registerUser(true, 'pepito84', '123213123', ()=>{ })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser({}, 'pepito84', '123213123', ()=>{ })).to.throw(TypeError, 'name is not a string')
                // expect(() => registerUser(pepito, 'pepito84', '123213123', ()=>{ })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser(123, 'pepito84', '123213123', ()=>{ })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser(()=>{}, 'pepito84', '123213123', ()=>{ })).to.throw(TypeError, 'name is not a string')
            });
            it('should fail when name is empty or blank', () => {
                expect(() => registerUser('', 'pepito84', '123213123', ()=>{ })).to.throw(Error, 'Name is empty or blank')
                expect(() => registerUser('   ', 'pepito84', '123213123', ()=>{ })).to.throw(Error, 'Name is empty or blank')
                
            });
            it('should fail when name has spaces around', () => {
                expect(() => registerUser('pepito palotes ', 'pepito84', '123213123', ()=>{ })).to.throw(Error, 'Name has spaces around')  
            });
            
        });

        describe('When username is not valid', () => {
            it('should fail when username is not a string', () => {
                expect(() => registerUser('Pepito palotes',true, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('Pepito palotes',{}, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
                // expect(() => registerUser('Pepito palotes',pepito, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('Pepito palotes',123, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('Pepito palotes',()=>{}, '123213123', ()=>{ })).to.throw(TypeError, 'username is not a string')
            });
            it('should fail when username is empty or blank', () => {
                expect(() => registerUser('Pepito palotes', '', '123213123', ()=>{ })).to.throw(Error, 'username is empty or blank')
                expect(() => registerUser('Pepito palotes', '  ', '123213123', ()=>{ })).to.throw(Error, 'username is empty or blank')
                
            });
            it('should fail when username has spaces around', () => {
                expect(() => registerUser('pepito palotes', 'pepi to84', '123213123', ()=>{ })).to.throw(Error, 'username has blank spaces')  
                expect(() => registerUser('pepito palotes', 'pepito84 ', '123213123', ()=>{ })).to.throw(Error, 'username has blank spaces')  
            });
            it('should fail when username has less than 6 chars', () => {
                expect(() => registerUser('pepito palotes', 'pepi', '123213123', ()=>{ })).to.throw(Error, 'username is to short')  
                expect(() => registerUser('pepito palotes', 'pepit', '123213123', ()=>{ })).to.throw(Error, 'username is to short')  
            });
            
        });

        describe('When password is not valid', () => {
            it('should fail when password is not a string', () => {
                expect(() => registerUser('Pepito palotes','pepito84',true, ()=>{ })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('Pepito palotes','pepito84',{}, ()=>{ })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('Pepito palotes','pepito84',123, ()=>{ })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('Pepito palotes','pepito84',()=>{}, ()=>{ })).to.throw(TypeError, 'password is not a string')
            });
            it('should fail when password is empty or blank', () => {
                expect(() => registerUser('Pepito palotes', 'pepito84', '', ()=>{ })).to.throw(Error, 'password is empty or blank')
                expect(() => registerUser('Pepito palotes', 'pepito84', '  ', ()=>{ })).to.throw(Error, 'password is empty or blank')
                
            });
            it('should fail when password has spaces around', () => {
                expect(() => registerUser('pepito palotes', 'pepito84', '123213 123', ()=>{ })).to.throw(Error, 'password has blank spaces')  
                expect(() => registerUser('pepito palotes', 'pepito84', ' 123213123', ()=>{ })).to.throw(Error, 'password has blank spaces')  
            });
            it('should fail when password has less than 6 chars', () => {
                expect(() => registerUser('pepito palotes', 'pepito84', '12', ()=>{ })).to.throw(Error, 'password is to short')  
                expect(() => registerUser('pepito palotes', 'pepito84', '12321', ()=>{ })).to.throw(Error, 'password is to short')  
            });
            
        });

        describe('When callback is not valid', () => {
            it('should fail when callback is not a function', () => {
                expect(() => registerUser('Pepito palotes','pepito84', '123123', true)).to.throw(TypeError, 'callback is not a function')
                expect(() => registerUser('Pepito palotes','pepito84', '123123', {})).to.throw(TypeError, 'callback is not a function')
                expect(() => registerUser('Pepito palotes','pepito84', '123123', 123)).to.throw(TypeError, 'callback is not a function')
                expect(() => registerUser('Pepito palotes','pepito84', '123123', 'callback')).to.throw(TypeError, 'callback is not a function')
            });
            
        });
         
    });
    


    after(done => {
        client.close(done)
    })

});
