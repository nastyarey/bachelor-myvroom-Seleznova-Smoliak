import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios.ts";
import {RootState} from "../../app/store.ts";

export interface Notification {
    _id: string
    title: string
    message: string
    read: boolean
    createdAt: string
}

interface NotificationState {
    items: Notification[],
    firstFethced: boolean
}

const initialState: NotificationState = {
    items: [],
    firstFethced: false
}

export const getNotification = createAsyncThunk(
    'notification/getNotification',
    async (_, thunkApi) => {
        try {
            const res = await axiosInstance.get('/notification')
            return res.data
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Notification error')
        }
    }
)
const notificationSlice = createSlice({
    name: 'notification', initialState,
    reducers: {
        markAllAsRead: (state) => {
            state.items = state.items.map(e => ({...e, read: true}))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotification.fulfilled, (state, action) => {
                state.items = action.payload
                state.firstFethced = true
            })
            .addCase(getNotification.rejected, (state) => {
                state.items = [];
                state.firstFethced = false
            })
    }
})

export const {markAllAsRead} = notificationSlice.actions

export const selectNotifications = (state: RootState) => state.notification

export default notificationSlice.reducer