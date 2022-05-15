import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '$store/store';
import { useUpdateUserMutation } from '$services/api';
import classNames from 'classnames';
import { Box, Grid, InputBase, Typography } from '@mui/material';
import ConfirmWindow from '$components/ConfirmWindow';
import { setLogin } from '$store/appSlice';
import css from './Profile.module.scss';

interface IFormState {
  username: string;
  login: string;
  password: string;
}

interface IProfileFormProps {
  userId: string;
}

const ProfileForm: FC<IProfileFormProps> = ({ userId }) => {
  const { t } = useTranslation();
  const [isShowConfirmModalChange, setIsShowConfirmModalChange] = useState<boolean>(false);
  const [userNewInfo, setUserNewInfo] = useState<IFormState | null>(null);
  const { handleSubmit, control, reset } = useForm<IFormState>({
    defaultValues: {
      username: '',
      login: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();

  const changeUserInfoHandler: SubmitHandler<IFormState> = (data) => {
    setIsShowConfirmModalChange(true);
    setUserNewInfo(data);
  };

  const changeUserInfo = async () => {
    try {
      if (userNewInfo) {
        const newData = {
          name: userNewInfo.username,
          login: userNewInfo.login,
          password: userNewInfo.password,
        };

        await updateUser({ body: newData, id: userId }).unwrap();
        setIsShowConfirmModalChange(false);
        reset({
          username: '',
          login: '',
          password: '',
        });
        dispatch(setLogin(userNewInfo?.login));
      }
    } catch (_) {}
    setUserNewInfo(null);
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
          {t('Profile.profileFormTitle')}
        </Typography>

        <Controller
          control={control}
          name="username"
          rules={{
            required: true,
            minLength: {
              value: 5,
              message: t('Profile.errorTextMinLengthNewTitle'),
            },
            maxLength: {
              value: 60,
              message: t('Profile.errorTextMaxLengthNewTitle'),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <Box className={css.profile__form_inputWrapper}>
              <InputBase
                className={inputClassName(!!error?.message)}
                type="text"
                placeholder={t('Profile.profileNameLabel')}
                inputProps={{
                  'aria-label': t('Profile.profileNameLabel'),
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
              message: t('Profile.errorTextMinLengthNewTitle'),
            },
            maxLength: {
              value: 60,
              message: t('Profile.errorTextMaxLengthNewTitle'),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <Box className={css.profile__form_inputWrapper}>
              <InputBase
                className={inputClassName(!!error?.message)}
                type="text"
                placeholder={t('Profile.profileLoginLabel')}
                inputProps={{
                  'aria-label': t('Profile.profileLoginLabel'),
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
              message: t('Profile.errorTextMinLengthNewTitle'),
            },
            maxLength: {
              value: 60,
              message: t('Profile.errorTextMaxLengthNewTitle'),
            },
          }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <Box className={css.profile__form_inputWrapper}>
              <InputBase
                className={inputClassName(!!error?.message)}
                type="password"
                placeholder={t('Profile.profilePasswordLabel')}
                inputProps={{
                  'aria-label': t('Profile.profilePasswordLabel'),
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
          // disabled={isLoading || !isDirty}
          value={t('Profile.profileSubmit')}
        />
      </Box>

      <ConfirmWindow
        isShow={isShowConfirmModalChange}
        title={t('Profile.profileConfirmChangeProfile')}
        disAgreeHandler={() => setIsShowConfirmModalChange(false)}
        agreeHandler={changeUserInfo}
      />
    </Grid>
  );
};

export default ProfileForm;
