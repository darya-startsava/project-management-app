import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serviceURL } from '$settings/index';
import {
  IBoard,
  IBoardCreateObj,
  IColumn,
  IColumnCreateObj,
  IUser,
  IUserLogIn,
  IUserRegistration,
} from '$types/common';
import { RootState } from '$store/store';

enum QueryPoints {
  signup = 'signup',
  signin = 'signin',
  users = 'users',
  boards = 'boards',
  columns = 'columns',
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serviceURL}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Boards', 'Columns', 'Users'],
  endpoints: (build) => ({
    // user
    signUp: build.mutation<{ id: string }, IUserRegistration>({
      query: (body: IUserRegistration) => ({ url: QueryPoints.signup, method: 'POST', body }),
    }),
    signIn: build.mutation<{ token: string }, IUserLogIn>({
      query: (body: IUserLogIn) => ({ url: QueryPoints.signin, method: 'POST', body }),
    }),
    getAllUsers: build.query<Array<IUser>, void>({
      query: () => ({
        url: QueryPoints.users,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({ url: `${QueryPoints.users}/${id}`, method: 'DELETE' }),
    }),
    updateUser: build.mutation<IUser, { body: IUserRegistration; id: string }>({
      query: ({ body, id }) => ({ url: `${QueryPoints.users}/${id}`, method: 'PUT', body }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    // boards page
    getAllBoards: build.query<Array<IBoard>, void>({
      query: () => ({
        url: QueryPoints.boards,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Boards' as const, id })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),
    addBoard: build.mutation<IBoard, IBoardCreateObj>({
      query: (body: IBoardCreateObj) => ({ url: QueryPoints.boards, method: 'POST', body }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    // columns page
    getAllColumns: build.query<Array<IColumn>, string>({
      query: (id: string) => ({
        url: `${QueryPoints.boards}/${id}/${QueryPoints.columns}`,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Columns' as const, id })),
              { type: 'Columns', id: 'LIST' },
            ]
          : [{ type: 'Columns', id: 'LIST' }],
    }),
    addColumn: build.mutation<IColumn, { body: IColumnCreateObj; id: string }>({
      query: ({ body, id }) => ({
        url: `${QueryPoints.boards}/${id}/${QueryPoints.columns}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllBoardsQuery,
  useAddBoardMutation,
  useGetAllColumnsQuery,
  useAddColumnMutation,
} = api;
