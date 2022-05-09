import { FC, Fragment, useState } from 'react';
import { signIn, signUp } from '$services/api';
import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserAuthorization, IUserRegistration } from '$types/common';

const Registration: FC = () => {
  const [id, setId] = useState('id');
  const [token, setToken] = useState('token');
  const { register, handleSubmit } = useForm<IUserRegistration>();

  const onSubmit: SubmitHandler<IUserRegistration> = async (data) => {
    await newUserRegistration(data);
    await userAuthorization({ login: data.login, password: data.password });
  };

  async function newUserRegistration(user: IUserRegistration) {
    try {
      const data = await signUp(user);
      setId(data);
      localStorage.setItem('kanban-id', data);
    } catch (error) {
      throw error;
    }
  }

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
      <Typography variant="h3">Log in</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('name')} required label="Name" placeholder="Name" />
        <TextField {...register('login')} required label="Login" placeholder="Login" />
        <TextField
          {...register('password')}
          required
          label="Password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit">Registration</Button>
      </form>
      <div>{id}</div>
      <div>{token}</div>
    </Fragment>
  );
};

export default Registration;
