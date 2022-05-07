import { FC, Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { signIn } from './provider';
import { IUserAuthorization } from '$types/common';
import { setToken } from '$store/appSlice';

const Authorization: FC = () => {
  const [token, setStateToken] = useState('token');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserAuthorization>();

  const onSubmit: SubmitHandler<IUserAuthorization> = async (data) => {
    await userAuthorization(data);
  };

  async function userAuthorization(user: IUserAuthorization) {
    try {
      const data = await signIn(user);
      setStateToken(data);
      localStorage.setItem('kanban-token', data);
      dispatch(setToken(data));
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
      <div>{token}</div>
    </Fragment>
  );
};

export default Authorization;
