import { FC, Fragment, useState } from 'react';
import { signIn, signUp } from './provider';
import { Button } from '@mui/material';

const Login: FC = () => {
  const [id, setId] = useState('id');
  const [token, setToken] = useState('token');
  async function newUserRegistration() {
    try {
      const data = await signUp({ name: 'u2', login: 'u2', password: '123456789' });
      setId(data);
      localStorage.setItem('kanban-id', data);
    } catch (error) {
      throw error;
    }
  }

  async function userAuthorization() {
    try {
      const data = await signIn({ login: 'u2', password: '123456789' });
      setToken(data);
      localStorage.setItem('kanban-token', data);
    } catch (error) {
      throw error;
    }
  }

  return (
    <Fragment>
      <div>{id}</div>
      <div>{token}</div>
      <Button onClick={() => userAuthorization()}>Authorization</Button>
      <Button onClick={() => newUserRegistration()}>Registration</Button>
    </Fragment>
  );
};

export default Login;
