/*
 ** Store проекта для редакса
 */

import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import appReducer, { IStateApp } from './appSlice';

export type IState = {
  app: IStateApp;
};

interface IReducerObj {
  app: Reducer<IStateApp, AnyAction>;
}

const reducerObj: IReducerObj = {
  app: appReducer,
};

export const createStore = (reducerObj: IReducerObj) =>
  configureStore({
    reducer: reducerObj,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

export const store = createStore(reducerObj);

export type AppDispatch = typeof store.dispatch;
