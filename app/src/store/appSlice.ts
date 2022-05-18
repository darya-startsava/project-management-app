/*
 ** Slice для редакса, reducer скорее всего будет несколько таких редюсеров,
 ** один для usera, а второй для бордеров
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGIN_NAME_LOCALSTORAGE, tokenAuth } from '$settings/index';

export type IStateApp = {
  token: string | null;
  login: string | null;
};

export const initialState: IStateApp = {
  token: localStorage.getItem(tokenAuth) || null,
  login: localStorage.getItem(LOGIN_NAME_LOCALSTORAGE) || null,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLogin: (state, action: PayloadAction<string | null>) => {
      state.login = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, setLogin, logout } = app.actions;

export default app.reducer;
