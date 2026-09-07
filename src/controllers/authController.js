const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

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

const register = async (req, res) => {
    try {
        const { email, password, name, last_name, location } = req.body
        if (!email || !password || !name || !last_name) {
            return res.status(400).json({ message: 'Email, password, name and last name are required' })
        }
        if (await findUserByEmail(email)) {
            return res.status(400).json({
                message: 'This email already used for register'
            })
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


    } catch (error) {
        console.log('An error occuried while creating a new user in database')
        return res.status(500).json({
            message: 'A server error occuried while creating a new user'
        })
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                "message": "Email and password must'nt be empty"
            })
        }
        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(400).json({
                "message": "Invalid email or password"
            })
        }

        const hash = user.password
        if (!await compareHash(password, hash)) {
            return res.status(400).json({
                "message": "Invalid email or password"
            })
        }
        const payload = createPayload(user.id, user.email, user.role)
        const options = {
            expiresIn: '1d',
        }
        if (!secretKey) {
            return res.status(500).json({
                "message": "An error occuried while creating token"
            })
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
    } catch (error) {
        console.log("An error occuried in the server")
        return res.status(500).json({
            "message": `Server error: ${error}`
        })
    }

}


module.exports = { register, login }