/*
 ** Slice для редакса, reducer скорее всего будет несколько таких редюсеров,
 ** один для usera, а второй для бордеров
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IStateApp = {
  token: string | null;
  login: string | null;
};

export const initialState: IStateApp = {
  token: null,
  login: null,
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
  },
});

export const { setToken, setLogin } = app.actions;

export default app.reducer;
