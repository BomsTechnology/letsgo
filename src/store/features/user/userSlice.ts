import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserProps from '../../../types/User';

export interface userState {
    user: UserProps;
    loading: boolean;
}

const initialState: userState = {
    loading: false,
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadingStart: (state) => {
            state.loading = true;
        },
        infoUpdateSuccess: (state, action: PayloadAction<UserProps>) => {
            state.user = action.payload;
            state.loading = false;
        },
        infoUpdateFailure: (state) => {
            state.user = {};
            state.loading = false;
        },
    },
});


export const { loadingStart, infoUpdateSuccess, infoUpdateFailure } = userSlice.actions;

export default userSlice.reducer;