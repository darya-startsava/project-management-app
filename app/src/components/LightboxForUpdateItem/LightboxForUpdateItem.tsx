import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { InputBase, Box, TextareaAutosize, Typography } from '@mui/material';
import LightBox from '$components/Lightbox';
import { TUpdateElement } from '$types/common';
import css from './LightboxUpdateItem.module.scss';

interface IBoardsModal {
  showUpdateModal: boolean;
  changeShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitCB: TUpdateElement;
  localizationKeyTextareaErrorText: string;
  modalTitle: string;
  isLoading: boolean;
}

interface IFormState {
  cardTitle: string;
}

const LightboxUpdateBoard: FC<IBoardsModal> = ({
  showUpdateModal,
  changeShowUpdateModal,
  modalTitle,
  submitCB,
  localizationKeyTextareaErrorText,
  isLoading,
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
      newTitle: data.cardTitle.trim(),
      id: '',
    });
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
          rules={{
            required: true,
            minLength: {
              value: 5,
              message: t('Boards.errorTextMinLengthNewTitle'),
            },
            maxLength: {
              value: 60,
              message: t('Boards.errorTextMaxLengthNewTitle'),
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextareaAutosize
                value={value}
                className={classNameTextarea}
                placeholder={t('Boards.addModalTextareaPlaceholder')}
                aria-label={t('Boards.addModalTextareaPlaceholder')}
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
