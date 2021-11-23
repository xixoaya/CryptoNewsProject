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
            
        });
        


        
    });
    


    after(done => {
        client.close(done)
    })

});
