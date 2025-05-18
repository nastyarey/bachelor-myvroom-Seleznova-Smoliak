import {userData} from "../../types/user/userdata.ts";
import {ActionReducerMapBuilder, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from "../../api/axios.ts";
import axios from "axios";
import {Notyf} from "notyf";

interface UserState {
    userData: userData | null
    isLogged: boolean
    token: string | null
}

const initState: UserState = {
    userData: null,
    isLogged: false,
    token: null
}
const notyf = new Notyf()
export const updateUser = createAsyncThunk(
    'user/update',
    async (dataUser: userData, thunkAPI) => {
        try {
            const {data} = await axiosInstance.patch('/user/update', dataUser)
            return data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
)
export const uploadPhotoProfile = createAsyncThunk(
    'user/uploadPhotoProfile',
    async (file: File, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await axios.post('https://myvroom.space/api' + '/user/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            return res.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
)
export const getMe = createAsyncThunk(
    'user/me',
    async (_, thunkAPI) => {
        try {
            const {data} = await axiosInstance.get('/auth/me')
            return data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch user error')
        }

    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({email, password}: { email: string, password: string }, thunkAPI) => {
        try {
            const {data} = await axiosInstance.post('/auth/login', {email, password})
            return {email, token: data.access_token}
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login error')
        }
    }
)
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (dataUser: userData, thunkAPI) => {
        try {
            const {data} = await axiosInstance.post('/auth/register', dataUser)
            return data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Register error')
        }
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        logout: (state) => {
            state.userData = null
            state.isLogged = false
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
                state.isLogged = true
            })
            .addCase(loginUser.rejected, (state) => {
                state.userData = null
                state.isLogged = false
                state.token = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLogged = true
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
                state.isLogged = true
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.userData = action.payload
            })
            .addCase(uploadPhotoProfile.fulfilled, (state, action) => {
                if (state.userData) {
                    state.userData.photo = action.payload.avatarUrl
                }
            })
            .addCase(uploadPhotoProfile.rejected, () => {
                notyf.error({
                    message: "Error load photo"
                })
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.userData = action.payload
            })

    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer
