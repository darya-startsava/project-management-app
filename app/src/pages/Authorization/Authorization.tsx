import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CircularProgress, TextField, Typography, Grid, Box } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { useSnackbar, OptionsObject } from 'notistack';
import { IUserLogIn, IUserRegistration } from '$types/common';
import { setToken } from '$store/appSlice';
import { useSignInMutation, useSignUpMutation } from '$services/api';
import Section from '$components/Section';
import { ROUTES_PATHS } from '$settings/routing';
import css from './Authorization.module.scss';
import './Authorization.scss';
import { Link } from 'react-router-dom';
import { tokenAuth } from '$settings/index';

interface IAuthorization {
  sortOfAuth: string;
}

enum SortOfAuth {
  Registration = 'Registration',
  LogIn = 'LogIn',
}

const messageOptions: OptionsObject = {
  variant: 'error',
  autoHideDuration: 5000,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
};

const Authorization: FC<IAuthorization> = ({ sortOfAuth }) => {
  let passwordValue = 0;
  let changeSortOfAuth = ROUTES_PATHS.registration;
  if (sortOfAuth === SortOfAuth.Registration) {
    passwordValue = 5;
    changeSortOfAuth = ROUTES_PATHS.login;
  }
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserRegistration>();
  const [signUp, { isLoading: isLoadingSignUp, error: errorSignUp }] = useSignUpMutation();
  const [signIn, { isLoading: isLoadingSignIn, error: errorSignIn }] = useSignInMutation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (errorSignIn && 'data' in errorSignIn) {
      if (errorSignIn.status === 403) {
        enqueueSnackbar(t('LogIn.error403Message'), messageOptions);
      } else {
        enqueueSnackbar(t('LogIn.errorMessage'), messageOptions);
      }
    }
  }, [errorSignIn, enqueueSnackbar, t]);

  useEffect(() => {
    if (errorSignUp && 'data' in errorSignUp) {
      if (errorSignUp.status === 409) {
        enqueueSnackbar(t('Registration.error409Message'), {
          variant: 'error',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      } else {
        enqueueSnackbar(t('Registration.errorMessage'), {
          variant: 'error',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
    }
  }, [errorSignUp, enqueueSnackbar, t]);

  const onSubmit: SubmitHandler<IUserRegistration> = async (data) => {
    if (sortOfAuth === SortOfAuth.Registration) {
      await newUserRegistration(data);
    }
    await userLogIn({ login: data.login, password: data.password });
  };

  async function newUserRegistration(user: IUserRegistration) {
    await signUp(user).unwrap();
  }

  async function userLogIn(user: IUserLogIn) {
    const result = await signIn(user).unwrap();
    dispatch(setToken(result.token));
    localStorage.setItem(tokenAuth, result.token);
    navigate(ROUTES_PATHS.boards);
  }

  return (
    <Section className="Auth" pageAllSpace={true}>
      <Grid className="Auth" container direction="row">
        <Typography className="Auth" variant="h3">
          {t(`${sortOfAuth}.signTitle`)}{' '}
        </Typography>
        {(isLoadingSignUp || isLoadingSignIn) && <CircularProgress />}
      </Grid>
      <form className="Auth" onSubmit={handleSubmit(onSubmit)}>
        <Grid className="Auth" container direction="column">
          {sortOfAuth === SortOfAuth.Registration && (
            <>
              <TextField
                className="Auth"
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
            className="Auth"
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
            className="Auth"
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
          <Grid className="Auth wrapperToChangeSortOfAuth" container direction="row">
            <Box>{t(`${sortOfAuth}.questionToChangeSortOfAuth`)}</Box>
            <Link className={css.authorization__linkToChangeSortOfAuth} to={changeSortOfAuth}>
              {t(`${sortOfAuth}.linkToChangeSortOfAuth`)}
            </Link>
          </Grid>
          <Button className="Auth" type="submit" variant="contained">
            {t(`${sortOfAuth}.signButton`)}
          </Button>
        </Grid>
      </form>
    </Section>
  );
};

export default Authorization;
