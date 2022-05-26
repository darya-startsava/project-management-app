import { IColumn, ITask } from '$types/common';

type TRandNumber = (max: number, min?: number) => number;
type TSortArray<T> = (array: T) => T;

export const randNumber: TRandNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getSortColumns: TSortArray<Array<IColumn>> = (columns: Array<IColumn>) => {
  const sortingColumns = [...columns].sort((el1: IColumn, el2: IColumn) => el1.order - el2.order);
  return sortingColumns;
};

export const getSortTasks: TSortArray<Array<ITask>> = (tasks: Array<ITask>) => {
  const sortingTasks = [...tasks].sort((el1: ITask, el2: ITask) => el1.order - el2.order);
  return sortingTasks;
};
