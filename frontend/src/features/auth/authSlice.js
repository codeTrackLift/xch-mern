import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from sessionStorage
const user = JSON.parse(sessionStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update password
export const updatePassword = createAsyncThunk('auth/updatePassword', async (user, thunkAPI) => {
    try {
        return await authService.updatePassword(user)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// Delete user 
export const deleteUser = createAsyncThunk(
    'user/delete',
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.deleteUser(id, token)
        } catch(error) {
            const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update balance
export const updateBalance = createAsyncThunk('user/balance', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateBalance(
            userData, token
        )
    } catch(error) {
        const message = 
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
        thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(updatePassword.pending, state => {
                state.isLoading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = null
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateBalance.pending, state => {
                state.isLoading = true
            })
            .addCase(updateBalance.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateBalance.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        },
    }
)

export const { reset } = authSlice.actions
export default authSlice.reducer