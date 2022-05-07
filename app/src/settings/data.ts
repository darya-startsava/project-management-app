/*
 ** Основные константы проекта
 */

import { IWordsObj } from '$types/common';

/* routing start */
export enum ROUTES_PATHS {
  home = '/',
  welcome = '/welcome',
  login = '/login',
  logout = '/logout',
  registration = '/registration',
  boards = '/boards',
  error_page = '*',
}

export const LOCALIZES_TEXT: IWordsObj = {
  login: {
    en: 'Log in',
    ru: 'Войти',
  },
  logout: {
    en: 'Log out',
    ru: 'Выйти',
  },
  home: {
    en: 'Home',
    ru: 'Главная',
  },
  boards: {
    en: 'Boards',
    ru: 'Задачи',
  },
  registration: {
    en: 'Registration',
    ru: 'Регистрация',
  },
  language: {
    en: 'English',
    ru: 'Русский',
  },
};

export const ROUTERS_APP_ANONIM = [
  {
    path: ROUTES_PATHS.home,
    ...LOCALIZES_TEXT.home,
  },
  {
    path: ROUTES_PATHS.login,
    ...LOCALIZES_TEXT.login,
  },
  {
    path: ROUTES_PATHS.registration,
    ...LOCALIZES_TEXT.registration,
  },
];

export const ROUTERS_APP_AUTH = [
  {
    path: ROUTES_PATHS.home,
    ...LOCALIZES_TEXT.home,
  },
  {
    path: ROUTES_PATHS.boards,
    ...LOCALIZES_TEXT.boards,
  },
  {
    path: ROUTES_PATHS.logout,
    ...LOCALIZES_TEXT.logout,
  },
];
/* routing end */