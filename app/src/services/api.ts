import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serviceURL } from '$settings/index';
import { IBoard, IBoardCreateObj, IUserLogIn, IUserRegistration } from '$types/common';
import { RootState } from '$store/store';

enum QueryPoints {
  signup = 'signup',
  signin = 'signin',
  users = 'users',
  boards = 'boards',
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
  tagTypes: ['Boards'],
  endpoints: (build) => ({
    signUp: build.mutation<{ id: string }, IUserRegistration>({
      query: (body: IUserRegistration) => ({ url: QueryPoints.signup, method: 'POST', body }),
    }),
    signIn: build.mutation<{ token: string }, IUserLogIn>({
      query: (body: IUserLogIn) => ({ url: QueryPoints.signin, method: 'POST', body }),
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
    deleteBoard: build.mutation<null, IBoard>({
      query: (body: IBoard) => ({
        url: `${QueryPoints.boards}/${body.id}`,
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetAllBoardsQuery,
  useAddBoardMutation,
  useDeleteBoardMutation,
} = api;
