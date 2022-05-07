/*
 ** Slice для редакса, reducer скорее всего будет несколько таких редюсеров,
 ** один для usera, а второй для бордеров
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IStateApp = {
  isLoading: boolean;
  token: string | null;
};

export const initialState: IStateApp = {
  isLoading: false,
  token: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = appSlice.actions;

export default appSlice.reducer;
