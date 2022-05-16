import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { InputBase, Box, TextareaAutosize, Typography } from '@mui/material';
import LightBox from '$components/Lightbox';
import { INewNameFormState, TCreateElement } from '$types/common';
import css from './LightboxForCreateItem.module.scss';

interface IBoardsModal {
  showModal: boolean;
  isLoading: boolean;
  modalTitle: string;
  placeholderText: string;
  textareaErrorText: (errorMessage: string) => string;
  submitButtonText: string;
  changeShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitCB: TCreateElement;
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

const LightboxForCreateItem: FC<IBoardsModal> = ({
  showModal,
  changeShowModal,
  placeholderText,
  submitCB,
  rules,
  modalTitle,
  textareaErrorText,
  submitButtonText,
  isLoading,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = useForm<INewNameFormState>();

  const addNewBoardHandler: SubmitHandler<INewNameFormState> = (data) => {
    submitCB({ newTitle: data.newTitle.trim() });
    reset();
  };

  const classNameTextarea = classNames(css.modalAddForm_text, {
    [css.error]: errors?.newTitle,
  });

  const classNameSubmit = classNames(css.modalAddForm_submit, {
    [css.disabled]: isLoading || !isDirty || errors.newTitle?.message,
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
          name="newTitle"
          rules={rules}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextareaAutosize
                value={value}
                className={classNameTextarea}
                placeholder={placeholderText}
                area-label={placeholderText}
                onChange={onChange}
              />

              {error?.message && (
                <Typography variant="inherit" component="p" className={css.modalAddForm_errorText}>
                  {textareaErrorText(error.message)}
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

export default LightboxForCreateItem;
