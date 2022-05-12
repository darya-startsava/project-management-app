import React, { FC } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IWrapEl, TSimpleFunction } from '$types/common';
import css from './ModalPage.module.scss';

/*
 ** Принимает 4 аргумента:
 ** 1 - modalTitle - заголовок модального окна
 ** 2 - showModal открыто или закрыто модальное окно
 ** 3 - children внутренний контент модального окна
 ** 4 - closeModalFunction1 функция закрывающая модальное окно
 */

interface IModalProps extends IWrapEl {
  modalTitle: string;
  showModal: boolean;
  closeModalFunction: TSimpleFunction;
}
const ModalPage: FC<IModalProps> = ({ modalTitle, showModal, children, closeModalFunction }) => {
  return (
    <Modal open={showModal} className={css.modal} onClose={closeModalFunction}>
      <Box className={css.modal__wrapper}>
        <IconButton className={css.modal__wrapper_closeButton} onClick={closeModalFunction}>
          <CloseIcon />
        </IconButton>

        {modalTitle ? (
          <Typography variant="inherit" component="p" className={css.modal__wrapper_title} mb={3}>
            {modalTitle}
          </Typography>
        ) : null}

        {children}
      </Box>
    </Modal>
  );
};

export default ModalPage;
