import { FC, Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { signIn } from '../../services/api';
import { IUserAuthorization } from '$types/common';
import { setToken } from '$store/appSlice';
import { useSignInMutation, useGetAllUsersQuery } from '$services/api';
import Users from './Users';

const Authorization: FC = () => {
  const [token, setStateToken] = useState('token');
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserAuthorization>();

  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit: SubmitHandler<IUserAuthorization> = async (data) => {
    await userAuthorization(data);
  };

  async function userAuthorization(user: IUserAuthorization) {
    try {
      const result = await signIn(user).unwrap();
      console.log(result);
      setStateToken(result.token);
      dispatch(setToken(result.token));
      localStorage.setItem('kanban-token', result.token);
      setIsTokenLoaded(true);
    } catch (error) {
      throw error;
    }
  }

  return (
    <Fragment>
      <Typography variant="h3">Log In</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('login')} required label="Login" placeholder="Login" />
        <TextField
          {...register('password')}
          required
          label="Password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit">Log In</Button>
      </form>
      {isLoading && <div>Loading...</div>}
      <div>{token}</div>
      {isTokenLoaded && <Users />}
    </Fragment>
  );
};

export default Authorization;
