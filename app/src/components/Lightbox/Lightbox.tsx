import React, { FC } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import CloseButton from '$components/CloseButton';
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
    <Modal open={showModal} className={css.lightBox} onClose={closeModalFunction}>
      <Box className={css.lightBox__wrapper}>
        <CloseButton closeCb={closeModalFunction} className={css.lightBox__wrapper_closeButton} />

        {modalTitle ? (
          <Typography
            variant="inherit"
            component="p"
            className={css.lightBox__wrapper_title}
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
