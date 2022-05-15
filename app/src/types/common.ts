/*
 ** файл для общих типов и интерфейсов, используемых в других компонентах
 */

export type TSimpleFunction = () => void;
export type TChangeElHandler<T> = (event: React.ChangeEvent<T>) => void;

export interface IWrapEl {
  className?: string;
  children?: string | JSX.Element | Array<JSX.Element>;
}

export interface IUserLogIn {
  login: string;
  password: string;
}

export interface IUserRegistration extends IUserLogIn {
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}

/* boards start */
export interface IBoardCreateObj {
  title: string;
}

export interface IBoard extends IBoardCreateObj {
  id: string;
  title: string;
}
/* boards end */

/* routing start */
export interface IWord {
  en: string;
  ru: string;
}

export interface IWordsObj {
  [key: string]: IWord;
}
/* routing end */
