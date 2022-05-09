/*
 ** файл для общих типов и интерфейсов, используемых в других компонентах
 */

export type TSimpleFuncion = () => void;
export type TChangeElHandler<T> = (event: React.ChangeEvent<T>) => void;

export interface IWrapEl {
  className?: string;
  children?: string | JSX.Element | Array<JSX.Element>;
}

export interface IUserAuthorization {
  login: string;
  password: string;
}

export interface IUserRegistration extends IUserAuthorization {
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}
/* routing start */
export interface IWord {
  en: string;
  ru: string;
}

export interface IWordsObj {
  [key: string]: IWord;
}
/* routing end */
