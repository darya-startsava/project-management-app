import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '$store/store';
import { useDeleteUserMutation, useGetAllUsersQuery } from '$services/api';
import { Navigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Section from '$components/Section';
import ProfileForm from './ProfileForm';
import ConfirmWindow from '$components/ConfirmWindow';
import { setLogin, setToken } from '$store/appSlice';
import { ROUTES_PATHS } from '$settings/routing';
import { IUser } from '$types/common';
import profileImg from '$assets/img/user.png';
import css from './Profile.module.scss';

const Profile: FC = () => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [isShowConfirmModalDelete, setIsShowConfirmModalDelete] = useState<boolean>(false);
  const { login } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();

  useEffect(() => {
    if (!isLoading) {
      setUserInfo(users.filter((el) => el.login === login)[0]);
    }
  }, [login, users, isLoading]);

  const removeHandler = async () => {
    if (userInfo) {
      await deleteUser(userInfo.id);
      dispatch(setToken(null));
      dispatch(setLogin(null));
      <Navigate to={ROUTES_PATHS.welcome} />;
    }

    setIsShowConfirmModalDelete(false);
  };
  return (
    <Section pageAllSpace={true} className={css.profile}>
      {isLoading || isDeleteLoading ? (
        <Box className={css.profile__loader}>
          <CircularProgress size={90} />
        </Box>
      ) : (
        <>
          <Typography variant="inherit" component="h2" className={css.profile__title} mb={5}>
            {t('Profile.profileTitle')}: {userInfo?.login}
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
                alt={t('Profile.profileImage')}
                src={profileImg}
              />

              <Button
                className={css.profile__content_deleteButton}
                onClick={() => setIsShowConfirmModalDelete(true)}
              >
                {t('Profile.profileDelete')}
                <DeleteForeverIcon />
              </Button>
            </Grid>

            <ProfileForm userId={userInfo?.id || ''} />
          </Grid>

          <ConfirmWindow
            isShow={isShowConfirmModalDelete}
            title={t('Profile.profileConfirmDelete')}
            disAgreeHandler={() => setIsShowConfirmModalDelete(false)}
            agreeHandler={removeHandler}
          />
        </>
      )}
    </Section>
  );
};

export default Profile;
