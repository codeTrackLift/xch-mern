import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        sessionStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Update password
const updatePassword = async (userData) => {
    const response = await axios.put(API_URL, userData)

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        sessionStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    sessionStorage.removeItem('user')
}

// Delete user
const deleteUser = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + userId, config)

    return response.data
}

const authService = {
    register,
    updatePassword,
    login,
    logout,
    deleteUser,
}

export default authService