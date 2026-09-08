const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../utils/asyncHandler')
const secretKey = process.env.JWT_SECRET
const { AppError } = require('../utils/AppError')

const saltRounds = 10

const createHash = async (password, saltCount) => {
    return await bcrypt.hash(password, saltCount)

}

const compareHash = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

const findUserByEmail = async (newEmail) => {
    return await prisma.user.findUnique({
        where: { email: newEmail }
    })
}

const createPayload = (id, email, role) => {
    return {
        id,
        email,
        role
    }
}

const register = asyncHandler(async (req, res) => {
    const { email, password, name, last_name, location } = req.body
    if (await findUserByEmail(email)) {
        throw new AppError('This email already used for register', 400)
    }
    const hashedPassword = await createHash(password, saltRounds)

    await prisma.user.create({
        data: {
            'name': name,
            'last_name': last_name,
            'password': hashedPassword,
            'email': email,
            'location': location,
            'role': 'USER'
        }
    })
    return res.status(201).json({
        message: 'User created with successfully'
    })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    if (!user) {
        throw new AppError('Invalid email or password', 400)
    }

    const hash = user.password
    if (!await compareHash(password, hash)) {
        throw new AppError('Invalid email or password', 400)

    }
    const payload = createPayload(user.id, user.email, user.role)
    const options = {
        expiresIn: '1d',
    }
    const token = jwt.sign(payload, secretKey, options)

    return res.status(200).json({
        "message": "Login succesfull",
        "token": token,
        "data": {
            id: user.id,
            email: user.email,
            name: user.name,
            last_name: user.last_name,
            role: user.role,
            location: user.location
        }
    })
})


module.exports = { register, login }