import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '$store/store';
import { setLogin } from '$store/appSlice';
import { useUpdateUserMutation } from '$services/api';
import classNames from 'classnames';
import { Box, Grid, InputBase, Typography } from '@mui/material';
import ConfirmWindow from '$components/ConfirmWindow';
import CloseButton from '$components/CloseButton';
import { CLOSE_SNACKBAR_TIME, LOGIN_NAME_LOCALSTORAGE } from '$settings/index';
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
        errorText: (error as IError).data.message || '',
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
    <Grid item className={css.profile__form}>
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
            required: true,
            minLength: {
              value: 5,
              message: t('Profile.errorTextMinLengthNewName', { minLetters: 5 }),
            },
            maxLength: {
              value: 20,
              message: t('Profile.errorTextMaxLengthNewName', { minLetters: 20 }),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <Box className={css.profile__form_inputWrapper}>
              <InputBase
                className={inputClassName(!!error?.message)}
                type="text"
                placeholder={t('Profile.nameLabel')}
                inputProps={{
                  'aria-label': t('Profile.nameLabel'),
                }}
                {...field}
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.formErrorText}>
                  {error.message}
                </Typography>
              )}
            </Box>
          )}
        />

        <Controller
          control={control}
          name="login"
          rules={{
            required: true,
            minLength: {
              value: 5,
              message: t('Profile.errorTextMinLengthNewLogin', { minLetters: 5 }),
            },
            maxLength: {
              value: 20,
              message: t('Profile.errorTextMaxLengthNewLogin', { minLetters: 20 }),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <Box className={css.profile__form_inputWrapper}>
              <InputBase
                className={inputClassName(!!error?.message)}
                type="text"
                placeholder={t('Profile.loginLabel')}
                inputProps={{
                  'aria-label': t('Profile.loginLabel'),
                }}
                {...field}
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.formErrorText}>
                  {error.message}
                </Typography>
              )}
            </Box>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
            minLength: {
              value: 5,
              message: t('Profile.errorTextMinLengthNewPassword', { minLetters: 5 }),
            },
            maxLength: {
              value: 15,
              message: t('Profile.errorTextMaxLengthNewPassword', { minLetters: 15 }),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <Box className={css.profile__form_inputWrapper}>
              <InputBase
                className={inputClassName(!!error?.message)}
                type="password"
                placeholder={t('Profile.passwordLabel')}
                inputProps={{
                  'aria-label': t('Profile.passwordLabel'),
                }}
                {...field}
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.formErrorText}>
                  {error.message}
                </Typography>
              )}
            </Box>
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
