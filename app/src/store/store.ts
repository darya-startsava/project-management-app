/*
 ** Store проекта для редакса
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import appReducer from './appSlice';
import { api } from '$services/api';

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

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
