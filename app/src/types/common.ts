/*
 ** файл для общих типов и интерфейсов, используемых в других компонентах
 */

export type TSimpleFunction = () => void;
export type TChangeElHandler<T> = (event: React.ChangeEvent<T>) => void;
export type TClickHandler = (event: React.MouseEvent) => void;
export type TCreateElement<T> = (data: T) => void;
export type TUpdateElement<T> = (data: T) => void;

export interface IWrapEl {
  className?: string;
  children?: string | JSX.Element | Array<JSX.Element>;
}

export interface IUserLogIn {
  login: string;
  password: string;
}

export interface IUserRegistration extends IUserLogIn {
  name?: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IError {
  status: number;
  data: {
    statusCode: number;
    message: string;
    error: string;
  };
}
/* boards start */
export interface IBoardCreateObj {
  title: string;
  description: string;
}

export interface IBoard extends IBoardCreateObj {
  id: string;
}
/* boards end */

/* columns start */
export interface IColumnCreateObj {
  title: string;
}

export interface IColumnUpdateTitle {
  title: string;
  id: string;
}

export interface IColumn extends IColumnCreateObj {
  id: string;
  order: number;
}
/* columns end */

/* tasks start */
export interface ITaskCreateObj {
  title: string;
  description: string;
  userId: string;
}

export interface ITask extends ITaskCreateObj {
  id: string;
  boardId: string;
  columnId: string;
}

export interface INewNTaskFormState {
  title: string;
  description: string;
  userId: string;
}
/* tasks end */

/* routing start */
export interface IWord {
  en: string;
  ru: string;
}

export interface IWordsObj {
  [key: string]: IWord;
}
/* routing end */
