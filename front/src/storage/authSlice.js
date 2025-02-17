import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const register = createAsyncThunk(
  'register',
  async (userData, thunkAPI) => {
    console.log('Register action dispatched');
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  'login',
  async (userData, thunkAPI) => {
    console.log('Signin action dispatched');
    try {
      return await authService.signin(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
