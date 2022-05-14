import React, { FC } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IWrapEl, TSimpleFunction } from '$types/common';
import css from './LightBox.module.scss';

/*
 ** Принимает 4 аргумента:
 ** 1 - modalTitle - заголовок модального окна
 ** 2 - showModal открыто или закрыто модальное окно
 ** 3 - children внутренний контент модального окна
 ** 4 - closeModalFunction1 функция закрывающая модальное окно
 */

interface ILightBoxProps extends IWrapEl {
  modalTitle: string;
  showModal: boolean;
  closeModalFunction: TSimpleFunction;
}
const LightBox: FC<ILightBoxProps> = ({ modalTitle, showModal, children, closeModalFunction }) => {
  return (
    <Modal open={showModal} className={css.lightbox} onClose={closeModalFunction}>
      <Box className={css.lightbox__wrapper}>
        <IconButton className={css.lightbox__wrapper_closeButton} onClick={closeModalFunction}>
          <CloseIcon />
        </IconButton>

        {modalTitle ? (
          <Typography
            variant="inherit"
            component="p"
            className={css.lightbox__wrapper_title}
            mb={3}
          >
            {modalTitle}
          </Typography>
        ) : null}

        {children}
      </Box>
    </Modal>
  );
};

export default LightBox;
