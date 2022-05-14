import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { IUserLogIn } from '$types/common';
import { setToken } from '$store/appSlice';
import { useSignInMutation } from '$services/api';
import Section from '$components/Section';
import { ROUTES_PATHS } from '$settings/routing';
import css from './Login.module.scss';

const LogIn: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserLogIn>();
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
        <TextField
          {...register('login', { required: t('LogIn.loginFieldRequiredMessage') })}
          label={t('LogIn.loginLabel')}
          placeholder={t('LogIn.loginPlaceholder')}
        />
        <ErrorMessage
          errors={errors}
          name="login"
          render={({ message }) => <p className={css.login__error_message}>{message}</p>}
        />
        <TextField
          {...register('password', { required: t('LogIn.passwordFieldRequiredMessage') })}
          label={t('LogIn.passwordLabel')}
          type="password"
          placeholder={t('LogIn.passwordPlaceholder')}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className={css.login__error_message}>{message}</p>}
        />
        <Button type="submit">{t('LogIn.signInButton')}</Button>
      </form>
      {isLoading && <CircularProgress />}
    </Section>
  );
};

export default LogIn;
