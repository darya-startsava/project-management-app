import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useSignInMutation, useSignUpMutation } from '$services/api';
import classNames from 'classnames';
import {
  CircularProgress,
  TextField,
  Typography,
  Box,
  InputBase,
  InputAdornment,
  InputLabel,
  FormControl,
  OutlinedInput,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Section from '$components/Section';
import { setToken } from '$store/appSlice';
import { ROUTES_PATHS } from '$settings/routing';
import {
  messageErrorOptions,
  TOKEN_AUTH_LOCALSTORAGE,
  USER_LOGIN_MAX_LENGTH,
  USER_LOGIN_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '$settings/index';
import { IUserLogIn, IUserRegistration } from '$types/common';
import css from './Authorization.module.scss';

interface IAuthorization {
  sortOfAuth: string;
}

enum SortOfAuth {
  Registration = 'Registration',
  LogIn = 'LogIn',
}

const Authorization: FC<IAuthorization> = ({ sortOfAuth }) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  let changeSortOfAuth = ROUTES_PATHS.registration;
  if (sortOfAuth === SortOfAuth.Registration) {
    changeSortOfAuth = ROUTES_PATHS.login;
  }
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isDirty, isSubmitted },
    trigger,
    handleSubmit,
  } = useForm<IUserRegistration>();
  const [signUp, { isLoading: isLoadingSignUp, error: errorSignUp }] = useSignUpMutation();
  const [signIn, { isLoading: isLoadingSignIn, error: errorSignIn }] = useSignInMutation();
  const { enqueueSnackbar } = useSnackbar();

  // change the error message when switching the language
  useEffect(() => {
    if (isDirty && isSubmitted) {
      Object.keys(errors).forEach((fieldName) => {
        trigger(fieldName as keyof IUserRegistration, { shouldFocus: true });
      });
    }
  }, [i18n.language, isDirty, isSubmitted, errors, trigger]);

  // show login error message
  useEffect(() => {
    if (errorSignIn && 'data' in errorSignIn) {
      if (errorSignIn.status === 403) {
        enqueueSnackbar(t('LogIn.error403Message'), messageErrorOptions);
      } else {
        enqueueSnackbar(t('LogIn.errorMessage'), messageErrorOptions);
      }
    }
  }, [errorSignIn, enqueueSnackbar, t]);

  // show signUp error message
  useEffect(() => {
    if (errorSignUp && 'data' in errorSignUp) {
      if (errorSignUp.status === 409) {
        enqueueSnackbar(t('Registration.error409Message'), messageErrorOptions);
      } else {
        enqueueSnackbar(t('Registration.errorMessage'), messageErrorOptions);
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
    localStorage.setItem(TOKEN_AUTH_LOCALSTORAGE, result.token);
    navigate(ROUTES_PATHS.boards);
  }

  const checkDisableSubmit = (): boolean => {
    return (
      isLoadingSignUp ||
      isLoadingSignIn ||
      !!errors.name?.message ||
      !!errors.login?.message ||
      !!errors.password?.message
    );
  };

  const classNameSubmit = classNames(css.authForm_submit, {
    [css.disabled]: checkDisableSubmit(),
  });
  return (
    <Section className={css.authPage} pageAllSpace={true}>
      <Typography className={css.authPage__title} variant="inherit" component="h2" mb={5}>
        {t(`${sortOfAuth}.signTitle`)}{' '}
      </Typography>

      <>
        {(isLoadingSignUp || isLoadingSignIn) && (
          <Box className={css.authPage__loader}>
            <CircularProgress />
          </Box>
        )}
      </>

      <Box component="form" className={css.authForm} onSubmit={handleSubmit(onSubmit)}>
        {sortOfAuth === SortOfAuth.Registration && (
          <>
            <TextField
              className={classNames(css.authForm_element, {
                [css.error]: !!errors?.name?.message,
              })}
              {...register('name', {
                required: t('Registration.nameFieldRequiredMessage'),
                minLength: {
                  value: USER_NAME_MIN_LENGTH,
                  message: t('Registration.errorMinLengthName', { USER_NAME_MIN_LENGTH }),
                },
                maxLength: {
                  value: USER_NAME_MAX_LENGTH,
                  message: t('Registration.errorMaxLengthName', { USER_NAME_MAX_LENGTH }),
                },
              })}
              label={t('Registration.nameLabel')}
              placeholder={t('Registration.namePlaceholder')}
              fullWidth
              autoFocus={sortOfAuth === SortOfAuth.Registration ? true : false}
            />

            {errors?.name?.message && (
              <Typography variant="inherit" component="p" className={css.authForm_errorText}>
                {errors?.name?.message}
              </Typography>
            )}
          </>
        )}

        <TextField
          className={classNames(css.authForm_element, {
            [css.error]: !!errors?.login?.message,
          })}
          {...register('login', {
            required: t(`${sortOfAuth}.loginFieldRequiredMessage`),
            minLength: {
              value: USER_LOGIN_MIN_LENGTH,
              message: t(`${sortOfAuth}.errorMinLengthLogin`, { USER_LOGIN_MIN_LENGTH }),
            },
            maxLength: {
              value: USER_LOGIN_MAX_LENGTH,
              message: t(`${sortOfAuth}.errorMaxLengthLogin`, { USER_LOGIN_MAX_LENGTH }),
            },
          })}
          label={t(`${sortOfAuth}.loginLabel`)}
          placeholder={t(`${sortOfAuth}.loginPlaceholder`)}
          fullWidth
          autoFocus={sortOfAuth !== SortOfAuth.Registration ? true : false}
        />

        {errors?.login?.message && (
          <Typography variant="inherit" component="p" className={css.authForm_errorText}>
            {errors?.login?.message}
          </Typography>
        )}

        <FormControl
          className={classNames(css.authForm_element, {
            [css.error]: !!errors?.password?.message,
          })}
        >
          <InputLabel htmlFor="password">{t(`${sortOfAuth}.passwordLabel`)}</InputLabel>
          <OutlinedInput
            id="password"
            type={isShowPassword ? 'text' : 'password'}
            {...register('password', {
              required: t(`${sortOfAuth}.passwordFieldRequiredMessage`),
              minLength: {
                value: USER_PASSWORD_MIN_LENGTH,
                message: t(`${sortOfAuth}.errorMinLengthPassword`, { USER_PASSWORD_MIN_LENGTH }),
              },
              maxLength: {
                value: USER_PASSWORD_MAX_LENGTH,
                message: t(`${sortOfAuth}.errorMaxLengthPassword`, { USER_PASSWORD_MAX_LENGTH }),
              },
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={t(`${sortOfAuth}.passwordVisibilityButtonLabel`)}
                  onClick={() => setIsShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={t(`${sortOfAuth}.passwordLabel`)}
          />
        </FormControl>

        {errors?.password?.message && (
          <Typography variant="inherit" component="p" className={css.authForm_errorText}>
            {errors?.password?.message}
          </Typography>
        )}

        <Typography component="p" variant="inherit" className={css.authForm__text}>
          <Box component="span">{t(`${sortOfAuth}.questionToChangeSortOfAuth`)}</Box>

          <Link className={css.authForm__text_linkToChangeSortOfAuth} to={changeSortOfAuth}>
            {t(`${sortOfAuth}.linkToChangeSortOfAuth`)}
          </Link>
        </Typography>

        <InputBase
          className={classNameSubmit}
          type="submit"
          disableInjectingGlobalStyles={true}
          disabled={checkDisableSubmit()}
          value={t(`${sortOfAuth}.signButton`)}
        />
      </Box>
    </Section>
  );
};

export default Authorization;
