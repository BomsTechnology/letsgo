import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthStateTokenProps {
  "access_token": string | null;
  "expires_in": string | null;
  "refresh_token": string | null;
  "refresh_token_expires_in": string | null;
  "token_type": string | null;
}

export interface AuthState {
  "loading": boolean;
  "token": AuthStateTokenProps | null;
  "error"?: string | null;
  "isFirstLogin": boolean;
  "verificationId"?: string | null;
}
// Define the initial state using that type
const initialState: AuthState = {
  "token": null,
  "loading": false,
  "isFirstLogin": true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpSendSuccess: (state, action: PayloadAction<{verificationId: string}>) => {
      state.verificationId = action.payload.verificationId;
      state.error = null;
      state.loading = false;
    },
    loginSuccess: (state, action: PayloadAction<AuthStateTokenProps>) => {
      state.token = action.payload;
      state.error = null;
      state.loading = false;
    },
    loginFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.token = null;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.loading = false;
    },
    toogleIsFirstLogin: (state) => {
      state.isFirstLogin = !state.isFirstLogin
    }
  },
});

export const { loginSuccess, loginFailure, logout, loadingStart, otpSendSuccess, toogleIsFirstLogin } = authSlice.actions;

export default authSlice.reducer;