/*
 ** Основные константы роутинга
 */

import { INavigationLink } from '$components/Navigation/Navigation';
import { IWordsObj } from '$types/common';

export enum ROUTES_PATHS {
  welcome = '/',
  login = '/login',
  logout = '/',
  registration = '/registration',
  boards = '/boards',
  error_page = '/error',
  not_found_page = '*',
}

// TODO: REMOVE THIS WHEN APP BE INCLUDE LOCALIZATION
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

export const ROUTERS_APP_ANONYM: Array<INavigationLink> = [
  {
    path: ROUTES_PATHS.welcome,
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

export const ROUTERS_APP_AUTH: Array<INavigationLink> = [
  {
    path: ROUTES_PATHS.welcome,
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
