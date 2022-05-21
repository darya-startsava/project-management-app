import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '$store/store';
import { setLogin, setToken } from '$store/appSlice';
import { useDeleteUserMutation, useGetAllUsersQuery } from '$services/api';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Section from '$components/Section';
import ProfileForm from './ProfileForm';
import ConfirmWindow from '$components/ConfirmWindow';
import CloseButton from '$components/CloseButton';
import { ROUTES_PATHS } from '$settings/routing';
import {
  CLOSE_SNACKBAR_TIME,
  LOGIN_NAME_LOCALSTORAGE,
  TOKEN_AUTH_LOCALSTORAGE,
} from '$settings/index';
import { IError, IUser } from '$types/common';
import profileImg from '$assets/img/user.png';
import css from './Profile.module.scss';

const Profile: FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [isShowConfirmModalDelete, setIsShowConfirmModalDelete] = useState<boolean>(false);
  const { login } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { data: users = [], isLoading, error: errorGetAllUsers } = useGetAllUsersQuery();
  const [
    deleteUser,
    { isLoading: isLoadingDelete, error: errorDeleteProfile, isSuccess: isSuccessDeleteUser },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (!isLoading) {
      setUserInfo(users.filter((el) => el.login === login)[0]);
    }
  }, [login, users, isLoading]);

  useEffect(() => {
    if (errorGetAllUsers) {
      enqueueSnackbar(t('Profile.errorGetAllUsers'), {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
      navigate(ROUTES_PATHS.welcome, { replace: true });
    }
  }, [errorGetAllUsers, t, enqueueSnackbar, closeSnackbar, navigate]);

  useEffect(() => {
    if (errorDeleteProfile) {
      const errorMessage = t('Profile.errorDeleteProfile', {
        errorText: (errorDeleteProfile as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorDeleteProfile, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (isSuccessDeleteUser) {
      enqueueSnackbar(t('Profile.successDeleteUser'), {
        variant: 'success',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
      dispatch(setToken(null));
      dispatch(setLogin(null));
      localStorage.removeItem(TOKEN_AUTH_LOCALSTORAGE);
      localStorage.removeItem(LOGIN_NAME_LOCALSTORAGE);
      navigate(ROUTES_PATHS.welcome, { replace: true });
    }
  }, [isSuccessDeleteUser, t, enqueueSnackbar, closeSnackbar, dispatch, navigate]);

  const removeHandler = async () => {
    if (userInfo) {
      deleteUser(userInfo.id);
    }
    setIsShowConfirmModalDelete(false);
  };

  return (
    <Section pageAllSpace={true} className={css.profile}>
      {isLoading || isLoadingDelete ? (
        <Box className={css.profile__loader}>
          <CircularProgress size={90} />
        </Box>
      ) : (
        <>
          <Typography variant="inherit" component="h2" className={css.profile__title} mb={5}>
            {t('Profile.pageTitle', { name: userInfo?.login || '' })}
          </Typography>

          <Grid
            container
            className={css.profile__content}
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item className={css.profile__content_user}>
              <Box
                className={css.profile__content_img}
                component="img"
                alt={t('Profile.userImage')}
                src={profileImg}
              />

              <Button
                className={css.profile__content_deleteButton}
                onClick={() => setIsShowConfirmModalDelete(true)}
              >
                {t('Profile.deleteButtonText')}
                <DeleteForeverIcon />
              </Button>
            </Grid>

            <ProfileForm userId={userInfo?.id || ''} />
          </Grid>

          <ConfirmWindow
            isShow={isShowConfirmModalDelete}
            title={t('Profile.confirmDeleteModalTitle')}
            disAgreeHandler={() => setIsShowConfirmModalDelete(false)}
            agreeHandler={removeHandler}
          />
        </>
      )}
    </Section>
  );
};

export default Profile;
