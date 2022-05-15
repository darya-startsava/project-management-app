import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { IUserLogIn, IUserRegistration } from '$types/common';
import { setToken } from '$store/appSlice';
import { useSignInMutation, useSignUpMutation } from '$services/api';
import Section from '$components/Section';
import { ROUTES_PATHS } from '$settings/routing';
import css from './Authorization.module.scss';

interface IAuthorization {
  sortOfAuth: string;
}

const Authorization: FC<IAuthorization> = ({ sortOfAuth }) => {
  let passwordValue = 0;
  if (sortOfAuth === 'Registration') passwordValue = 5;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserRegistration>();
  const [signUp, { isLoading: isLoadingSignUp }] = useSignUpMutation();
  const [signIn, { isLoading: isLoadingSignIn }] = useSignInMutation();

  const onSubmit: SubmitHandler<IUserRegistration> = async (data) => {
    if (sortOfAuth === 'Registration') {
      await newUserRegistration(data);
      await userLogIn({ login: data.login, password: data.password });
    } else await userLogIn(data);
  };

  async function newUserRegistration(user: IUserRegistration) {
    try {
      await signUp(user).unwrap();
    } catch (error) {
      // TODO: add handling error
      throw error;
    }
  }

  async function userLogIn(user: IUserLogIn) {
    try {
      const result = await signIn(user).unwrap();
      dispatch(setToken(result.token));
      localStorage.setItem('kanban-token', result.token);
      navigate(ROUTES_PATHS.boards);
    } catch (error) {
      // TODO: add handling error
      throw error;
    }
  }

  return (
    <Section pageAllSpace={true}>
      <Typography variant="h3">{t(`${sortOfAuth}.signTitle`)} </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {sortOfAuth === 'Registration' && (
          <>
            <TextField
              {...register('name', { required: t('Registration.nameFieldRequiredMessage') })}
              label={t('Registration.nameLabel')}
              placeholder={t('Registration.namePlaceholder')}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className={css.authorization__error_message}>{message}</p>
              )}
            />
          </>
        )}
        <TextField
          {...register('login', { required: t(`${sortOfAuth}.loginFieldRequiredMessage`) })}
          label={t(`${sortOfAuth}.loginLabel`)}
          placeholder={t(`${sortOfAuth}.loginPlaceholder`)}
        />
        <ErrorMessage
          errors={errors}
          name="login"
          render={({ message }) => <p className={css.authorization__error_message}>{message}</p>}
        />
        <TextField
          {...register('password', {
            required: t(`${sortOfAuth}.passwordFieldRequiredMessage`),
            minLength: {
              value: passwordValue,
              message: t('Registration.passwordFieldMinLengthMessage'),
            },
          })}
          label={t(`${sortOfAuth}.passwordLabel`)}
          type="password"
          placeholder={t(`${sortOfAuth}.passwordPlaceholder`)}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className={css.authorization__error_message}>{message}</p>}
        />
        <Button type="submit">{t(`${sortOfAuth}.signButton`)}</Button>
      </form>
      {(isLoadingSignUp || isLoadingSignIn) && <CircularProgress />}
    </Section>
  );
};

export default Authorization;
