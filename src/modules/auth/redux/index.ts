import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import authServices from '../services';
import { IAuthRequest, IAuthResponse } from '../types';
import i18next from 'i18next';
import { locale } from 'primereact/api';

interface IAuthState {
  logged: boolean;
  error: any;
  loading: boolean;
  lang: string;
  user: IAuthResponse | null;
}

const initialState: IAuthState = {
  logged: localStorage.getItem('logged') === 'true',
  error: null,
  loading: false,
  lang: i18next.language || 'es_ES',
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, payload: PayloadAction<IAuthResponse | null>) => {
      state.user = payload.payload;
    },
    clearData: (state) => {
      state.logged = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('logged');
    },
    changeLang: (state, action: PayloadAction<'es_ES' | 'en_EN'>) => {
      state.lang = action.payload;
      locale(action.payload === 'es_ES' ? 'es' : 'en');
    },
    logout: (state) => {
      localStorage.clear();
      state.logged = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.logged = true;
      }
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = null;
      state.logged = false;
      state.error = action?.payload?.message;
    });
  },
});

export const { changeLang, logout, clearData, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState): IAuthState => state.auth;
export default authReducer;

export const loginUser = createAsyncThunk(
  'users/login',
  async (input: IAuthRequest, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await authServices.login(input);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('logged', 'true');
      } else {
        return rejectWithValue({ message: 'Credenciales Invalidas' });
      }
      return fulfillWithValue(response.data);
    } catch (err: any) {
      return rejectWithValue({ message: 'Credenciales Invalidas' });
    }
  }
);
