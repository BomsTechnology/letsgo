import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserProps from '../../../types/UserProps';
import { createPoolerAccount, getUserInfo  } from '@services/useUser';

export interface userState {
    user: UserProps | null;
    loading: boolean;
    error: string | null;
}

const initialState: userState = {
    loading: false,
    user: null,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        infoClear: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(createPoolerAccount.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createPoolerAccount.fulfilled, (state, action: PayloadAction<UserProps>) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(createPoolerAccount.rejected, (state, action) => {
            state.loading = false;

            state.error = action.error.message as string;
          })
          .addCase(getUserInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<UserProps>) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(getUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message as string;
          });
      },
});


export const {  infoClear } = userSlice.actions;

export default userSlice.reducer;