require('dotenv').config()

const { expect } = require('chai')
const modifyUser = require('./modify-user')
const { mongoose, models: { User } } = require('proyecto-data')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, ConflictError, CredentialsError, FormatError } = require('proyecto-errors')

const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('Modify User', () => {

    before(() => mongoose.connect(MONGO_URL))
    beforeEach(() => User.deleteMany())
    let user, userId

    beforeEach(() => {
        user = {
            name: 'Juana la Loca',
            username: 'crazyJ',
            password: '123123123'
        }
        return User.create({ ...user, password: bcrypt.hashSync(user.password) })
            .then(user => userId = user.id)
    })

    describe('When only user with id given already exist', () => {
        it('should succeed when change name and username', () => {
            let { name, username } = user
            name += 'updated'
            username += 'updated'
            const data = { name, username }

            return modifyUser(userId, data)
                .then(res => {
                    expect(res).to.be.undefined

                    return User.findById(userId)
                })
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.username).to.equal(username)
                })

        });

        it('should succeed when change password with oldPassword correct', () => {
            const { password: oldPassword } = user
            const password = oldPassword + 'updated'
            const data = { oldPassword, password }

            return modifyUser(userId, data)
                .then(res => {
                    expect(res).to.be.undefined

                    return User.findById(userId)
                })
                .then(user => expect(bcrypt.compareSync(password, user.password)).to.be.true)

        });

        it('should fail when change password with incorrect password', () => {
            let { password: oldPassword } = user
            const password = oldPassword + 'updated'
            oldPassword += '-wrong'
            const data = { oldPassword, password }

            return modifyUser(userId, data)
                .then(() => { throw new Error('Should not arrive here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal(`Wrong credentials`)
                })
        });

        it('should fail when change all with incorrect password', () => {
            let { password: oldPassword, name, username } = user
            const password = oldPassword + 'updated'
            oldPassword += '-wrong'
            const data = { oldPassword, password, name, username }

            return modifyUser(userId, data)
                .then(() => { throw new Error('Should not arrive here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal(`Wrong credentials`)
                })
        });

        it('should succeed when change all with oldPassword correct', () => {
            const { password: oldPassword, name, username } = user
            const password = oldPassword + 'updated'
            // const data = { password, oldPassword }
            const data = { oldPassword, password, name, username }

            return modifyUser(userId, data)
                .then(res => {
                    expect(res).to.be.undefined

                    return User.findById(userId)
                })
                .then(user => {
                    expect(user).to.exist
                    expect(bcrypt.compareSync(password, user.password)).to.be.true
                    expect(user.name).to.equal(name)
                    expect(user.username).to.equal(username)
                })
        });

    });

    describe('When exist other user ', () => {
        let user2
        beforeEach(() => {
            user2 = {
                name: 'Manolo el del Bombo',
                username: 'bombos',
                password: '123123123'
            }
            return User.create(user2)
        })

        it('should fail when change name and username to an existinng username', () => {
            let { name, username } = user
            name += 'updated'
            username = user2.username
            const data = { name, username }

            return modifyUser(userId, data)
                .then(() => { throw new Error('Should not arrive here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(ConflictError)
                    expect(error.message).to.equal(`user with Username ${username} already exists`)
                })
        });

        it('should fail when change all including password correctly but to an existing username', () => {
            let { password: oldPassword, name, username } = user
            const password = oldPassword + 'updated'
            name += 'updated'
            username = user2.username
            const data = { name, username, password, oldPassword }

            return modifyUser(userId, data)
                .then(() => { throw new Error('Should not arrive here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(ConflictError)
                    expect(error.message).to.equal(`user with Username ${username} already exists`)
                })
        });
    });

    describe('When there is no user to modify with the id given', () => {
        it('should fail when the id doesnt exist', () => {
            const userId = ObjectId().toString()

            return modifyUser(userId, {})
                .then(() => { throw new Error('Should not arrive here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`No user found with id ${userId}`)
                })
        });
    });


    describe('when parameters are not valid', () => {
        describe('when id is not valid', () => {
            it('should fail when id is not a string', () => {
                expect(() => modifyUser(true, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => modifyUser(123, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => modifyUser({}, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => modifyUser(() => { }, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => modifyUser([], {}, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('should fail when id is empty or blank', () => {
                expect(() => modifyUser('', {}, () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => modifyUser('   ', {}, () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => modifyUser(' abcd1234abcd1234abcd1234 ', {}, () => { })).to.throw(FormatError, 'id has blank spaces')

                expect(() => modifyUser('abcd 1234abc d1234abc d1234', {}, () => { })).to.throw(FormatError, 'id has blank spaces')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => modifyUser('abc', {}, () => { })).to.throw(FormatError, 'id doesn\'t have 24 characters')
            })
        })

        describe('when data is not valid', () => {
            it('should fail when data is not an object', () => {
                expect(() => modifyUser('abcd1234abcd1234abcd1234', true, () => { })).to.throw(TypeError, 'data is not an object')

                expect(() => modifyUser('abcd1234abcd1234abcd1234', 123, () => { })).to.throw(TypeError, 'data is not an object')

                expect(() => modifyUser('abcd1234abcd1234abcd1234', () => { }, () => { })).to.throw(TypeError, 'data is not an object')

                expect(() => modifyUser('abcd1234abcd1234abcd1234', '...', () => { })).to.throw(TypeError, 'data is not an object')

                expect(() => modifyUser('abcd1234abcd1234abcd1234', [], () => { })).to.throw(TypeError, 'data is not an object')
            })
        })

        describe('when properties in data are not valid', () => {
            describe('when name is not valid', () => {
                it('should fail when name is not a string', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { name: true }, () => { })).to.throw(TypeError, 'name is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { name: 123 }, () => { })).to.throw(TypeError, 'name is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { name: {} }, () => { })).to.throw(TypeError, 'name is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { name: () => { } }, () => { })).to.throw(TypeError, 'name is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { name: [] }, () => { })).to.throw(TypeError, 'name is not a string')
                })

                it('should fail when name is empty', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { name: '' }, () => { })).to.throw(FormatError, 'name is empty or blank')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { name: '   ' }, () => { })).to.throw(FormatError, 'name is empty or blank')
                })

                it('should fail when name has spaces around', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { name: ' Wendy Pan ' }, () => { })).to.throw(FormatError, 'name has spaces around')
                })
            })

            describe('when username is not valid', () => {
                it('should fail when username is not a string', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: true }, () => { })).to.throw(TypeError, 'username is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: 123 }, () => { })).to.throw(TypeError, 'username is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: {} }, () => { })).to.throw(TypeError, 'username is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: () => { } }, () => { })).to.throw(TypeError, 'username is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: [] }, () => { })).to.throw(TypeError, 'username is not a string')
                })

                it('should fail when username is empty', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: '' }, () => { })).to.throw(FormatError, 'username is empty or blank')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: '   ' }, () => { })).to.throw(FormatError, 'username is empty or blank')
                })

                it('should fail when username has spaces', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: ' wendypan ' }, () => { })).to.throw(FormatError, 'username has blank spaces')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: 'wendy pan' }, () => { })).to.throw(FormatError, 'username has blank spaces')
                })

                it('should fail when username length is less that 4 characters', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { username: 'wp' }, () => { })).to.throw(FormatError, 'username has less than 4 characters')
                })
            })

            describe('when password is not valid', () => {
                it('should fail when password is not a string', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: true }, () => { })).to.throw(TypeError, 'password is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: 123 }, () => { })).to.throw(TypeError, 'password is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: {} }, () => { })).to.throw(TypeError, 'password is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: () => { } }, () => { })).to.throw(TypeError, 'password is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: [] }, () => { })).to.throw(TypeError, 'password is not a string')
                })

                it('should fail when password is empty', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: '' }, () => { })).to.throw(FormatError, 'password is empty or blank')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: '   ' }, () => { })).to.throw(FormatError, 'password is empty or blank')
                })

                it('should fail when password has spaces', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: ' 123123123 ' }, () => { })).to.throw(FormatError, 'password has blank spaces')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: '123 123 123' }, () => { })).to.throw(FormatError, 'password has blank spaces')
                })

                it('should fail when password length is less that 6 characters', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: '12312' }, () => { })).to.throw(FormatError, 'password has less than 6 characters')
                })
            })

            describe('when old password is not valid', () => {
                it('should fail when oldpassword is not a string', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: true }, () => { })).to.throw(TypeError, 'password is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: 123 }, () => { })).to.throw(TypeError, 'password is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: {} }, () => { })).to.throw(TypeError, 'password is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: () => { } }, () => { })).to.throw(TypeError, 'password is not a string')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: [] }, () => { })).to.throw(TypeError, 'password is not a string')
                })

                it('should fail when oldpassword is empty', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: '' }, () => { })).to.throw(FormatError, 'password is empty or blank')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: '   ' }, () => { })).to.throw(FormatError, 'password is empty or blank')
                })

                it('should fail when oldpassword has spaces', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: ' 123123123 ' }, () => { })).to.throw(FormatError, 'password has blank spaces')

                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: '123 123 123' }, () => { })).to.throw(FormatError, 'password has blank spaces')
                })

                it('should fail when oldpassword length is less that 6 characters', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: '12312' }, () => { })).to.throw(FormatError, 'old password has less than 6 characters')
                })
            })

            describe('when password or old password is not present', () => {
                it('should fail when password is present and old password not', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { password: '123123123' }, () => { })).to.throw(ConflictError, 'old password is not defined')
                })

                it('should fail when old password is present and password not', () => {
                    expect(() => modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123' }, () => { })).to.throw(ConflictError, 'password is not defined')
                })
            })
        })
    })

    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )
});


