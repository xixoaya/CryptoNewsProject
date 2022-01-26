require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('./authenticate-user')
const { mongoose, models: { User } } = require('proyecto-data')
const { CredentialsError, FormatError } = require('proyecto-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('Authenticate User', () => {

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    let user, userId

    beforeEach(() => {
        user = {
            name: 'Juana la Loca',
            username: 'crazyJ',
            password: '123123123'
        }
        return User.create({...user, password: bcrypt.hashSync(user.password)})
            .then(user => userId = user.id)
    })

    it('should pass when username and password are correct and of an existing user', () => {
        const { username, password } = user

        return authenticateUser(username, password)
            .then(id => {
                expect(id).to.exist
                expect(id).to.equal(userId)
            })
    });

    it('should fail when username doesnt match any existing user', () => {
        const { username, password } = user

        return authenticateUser(username + 'wrong', password)

            .then(() => { throw new Error('Should not arrive here') })
            .catch(error => {

                expect(error).to.exist
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('Wrong credentials')

            })
    });

    it('should fail when password is incorrect for an existing username', () => {
        const { username, password } = user

        return authenticateUser(username, password + 'wrong')

            .then(() => { throw new Error('Should not arrive here') })
            .catch(error => {

                expect(error).to.exist
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('Wrong credentials')
            })
    });

    it('should fail when password & username are incorrect', () => {
        const { username, password } = user

        return authenticateUser(username + 'Wrong', password + 'wrong')

            .then(() => { throw new Error('Should not arrive here') })
            .catch(error => {

                expect(error).to.exist
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('Wrong credentials')
            })
    });

    describe('validation parameters with invalid data', () => {

        describe('When username is not valid', () => {
            it('should fail when username is not a string', () => {
                expect(() => authenticateUser(true, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => authenticateUser({}, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => authenticateUser(123, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => authenticateUser(() => { }, '123213123', () => { })).to.throw(TypeError, 'username is not a string')
            });
            it('should fail when username is empty or blank', () => {
                expect(() => authenticateUser('', '123213123', () => { })).to.throw(FormatError, 'username is empty or blank')
                expect(() => authenticateUser('  ', '123213123', () => { })).to.throw(FormatError, 'username is empty or blank')

            });
            it('should fail when username has spaces around', () => {
                expect(() => authenticateUser('pepi to84', '123213123', () => { })).to.throw(FormatError, 'username has blank spaces')
                expect(() => authenticateUser('pepito84 ', '123213123', () => { })).to.throw(FormatError, 'username has blank spaces')
            });
            it('should fail when username has less than 4 chars', () => {
                expect(() => authenticateUser('pep', '123213123', () => { })).to.throw(FormatError, 'username has less than 4 characters')
                expect(() => authenticateUser('p', '123213123', () => { })).to.throw(FormatError, 'username has less than 4 characters')
            });

        });

        describe('When password is not valid', () => {
            it('should fail when password is not a string', () => {
                expect(() => authenticateUser('pepito84', true, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('pepito84', {}, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('pepito84', 123, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('pepito84', () => { }, () => { })).to.throw(TypeError, 'password is not a string')
            });
            it('should fail when password is empty or blank', () => {
                expect(() => authenticateUser('pepito84', '', () => { })).to.throw(FormatError, 'password is empty or blank')
                expect(() => authenticateUser('pepito84', '  ', () => { })).to.throw(FormatError, 'password is empty or blank')

            });
            it('should fail when password has spaces around', () => {
                expect(() => authenticateUser('pepito84', '123213 123', () => { })).to.throw(FormatError, 'password has blank spaces')
                expect(() => authenticateUser('pepito84', ' 123213123', () => { })).to.throw(FormatError, 'password has blank spaces')
            });
            it('should fail when password has less than 6 chars', () => {
                expect(() => authenticateUser('pepito84', '12', () => { })).to.throw(FormatError, 'password has less than 6 characters')
                expect(() => authenticateUser('pepito84', '12321', () => { })).to.throw(FormatError, 'password has less than 6 characters')
            });

        });

    });


    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )

});
