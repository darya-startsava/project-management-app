import React, { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import { INewNameFormState, TCreateElement } from '$types/common';
import css from './OneBoard.module.scss';

const OneBoard: FC = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);
  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);
  const { data: columns = [] } = useGetAllColumnsQuery(params.id || '');
  const [addColumn, { isLoading: isAddingColumn }] = useAddColumnMutation();

  const addNewBoard: TCreateElement = async (data: INewNameFormState) => {
    try {
      await addColumn({
        body: { title: data.newTitle, order: columns.length },
        id: params.id || '',
      }).unwrap();
    } catch (_) {
      return enqueueSnackbar(t('Columns.errorColumnCreate'), {
        variant: 'error',
        autoHideDuration: 5000,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }

    enqueueSnackbar(t('Columns.successColumnCreate'), {
      variant: 'success',
      autoHideDuration: 5000,
      action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
    });
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
        {t('Columns.columnsTitle')} {params.id}
        <TableChartIcon />
      </Typography>

      <ColumnsListItem
        columns={columns}
        addCardHandler={() => {
          setShowModal(true);
        }}
      />

      <LightboxForCreateItem
        modalTitle={t('Columns.columnsModalTitle')}
        showModal={showModal}
        changeShowModal={setShowModal}
        submitCB={addNewBoard}
        isLoading={isAddingColumn}
        placeholderText={t('Columns.columnsModalTextareaPlaceholder')}
        rules={{
          required: true,
          minLength: {
            value: 5,
            message: t('Columns.errorTextMinLengthNewTitle'),
          },
          maxLength: {
            value: 20,
            message: t('Columns.errorTextMaxLengthNewTitle'),
          },
        }}
      />
    </Section>
  );
};

export default OneBoard;
