/*
 ** Store проекта для редакса
 */

import { configureStore } from '@reduxjs/toolkit';
import appReducer, { IStateApp } from './appSlice';
import { api } from '$services/api';

export type IState = {
  app: IStateApp;
};

const reducerObj = {
  app: appReducer,
  [api.reducerPath]: api.reducer,
};

export const createStore = () =>
  configureStore({
    reducer: reducerObj,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
      }).concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
