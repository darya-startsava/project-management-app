import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddBoardMutation } from '$services/api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import classNames from 'classnames';
import { InputBase, Box, TextareaAutosize, Typography } from '@mui/material';
import LightBox from '$components/Lightbox';
import CloseButton from '$components/CloseButton';
import css from './LightboxNewBoard.module.scss';

interface IBoardsModal {
  showModal: boolean;
  changeShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormState {
  cardTitle: string;
}

const LightboxNewBoard: FC<IBoardsModal> = ({ showModal, changeShowModal }) => {
  const { t } = useTranslation();
  const [addBoard, { isLoading }] = useAddBoardMutation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = useForm<IFormState>();

  const addNewBoardHandler: SubmitHandler<IFormState> = async (data) => {
    try {
      await addBoard({ title: data.cardTitle }).unwrap();
    } catch (_) {
      return enqueueSnackbar(t('Boards.errorBoardCreate'), {
        variant: 'error',
        autoHideDuration: 5000,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }

    enqueueSnackbar(t('Boards.successBoardCreate'), {
      variant: 'success',
      autoHideDuration: 5000,
      action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
    });
    changeShowModal(false);
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
      showModal={showModal}
      closeModalFunction={() => {
        changeShowModal(false);
      }}
      modalTitle={t('Boards.boardsModalTitle')}
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
                placeholder={t('Boards.boardsModalTextareaPlaceholder')}
                area-label={t('Boards.boardsModalTextareaPlaceholder')}
                onChange={onChange}
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.modalAddForm_errorText}>
                  <Box component="span" className={css.modalAddForm_errorText}>
                    {t('Boards.errorTitle')}
                  </Box>
                  <Box component="span">{error.message}</Box>
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
          value={t('Boards.boardsModalSubmitButton')}
        />
      </Box>
    </LightBox>
  );
};

export default LightboxNewBoard;
