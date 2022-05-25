import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serviceURL } from '$settings/index';
import {
  IBoard,
  IBoardCreateObj,
  IColumn,
  IColumnCreateObj,
  IColumnUpdateObj,
  ITask,
  ITaskCreateObj,
  ITaskUpdateObj,
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
  tasks = 'tasks',
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
  tagTypes: ['Boards', 'Columns', 'Tasks', 'Users'],
  endpoints: (build) => ({
    // user
    signUp: build.mutation<{ id: string }, IUserRegistration>({
      query: (body: IUserRegistration) => ({ url: QueryPoints.signup, method: 'POST', body }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
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
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
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
    deleteBoard: build.mutation<null, IBoard>({
      query: (body: IBoard) => ({
        url: `${QueryPoints.boards}/${body.id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateBoard: build.mutation<IBoard, { body: IBoardCreateObj; id: string }>({
      query: ({ body, id }) => ({
        url: `${QueryPoints.boards}/${id}`,
        method: 'PUT',
        body,
      }),
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
    deleteColumn: build.mutation<null, { boardId: string; columnId: string }>({
      query: (body: { boardId: string; columnId: string }) => ({
        url: `${QueryPoints.boards}/${body.boardId}/${QueryPoints.columns}/${body.columnId}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    updateColumn: build.mutation<
      IColumn,
      { body: IColumnUpdateObj; boardId: string; columnId: string }
    >({
      query: ({ body, boardId, columnId }) => ({
        url: `${QueryPoints.boards}/${boardId}/${QueryPoints.columns}/${columnId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    updateDragAndDropColumn: build.mutation<
      IColumn,
      { body: IColumnUpdateObj; boardId: string; columnId: string }
    >({
      query: ({ body, boardId, columnId }) => ({
        url: `${QueryPoints.boards}/${boardId}/${QueryPoints.columns}/${columnId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
      async onQueryStarted({ body, boardId, columnId, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getAllColumns', boardId, (draftColumns) => {
            const dragAndDropColumnIndex = draftColumns.findIndex(
              (column) => column.id === columnId
            );
            if (dragAndDropColumnIndex > -1) {
              const oldOrder = draftColumns[dragAndDropColumnIndex].order;
              const step = oldOrder - body.order;
              const dragAndDropToStart = step > 0;

              draftColumns.map((el) => {
                if (el.id === columnId) {
                  el.order = body.order;
                  return el;
                }

                if (
                  (dragAndDropToStart && (el.order < body.order || el.order > oldOrder)) ||
                  (!dragAndDropToStart && (el.order > body.order || el.order < oldOrder))
                ) {
                  return el;
                }

                if (dragAndDropToStart) {
                  el.order = el.order + 1;
                  return el;
                } else {
                  el.order = el.order - 1;
                  return el;
                }
              });
            }

            Object.assign(draftColumns, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // tasks page
    getAllTasks: build.query<Array<ITask>, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `${QueryPoints.boards}/${boardId}/columns/${columnId}/${QueryPoints.tasks}`,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    addTask: build.mutation<ITask, { body: ITaskCreateObj; boardId: string; columnId: string }>({
      query: ({ body, boardId, columnId }) => ({
        url: `${QueryPoints.boards}/${boardId}/columns/${columnId}/${QueryPoints.tasks}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    updateTask: build.mutation<
      ITask,
      { body: ITaskUpdateObj; boardId: string; columnId: string; taskId: string }
    >({
      query: ({ body, boardId, columnId, taskId }) => ({
        url: `/${QueryPoints.boards}/${boardId}/${QueryPoints.columns}/${columnId}/${QueryPoints.tasks}/${taskId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    deleteTask: build.mutation<null, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `${QueryPoints.boards}/${boardId}/${QueryPoints.columns}/${columnId}/${QueryPoints.tasks}/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
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
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useGetAllColumnsQuery,
  useAddColumnMutation,
  useUpdateDragAndDropColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useGetAllTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = api;
