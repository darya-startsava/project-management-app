import { FC, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserAuthorization, IUserRegistration } from '$types/common';
import { setToken } from '$store/appSlice';
import { useSignInMutation, useSignUpMutation } from '$services/api';
import Users from './Users';

const Registration: FC = () => {
  const [token, setStateToken] = useState('token');
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserRegistration>();

  const [signUp] = useSignUpMutation();
  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit: SubmitHandler<IUserRegistration> = async (data) => {
    await newUserRegistration(data);
    await userAuthorization({ login: data.login, password: data.password });
  };

  async function newUserRegistration(user: IUserRegistration) {
    try {
      await signUp(user).unwrap();
    } catch (error) {
      throw error;
    }
  }

  async function userAuthorization(user: IUserAuthorization) {
    try {
      const result = await signIn(user).unwrap();
      setStateToken(result.token);
      dispatch(setToken(result.token));
      setIsTokenLoaded(true);
    } catch (error) {
      throw error;
    }
  }

  return (
    <Fragment>
      <Typography variant="h3">Sign Up</Typography>
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
        <Button type="submit">Sign Up</Button>
      </form>
      {isLoading && <div>Loading...</div>}
      {isTokenLoaded && <Users />}
    </Fragment>
  );
};

export default Registration;
