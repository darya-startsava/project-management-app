import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '$settings/index';
import { IUser, IUserAuthorization, IUserRegistration } from '$types/common';
import { RootState } from '$store/store';

enum Endpoints {
  signUp = 'signup',
  signIn = 'signin',
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    signIn: build.mutation<{ token: string }, IUserAuthorization>({
      query: (body: IUserAuthorization) => ({ url: 'signin', method: 'POST', body }),
    }),
    getAllUsers: build.query<IUser, void>({
      query: () => ({
        url: 'users',
      }),
    }),
  }),
});

export const { useSignInMutation, useGetAllUsersQuery } = api;

export async function signUp(user: IUserRegistration): Promise<string> {
  const response = await fetch(`${URL}/${Endpoints.signUp}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data.id;
}

export async function signIn(user: IUserAuthorization): Promise<string> {
  const response = await fetch(`${URL}/${Endpoints.signIn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data.token;
}
