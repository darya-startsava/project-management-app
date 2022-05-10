import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IUserAuthorization, IUserRegistration } from '$types/common';
import { setToken } from '$store/appSlice';
import { useSignInMutation, useSignUpMutation } from '$services/api';
import Section from '$components/Section';
import { useTranslation } from 'react-i18next';
import { ROUTES_PATHS } from '$settings/routing';

const Registration: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserRegistration>();
  const [signUp, { isLoading: isLoadingSignUp }] = useSignUpMutation();
  const [signIn, { isLoading: isLoadingSignIn }] = useSignInMutation();

  const onSubmit: SubmitHandler<IUserRegistration> = async (data) => {
    await newUserRegistration(data);
    await userAuthorization({ login: data.login, password: data.password });
  };

  async function newUserRegistration(user: IUserRegistration) {
    try {
      await signUp(user).unwrap();
    } catch (error) {
      // TODO: add handling error
      throw error;
    }
  }

  async function userAuthorization(user: IUserAuthorization) {
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
      <Typography variant="h3">{t('Registration.signUpTitle')}</Typography>
      {/* TODO: add validation */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name')}
          required
          label={t('Registration.nameLabel')}
          placeholder={t('Registration.namePlaceholder')}
        />
        <TextField
          {...register('login')}
          required
          label={t('Registration.loginLabel')}
          placeholder={t('Registration.loginPlaceholder')}
        />
        <TextField
          {...register('password')}
          required
          label={t('Registration.passwordLabel')}
          type="password"
          placeholder={t('Registration.passwordPlaceholder')}
        />
        <Button type="submit">{t('Registration.signUpButton')}</Button>
      </form>
      {(isLoadingSignUp || isLoadingSignIn) && <CircularProgress />}
    </Section>
  );
};

export default Registration;
