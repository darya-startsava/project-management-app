import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { InputBase, Box, TextareaAutosize, Typography } from '@mui/material';
import LightBox from '$components/Lightbox';
import { INewNTaskFormState, TCreateElement } from '$types/common';
import css from './LightboxForCreateTask.module.scss';

interface IBoardsModal {
  showModal: boolean;
  isLoading: boolean;
  modalTitle: string;
  placeholderText: string;
  localizationKeyTextareaErrorText: string;
  submitButtonText: string;
  changeShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitCB: TCreateElement<INewNTaskFormState>;
}

const LightboxForCreateTask: FC<IBoardsModal> = ({
  showModal,
  changeShowModal,
  placeholderText,
  submitCB,
  modalTitle,
  localizationKeyTextareaErrorText,
  submitButtonText,
  isLoading,
}) => {
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
  const { t } = useTranslation();
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
              value: 5,
              message: t('Tasks.errorTextMinLengthNewTitle', { lengthMinLetters: 5 }),
            },
            maxLength: {
              value: 20,
              message: t('Tasks.errorTextMaxLengthNewTitle', { lengthMaxLetters: 20 }),
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextareaAutosize
                value={value}
                className={classNames(css.modalAddForm_text, {
                  [css.error]: error?.message,
                })}
                placeholder={placeholderText}
                area-label={placeholderText}
                onChange={onChange}
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.modalAddForm_errorText}>
                  {t(localizationKeyTextareaErrorText, { errorMessage: error?.message })}
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
              value: 2,
              message: t('Tasks.errorTextMinLengthNewTitle', { lengthMinLetters: 2 }),
            },
            maxLength: {
              value: 400,
              message: t('Tasks.errorTextMaxLengthNewTitle', { lengthMaxLetters: 400 }),
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextareaAutosize
                value={value}
                className={classNames(css.modalAddForm_text, {
                  [css.error]: error?.message,
                })}
                placeholder={placeholderText}
                area-label={placeholderText}
                onChange={onChange}
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.modalAddForm_errorText}>
                  {t(localizationKeyTextareaErrorText, { errorMessage: error?.message })}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="userId"
          rules={{
            maxLength: {
              value: 20,
              message: t('Tasks.errorTextMaxLengthNewTitle', { lengthMaxLetters: 20 }),
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextareaAutosize
                value={value}
                className={classNames(css.modalAddForm_text, {
                  [css.error]: error?.message,
                })}
                placeholder={placeholderText}
                area-label={placeholderText}
                onChange={onChange}
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.modalAddForm_errorText}>
                  {t(localizationKeyTextareaErrorText, { errorMessage: error?.message })}
                </Typography>
              )}
            </>
          )}
        />

        <InputBase
          className={classNameSubmit}
          type="submit"
          disableInjectingGlobalStyles={true}
          disabled={isLoading || !isDirty}
          value={submitButtonText}
        />
      </Box>
    </LightBox>
  );
};

export default LightboxForCreateTask;
