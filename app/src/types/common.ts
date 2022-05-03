export type TSimpleFuncion = () => void;
export type TChangeElHandler<T> = (event: React.ChangeEvent<T>) => void;

export interface IWrapEl {
  className?: string;
  children?: string | JSX.Element | Array<JSX.Element>;
}
