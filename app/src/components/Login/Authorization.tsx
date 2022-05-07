import { FC, Fragment, useState } from 'react';
import { signIn } from './provider';
import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserAuthorization } from '$types/common';

const Authorization: FC = () => {
  const [token, setToken] = useState('token');
  const { register, handleSubmit } = useForm<IUserAuthorization>();

  const onSubmit: SubmitHandler<IUserAuthorization> = async (data) => {
    await userAuthorization(data);
  };

  async function userAuthorization(user: IUserAuthorization) {
    try {
      const data = await signIn(user);
      setToken(data);
      localStorage.setItem('kanban-token', data);
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
