import React, { FC, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAddColumnMutation, useGetAllColumnsQuery } from '$services/api';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';
import { TableChart as TableChartIcon } from '@mui/icons-material';
import Section from '$components/Section';
import ColumnsListItem from '$components/ColumsList';
import CloseButton from '$components/CloseButton';
import LightboxForCreateItem from '$components/LightboxForCreateItem';
import { randNumber } from '$utils/index';
import { CLOSE_SNACKBAR_TIME } from '$settings/index';
import { INewNameFormState, TCreateElement } from '$types/common';
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import css from './OneBoard.module.scss';

const OneBoard: FC = () => {
  const params = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const lengthMinLetters = 5;
  const lengthMaxLetters = 20;
  const createElement = t('Columns.columnsOne');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);
  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);
  const { data: columns = [] } = useGetAllColumnsQuery(params.id || '');
  const [addColumn, { isLoading: isAddingColumn, error }] = useAddColumnMutation();

  const addNewBoard: TCreateElement = async (data: INewNameFormState) => {
    try {
      await addColumn({
        body: { title: data.newTitle, order: columns.length },
        id: params.id || '',
      });

      enqueueSnackbar(t('Common.successCreate', { createElement }), {
        variant: 'success',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    } catch (_) {
      const errorMessage = `${t('Common.errorCreate', { createElement })} ${error || ''}`;
      return enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
    setShowModal(false);
  };

  return (
    <Section className={css.one_board} pageAllSpace={true}>
      <Typography className={css.one_board__title} component="h2" variant="inherit">
        <Box
          className={css.one_board__title_img}
          component="span"
          style={{
            backgroundImage: `url(${arrImages[indexImg]})`,
          }}
        ></Box>
        {t('Columns.columnsTitle')} {location.state as string}
        <TableChartIcon />
      </Typography>

      <ColumnsListItem
        columns={columns}
        addCardHandler={() => {
          setShowModal(true);
        }}
      />

      <LightboxForCreateItem
        modalTitle={t('Common.createModalTitle', {
          createElementLowerCase: '$t(Columns.createElementLowerCase)',
        })}
        showModal={showModal}
        changeShowModal={setShowModal}
        submitCB={addNewBoard}
        isLoading={isAddingColumn}
        placeholderText={t('Columns.columnsModalTextareaPlaceholder')}
        rules={{
          required: true,
          minLength: {
            value: 5,
            message: t('Common.errorTextMinLengthNewTitle', { lengthMinLetters }),
          },
          maxLength: {
            value: 20,
            message: t('Columns.errorTextMaxLengthNewTitle', { lengthMaxLetters }),
          },
        }}
      />
    </Section>
  );
};

export default OneBoard;
