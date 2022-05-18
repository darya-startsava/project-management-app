import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { InputBase, Box, TextareaAutosize, Typography } from '@mui/material';
import LightBox from '$components/Lightbox';
import { TUpdateElement } from '$types/common';
import css from './LightboxForUpdateItem.module.scss';

interface IBoardsModal {
  showUpdateModal: boolean;
  changeShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitCB: TUpdateElement;
  localizationKeyTextareaErrorText: string;
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

interface IFormState {
  cardTitle: string;
  cardId: string;
}

const LightboxUpdateBoard: FC<IBoardsModal> = ({
  showUpdateModal,
  changeShowUpdateModal,
  modalTitle,
  submitCB,
  localizationKeyTextareaErrorText,
  isLoading,
  rules,
}) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = useForm<IFormState>();

  const updateBoardHandler: SubmitHandler<IFormState> = (data) => {
    submitCB({
      cardTitle: data.cardTitle.trim(),
      cardId: data.cardId,
    });
    console.log(data.cardTitle);
    console.log(data.cardId);
    reset();
  };

  const classNameTextarea = classNames(css.modalAddForm_text, {
    [css.error]: errors?.cardTitle,
  });

  const classNameSubmit = classNames(css.modalAddForm_submit, {
    [css.disabled]: isLoading || !isDirty || errors.cardTitle?.message,
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
          name="cardTitle"
          rules={rules}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextareaAutosize
                value={value}
                className={classNameTextarea}
                placeholder={t('Boards.updateModalTextareaPlaceholder')}
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
