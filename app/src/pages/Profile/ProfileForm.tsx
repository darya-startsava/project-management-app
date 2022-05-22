import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '$store/store';
import { setLogin } from '$store/appSlice';
import { useUpdateUserMutation } from '$services/api';
import classNames from 'classnames';
import { Box, Grid, InputBase, TextField, Typography } from '@mui/material';
import ConfirmWindow from '$components/ConfirmWindow';
import CloseButton from '$components/CloseButton';
import {
  CLOSE_SNACKBAR_TIME,
  LOGIN_NAME_LOCALSTORAGE,
  USER_LOGIN_MAX_LENGTH,
  USER_LOGIN_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '$settings/index';
import { IError } from '$types/common';
import css from './Profile.module.scss';

interface IFormState {
  name: string;
  login: string;
  password: string;
}

interface IProfileFormProps {
  userId: string;
}

const ProfileForm: FC<IProfileFormProps> = ({ userId }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isShowConfirmModalChange, setIsShowConfirmModalChange] = useState<boolean>(false);
  const [userNewInfo, setUserNewInfo] = useState<IFormState | null>(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<IFormState>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const [updateUser, { isLoading, error, isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (error) {
      const errorMessage = t('Profile.errorUpdate', {
        ERROR_MESSAGE: (error as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [error, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (isSuccess) {
      const errorMessage = t('Profile.successUpdate');
      enqueueSnackbar(errorMessage, {
        variant: 'success',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccess, t, enqueueSnackbar, closeSnackbar]);

  const changeUserInfoHandler: SubmitHandler<IFormState> = (data) => {
    setIsShowConfirmModalChange(true);
    setUserNewInfo(data);
  };

  const changeUserInfo = () => {
    if (userNewInfo) {
      updateUser({ body: userNewInfo, id: userId });
      reset({
        name: '',
        login: '',
        password: '',
      });
      dispatch(setLogin(userNewInfo.login));
      localStorage.setItem(LOGIN_NAME_LOCALSTORAGE, userNewInfo.login);
      setUserNewInfo(null);
    }
    setIsShowConfirmModalChange(false);
  };

  const inputClassName = (isError: boolean): string => {
    return classNames(css.profile__form_input, {
      [css.error]: isError,
    });
  };

  const classNameSubmit = classNames(css.profile__form_submit, {
    [css.disabled]: false,
  });

  return (
    <Grid item className={css.profile__form_wrapper}>
      <Box
        className={css.profile__form}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(changeUserInfoHandler)}
        noValidate
      >
        <Typography variant="inherit" component="p" className={css.profile__form_title} mb={2}>
          {t('Profile.titleChangeForm')}
        </Typography>

        <Controller
          control={control}
          name="name"
          rules={{
            required: t('Profile.errorEmptyField'),
            minLength: {
              value: USER_NAME_MIN_LENGTH,
              message: t('Profile.errorMinLengthName', { USER_NAME_MIN_LENGTH }),
            },
            maxLength: {
              value: USER_NAME_MAX_LENGTH,
              message: t('Profile.errorMaxLengthName', { USER_NAME_MAX_LENGTH }),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <>
              <TextField
                type="text"
                label={t('Profile.nameLabel')}
                {...field}
                className={inputClassName(!!error?.message)}
                fullWidth
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.formErrorText}>
                  {t('Profile.errorText', { ERROR_MESSAGE: error.message })}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="login"
          rules={{
            required: t('Profile.errorEmptyField'),
            minLength: {
              value: USER_LOGIN_MIN_LENGTH,
              message: t('Profile.errorMinLengthLogin', { USER_LOGIN_MIN_LENGTH }),
            },
            maxLength: {
              value: USER_LOGIN_MAX_LENGTH,
              message: t('Profile.errorMaxLengthLogin', { USER_LOGIN_MAX_LENGTH }),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <>
              <TextField
                type="text"
                label={t('Profile.loginLabel')}
                {...field}
                className={inputClassName(!!error?.message)}
                fullWidth
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.formErrorText}>
                  {t('Profile.errorText', { ERROR_MESSAGE: error.message })}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: t('Profile.errorEmptyField'),
            minLength: {
              value: USER_PASSWORD_MIN_LENGTH,
              message: t('Profile.errorMinLengthPassword', { USER_PASSWORD_MIN_LENGTH }),
            },
            maxLength: {
              value: USER_PASSWORD_MAX_LENGTH,
              message: t('Profile.errorMaxLengthPassword', { USER_PASSWORD_MAX_LENGTH }),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <>
              <TextField
                type="password"
                label={t('Profile.passwordLabel')}
                {...field}
                className={inputClassName(!!error?.message)}
                fullWidth
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.formErrorText}>
                  {t('Profile.errorText', { ERROR_MESSAGE: error.message })}
                </Typography>
              )}
            </>
          )}
        />

        <InputBase
          className={classNameSubmit}
          type="submit"
          disableInjectingGlobalStyles={true}
          disabled={isLoading || !isDirty || isSubmitting}
          value={t('Profile.submitChangeFormText')}
        />
      </Box>

      <ConfirmWindow
        isShow={isShowConfirmModalChange}
        title={t('Profile.confirmUpdateModalTitle')}
        disAgreeHandler={() => setIsShowConfirmModalChange(false)}
        agreeHandler={changeUserInfo}
      />
    </Grid>
  );
};

export default ProfileForm;
