require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./register-user')
const { mongoose, models: { User } } = require('data')
const context = require('./context')
const { ConflictError, FormatError } = require('errors')

const { env: { MONGO_URL } } = process

describe('Register User', () => {

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    describe('When user doesnt exists', () => {

        it('should succeed with new user', () => {
            const name = 'Juana la Loca'
            const username = 'crazyJ'
            const password = '123123123'

            return registerUser(name, username, password)
                .then(res => {
                    expect(res).to.be.undefined

                    return User.findOne({ username })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(password)
                })
        });
    });

    describe('When username already exists', () => {
        let user
        beforeEach(() => {
            user = {
                name: 'Pepito palotes',
                username: 'pepito84',
                password: '123123123'
            }
            return User.create(user)
        })

        it('should fail when username already exists', () => {
            const { name, username, password } = user

            return registerUser(name, username, password)
                .then(() => { throw new Error('Should not arrive here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(ConflictError)
                    expect(error.message).to.equal(`User with username ${username} already exists`)
                })
        });

    });

    describe('validation parameters with invalid data', () => {
        describe('When name is not valid', () => {
            it('should fail when name is not a string', () => {
                expect(() => registerUser(true, 'pepito84', '123213123', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser({}, 'pepito84', '123213123', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser(123, 'pepito84', '123213123', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser(() => { }, 'pepito84', '123213123', () => { })).to.throw(TypeError, 'name is not a string')
            });
            it('should fail when name is empty or blank', () => {
                expect(() => registerUser('', 'pepito84', '123213123', () => { })).to.throw(FormatError, 'name is empty or blank')
                expect(() => registerUser('   ', 'pepito84', '123213123', () => { })).to.throw(FormatError, 'name is empty or blank')

            });
            it('should fail when name has spaces around', () => {
                expect(() => registerUser('pepito palotes ', 'pepito84', '123213123', () => { })).to.throw(FormatError, 'name has spaces around')
            });

        });

        describe('When username is not valid', () => {
            it('should fail when username is not a string', () => {
                expect(() => registerUser('Pepito palotes', true, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('Pepito palotes', {}, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('Pepito palotes', 123, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('Pepito palotes', () => { }, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
            });
            it('should fail when username is empty or blank', () => {
                expect(() => registerUser('Pepito palotes', '', '123213123', () => { })).to.throw(FormatError, 'username is empty or blank')
                expect(() => registerUser('Pepito palotes', '  ', '123213123', () => { })).to.throw(FormatError, 'username is empty or blank')

            });
            it('should fail when username has spaces around', () => {
                expect(() => registerUser('pepito palotes', 'pepi to84', '123213123', () => { })).to.throw(FormatError, 'username has blank spaces')
                expect(() => registerUser('pepito palotes', 'pepito84 ', '123213123', () => { })).to.throw(FormatError, 'username has blank spaces')
            });
            it('should fail when username has less than 4 chars', () => {
                expect(() => registerUser('pepito palotes', 'pep', '123213123', () => { })).to.throw(FormatError, 'username has less than 4 characters')
                expect(() => registerUser('pepito palotes', 'p', '123213123', () => { })).to.throw(FormatError, 'username has less than 4 characters')
            });

        });

        describe('When password is not valid', () => {
            it('should fail when password is not a string', () => {
                expect(() => registerUser('Pepito palotes', 'pepito84', true, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('Pepito palotes', 'pepito84', {}, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('Pepito palotes', 'pepito84', 123, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('Pepito palotes', 'pepito84', () => { }, () => { })).to.throw(TypeError, 'password is not a string')
            });
            it('should fail when password is empty or blank', () => {
                expect(() => registerUser('Pepito palotes', 'pepito84', '', () => { })).to.throw(FormatError, 'password is empty or blank')
                expect(() => registerUser('Pepito palotes', 'pepito84', '  ', () => { })).to.throw(FormatError, 'password is empty or blank')

            });
            it('should fail when password has spaces around', () => {
                expect(() => registerUser('pepito palotes', 'pepito84', '123213 123', () => { })).to.throw(FormatError, 'password has blank spaces')
                expect(() => registerUser('pepito palotes', 'pepito84', ' 123213123', () => { })).to.throw(FormatError, 'password has blank spaces')
            });
            it('should fail when password has less than 6 chars', () => {
                expect(() => registerUser('pepito palotes', 'pepito84', '12', () => { })).to.throw(FormatError, 'password has less than 6 characters')
                expect(() => registerUser('pepito palotes', 'pepito84', '12321', () => { })).to.throw(FormatError, 'password has less than 6 characters')
            });

        });

    });

    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )

});
