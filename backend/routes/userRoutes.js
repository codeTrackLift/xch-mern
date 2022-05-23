const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    updatePassword,
    loginUser, 
    getMe ,
    deleteUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.route('/:id').delete(protect, deleteUser).put(updatePassword)

module.exports = router