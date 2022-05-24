const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Transaction = require('../models/transactionModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Please enter all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error ('Email already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    
    if(user) {
        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({message: 'Register User'})
})

// @desc    Update user password
// @route   PUT /api/users/:id
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error ('Please enter all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if(!userExists) {
        res.status(400)
        throw new Error ('Email does not exist')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const updatedUser = await User.findOneAndUpdate(email, {password: hashedPassword}, {
        new: true,
    });

    res.status(200).json(updatedUser)
})

// @desc    Authenticate a user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {    
        res.status(200).json(req.user)
})


// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { 
        expiresIn: '30d',
    })
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the user being deleted
    if(req.user.id !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Transaction.deleteMany({user: user.id})
    await user.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    registerUser,
    updatePassword,
    loginUser,
    getMe,
    deleteUser,
}