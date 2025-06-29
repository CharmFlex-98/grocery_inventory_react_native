import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    email: string | null;
}

const initialState: AuthState = {
    token: null,
    email: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; email: string }>) {
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        logout(state) {
            state.token = null;
            state.email = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: any) => !!state.auth.token;
export default authSlice.reducer;