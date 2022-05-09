/*
 ** Slice для редакса, reducer скорее всего будет несколько таких редюсеров,
 ** один для usera, а второй для бордеров
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IStateApp = {
  isLoading: boolean;
  isAuthorizationUser: boolean;
  isEnglishLang: boolean;
};

export const initialState: IStateApp = {
  isLoading: false,
  isAuthorizationUser: false,
  isEnglishLang: true,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeAuthorizationAction(state: IStateApp, action: PayloadAction<boolean>) {
      state.isAuthorizationUser = action.payload;
    },

    changeLanguageAction(state: IStateApp, action: PayloadAction<boolean>) {
      state.isEnglishLang = action.payload;
    },
  },
});

export const { changeAuthorizationAction, changeLanguageAction } = app.actions;

export default app.reducer;
