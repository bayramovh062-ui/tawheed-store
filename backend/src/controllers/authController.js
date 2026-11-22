const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../utils/asyncHandler')
const secretKey = process.env.JWT_SECRET
const { AppError } = require('../utils/AppError')
const { sendOtpEmail } = require('../utils/sendEmail');

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
    const haveUser = await findUserByEmail(email)
    if (haveUser) {
        if (haveUser.isVerified) {
            throw new AppError('This email already used for register', 400)
        }
    }
    const hashedPassword = await createHash(password, saltRounds)

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    if (haveUser) {
        await prisma.user.update({
            where: { email },
            data: {
                'name': name,
                'last_name': last_name,
                'password': hashedPassword,
                'email': email,
                'location': location,
                'role': 'USER',
                otpCode,
                otpExpiresAt
            }
        })
    } else {
        await prisma.user.create({
            data: {
                'name': name,
                'last_name': last_name,
                'password': hashedPassword,
                'email': email,
                'location': location,
                'role': 'USER',
                otpCode,
                otpExpiresAt
            }
        })
    }


    await sendOtpEmail(email, otpCode)
    return res.status(201).json({
        message: 'Registration successful. Please verify the OTP code sent to your email.',
        email: email
    })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    if (!user) {
        throw new AppError('Invalid email or password', 400)
    }

    if (!user.isVerified) {
        throw new AppError('Please verify your email address before logging in', 403);
    }

    const hash = user.password
    if (!await compareHash(password, hash)) {
        throw new AppError('Invalid email or password', 400)

    }
    const payload = createPayload(user.id, user.email, user.role)
    const options = {
        expiresIn: '10d',
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

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otpCode } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    if (user.isVerified) {
        throw new AppError('User is already verified', 400);
    }

    if (new Date() > user.otpExpiresAt) {
        throw new AppError('OTP code has expired', 400);
    }

    if (user.otpCode !== otpCode) {
        throw new AppError('Invalid OTP code', 400);
    }



    const updatedUser = await prisma.user.update({
        where: { email },
        data: { isVerified: true, otpCode: null, otpExpiresAt: null }
    });

    const payload = createPayload(updatedUser.id, updatedUser.email, updatedUser.role);
    const options = {
        expiresIn: '10d',
    };
    const token = jwt.sign(payload, secretKey, options);

    return res.status(200).json({
        message: 'Email verified successfully',
        token: token,
        user: {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            last_name: updatedUser.last_name,
            role: updatedUser.role,
            location: updatedUser.location
        }
    });
})

const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    if (user.isVerified) {
        throw new AppError('User is already verified', 400);
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.user.update({
        where: { email },
        data: { otpCode, otpExpiresAt }
    });

    await sendOtpEmail(email, otpCode);

    return res.status(200).json({
        message: 'OTP code resent successfully. Please check your email.'
    });
})


module.exports = { register, login, verifyOtp, resendOtp }