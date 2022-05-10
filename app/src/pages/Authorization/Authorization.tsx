import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { IUserAuthorization } from '$types/common';
import { setToken } from '$store/appSlice';
import { useSignInMutation } from '$services/api';
import Section from '$components/Section';
import { useTranslation } from 'react-i18next';
import { ROUTES_PATHS } from '$settings/routing';

const Authorization: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserAuthorization>();
  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit: SubmitHandler<IUserAuthorization> = async (data) => {
    await userAuthorization(data);
  };

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
      <Typography variant="h3">{t('Authorization.signInTitle')}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: add validation */}
        <TextField
          {...register('login')}
          required
          label={t('Authorization.loginLabel')}
          placeholder={t('Authorization.loginPlaceholder')}
        />
        <TextField
          {...register('password')}
          required
          label={t('Authorization.passwordLabel')}
          type="password"
          placeholder={t('Authorization.passwordPlaceholder')}
        />
        <Button type="submit">{t('Authorization.signInButton')}</Button>
      </form>
      {isLoading && <CircularProgress />}
    </Section>
  );
};

export default Authorization;
