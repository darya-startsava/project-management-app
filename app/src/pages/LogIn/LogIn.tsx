import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { IUserLogIn } from '$types/common';
import { setToken } from '$store/appSlice';
import { useSignInMutation } from '$services/api';
import Section from '$components/Section';
import { useTranslation } from 'react-i18next';
import { ROUTES_PATHS } from '$settings/routing';

const LogIn: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserLogIn>();
  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit: SubmitHandler<IUserLogIn> = async (data) => {
    await userLogIn(data);
  };

  async function userLogIn(user: IUserLogIn) {
    try {
      const result = await signIn(user).unwrap();
      dispatch(setToken(result.token));
      navigate(ROUTES_PATHS.boards);
    } catch (error) {
      // TODO: add handling error
      throw error;
    }
  }

  return (
    <Section pageAllSpace={true}>
      <Typography variant="h3">{t('LogIn.signInTitle')}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: add validation */}
        <TextField
          {...register('login')}
          required
          label={t('LogIn.loginLabel')}
          placeholder={t('LogIn.loginPlaceholder')}
        />
        <TextField
          {...register('password')}
          required
          label={t('LogIn.passwordLabel')}
          type="password"
          placeholder={t('LogIn.passwordPlaceholder')}
        />
        <Button type="submit">{t('LogIn.signInButton')}</Button>
      </form>
      {isLoading && <CircularProgress />}
    </Section>
  );
};

export default LogIn;
