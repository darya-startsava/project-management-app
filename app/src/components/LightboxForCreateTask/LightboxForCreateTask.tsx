import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery } from '$services/api';
import classNames from 'classnames';
import { InputBase, Box, Typography, MenuItem, CircularProgress, TextField } from '@mui/material';
import LightBox from '$components/Lightbox';
import {
  TASKS_TITLE_MIN_LENGTH,
  TASKS_TITLE_MAX_LENGTH,
  TASKS_DESCRIPTION_MIN_LENGTH,
  TASKS_DESCRIPTION_MAX_LENGTH,
} from '$settings/index';
import { INewNTaskFormState, TCreateElement } from '$types/common';
import css from './LightboxForCreateTask.module.scss';

interface IBoardsModal {
  showModal: boolean;
  isLoading: boolean;
  changeShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitCB: TCreateElement<INewNTaskFormState>;
  modalTitle: string;
  nameLabel: string;
  descriptionLabel: string;
  userLabel: string;
  submitButtonText: string;
}

const LightboxForCreateTask: FC<IBoardsModal> = ({
  showModal,
  isLoading,
  changeShowModal,
  submitCB,
  modalTitle,
  nameLabel,
  descriptionLabel,
  userLabel,
  submitButtonText,
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = useForm<INewNTaskFormState>({
    defaultValues: {
      title: '',
      description: '',
      userId: '',
    },
  });

  // , isLoading, error: errorGetAllUsers
  const { data: users = [], isLoading: isLoadingUsers } = useGetAllUsersQuery();

  const addNewBoardHandler: SubmitHandler<INewNTaskFormState> = (data) => {
    submitCB(data);
    reset({
      title: '',
      description: '',
      userId: '',
    });
  };

  const classNameSubmit = classNames(css.modalAddForm_submit, {
    [css.disabled]:
      isLoading ||
      !isDirty ||
      errors?.title?.message ||
      errors?.description?.message ||
      errors?.userId?.message,
  });

  return (
    <LightBox
      showModal={showModal}
      closeModalFunction={() => {
        changeShowModal(false);
      }}
      modalTitle={modalTitle}
    >
      <Box
        className={css.modalAddForm}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(addNewBoardHandler)}
        noValidate
      >
        <Controller
          control={control}
          name="title"
          rules={{
            required: true,
            minLength: {
              value: TASKS_TITLE_MIN_LENGTH,
              message: t('Tasks.errorMinLengthTitle', { TASKS_TITLE_MIN_LENGTH }),
            },
            maxLength: {
              value: TASKS_TITLE_MAX_LENGTH,
              message: t('Tasks.errorMaxLengthTitle', { TASKS_TITLE_MAX_LENGTH }),
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextField
                type="text"
                value={value}
                className={classNames(css.modalAddForm_element, {
                  [css.error]: error?.message,
                })}
                label={nameLabel}
                onChange={onChange}
                autoFocus
                fullWidth
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.modalAddForm_errorText}>
                  {t('Tasks.errorText', { ERROR_MESSAGE: error?.message })}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{
            required: true,
            minLength: {
              value: TASKS_DESCRIPTION_MIN_LENGTH,
              message: t('Tasks.errorMinLengthDescription', { TASKS_DESCRIPTION_MIN_LENGTH }),
            },
            maxLength: {
              value: TASKS_DESCRIPTION_MAX_LENGTH,
              message: t('Tasks.errorMaxLengthDescription', { TASKS_DESCRIPTION_MAX_LENGTH }),
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextField
                value={value}
                className={classNames([css.modalAddForm_description, css.modalAddForm_element], {
                  [css.error]: error?.message,
                })}
                label={descriptionLabel}
                onChange={onChange}
                multiline
                fullWidth
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.modalAddForm_errorText}>
                  {t('Tasks.errorText', { ERROR_MESSAGE: error?.message })}
                </Typography>
              )}
            </>
          )}
        />

        {isLoadingUsers ? (
          <CircularProgress />
        ) : (
          <Controller
            control={control}
            name="userId"
            rules={{
              required: t('Tasks.errorChoiceUser'),
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  id="users"
                  select
                  label={userLabel}
                  value={value}
                  onChange={onChange}
                  className={classNames(css.modalAddForm_element, {
                    [css.error]: error?.message,
                  })}
                  fullWidth
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.login}
                    </MenuItem>
                  ))}
                </TextField>

                {error?.message && (
                  <Typography
                    variant="inherit"
                    component="p"
                    className={css.modalAddForm_errorText}
                  >
                    {t('Tasks.errorText', { ERROR_MESSAGE: error?.message })}
                  </Typography>
                )}
              </>
            )}
          />
        )}

        <InputBase
          className={classNameSubmit}
          type="submit"
          disableInjectingGlobalStyles={true}
          disabled={isLoading || !isDirty}
          value={submitButtonText}
          fullWidth={true}
        />
      </Box>
    </LightBox>
  );
};

export default LightboxForCreateTask;
