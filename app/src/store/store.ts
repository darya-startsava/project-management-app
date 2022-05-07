/*
 ** Store проекта для редакса
 */

import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

export const store = createStore(reducerObj);
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
