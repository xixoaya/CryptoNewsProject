require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./register-user')
const { mongoose, models: { Bulletin } } = require('proyecto-data')
const { ConflictError, FormatError } = require('proyecto-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process