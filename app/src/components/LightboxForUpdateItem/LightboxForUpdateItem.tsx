import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { InputBase, Box, TextareaAutosize, Typography } from '@mui/material';
import LightBox from '$components/Lightbox';
import { TUpdateElement, IUpdateTitleFormState } from '$types/common';
import css from './LightboxForUpdateItem.module.scss';

interface IBoardsModal {
  showUpdateModal: boolean;
  changeShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitCB: TUpdateElement;
  localizationKeyTextareaErrorText: string;
  placeholderText: string;
  modalTitle: string;
  isLoading: boolean;
  rules?: {
    required?: boolean;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
}

const LightboxUpdateBoard: FC<IBoardsModal> = ({
  showUpdateModal,
  changeShowUpdateModal,
  modalTitle,
  submitCB,
  localizationKeyTextareaErrorText,
  placeholderText,
  isLoading,
  rules,
}) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = useForm<IUpdateTitleFormState>();

  const updateBoardHandler: SubmitHandler<IUpdateTitleFormState> = (data) => {
    submitCB({
      title: data.title.trim(),
    });
    reset();
  };

  const classNameTextarea = classNames(css.modalAddForm_text, {
    [css.error]: errors?.title,
  });

  const classNameSubmit = classNames(css.modalAddForm_submit, {
    [css.disabled]: isLoading || !isDirty || errors.title?.message,
  });

  return (
    <LightBox
      showModal={showUpdateModal}
      closeModalFunction={() => {
        changeShowUpdateModal(false);
      }}
      modalTitle={modalTitle}
    >
      <Box
        className={css.modalAddForm}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(updateBoardHandler)}
        noValidate
      >
        <Controller
          control={control}
          name="title"
          rules={rules}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextareaAutosize
                value={value}
                className={classNameTextarea}
                placeholder={placeholderText}
                aria-label={t('Boards.updateModalTextareaPlaceholder')}
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
          value={t('Boards.updateModalSubmitButton')}
        />
      </Box>
    </LightBox>
  );
};

export default LightboxUpdateBoard;
