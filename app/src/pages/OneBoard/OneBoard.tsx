import React, { FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAddColumnMutation, useGetAllColumnsQuery } from '$services/api';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';
import { TableChart as TableChartIcon } from '@mui/icons-material';
import Section from '$components/Section';
import ColumnsListItem from '$components/ColumsList';
import CloseButton from '$components/CloseButton';
import LightboxColumn from '$components/LightboxColumn';
import { getSortColumns, importAllFiles, randNumber } from '$utils/index';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import { IColumnCreateObj, IError, TCreateElement } from '$types/common';
import css from './OneBoard.module.scss';

const OneBoard: FC = () => {
  const params = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModalAddColumn, setShowModalAddColumn] = useState<boolean>(false);
  const arrImages = importAllFiles(require.context('$assets/images/backgrounds', false, /\.jpg$/));
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);
  const { data: columns = [], error: errorGetColumns } = useGetAllColumnsQuery(params.id || '');
  const [
    addColumn,
    { isLoading: isAddingColumn, error: errorAddColumn, isSuccess: isSuccessAddColumn },
  ] = useAddColumnMutation();

  useEffect(() => {
    document.body.style.setProperty('--screenOverflowY', 'hidden');

    return () => document.body.style.setProperty('--screenOverflowY', 'auto');
  }, []);

  useEffect(() => {
    if (errorGetColumns) {
      const errorMessage = t('Columns.errorGetColumns', {
        ERROR_MESSAGE: (errorGetColumns as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorGetColumns, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (isSuccessAddColumn) {
      enqueueSnackbar(t('Columns.successCreateColumn'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessAddColumn, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (errorAddColumn) {
      const errorMessage = t('Columns.errorCreateColumn', {
        ERROR_MESSAGE: (errorAddColumn as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorAddColumn, t, enqueueSnackbar, closeSnackbar]);

  const addNewColumn: TCreateElement<IColumnCreateObj> = (data: IColumnCreateObj) => {
    addColumn({
      body: data,
      id: params.id || '',
    });
    setShowModalAddColumn(false);
  };

  return (
    <Section className={css.one_board} pageAllSpace={true}>
      <Typography className={css.one_board__title} component="h2" variant="inherit" mb={5}>
        <Box
          className={css.one_board__title_img}
          component="span"
          style={{
            backgroundImage: `url(${arrImages[indexImg]})`,
          }}
        />
        <Box component="span">{t('Columns.pageTitle', { BOARD_NAME: location.state })}</Box>
        <TableChartIcon />
      </Typography>

      <ColumnsListItem
        columns={getSortColumns(columns)}
        boardId={params.id || ''}
        addCardHandler={() => {
          setShowModalAddColumn(true);
        }}
      />

      <LightboxColumn
        showModal={showModalAddColumn}
        isLoading={isAddingColumn}
        isUpdate={false}
        closeModalHandler={() => setShowModalAddColumn(false)}
        submitCB={addNewColumn}
        modalTitle={t('Columns.createModalTitle')}
        submitButtonText={t('Columns.submitButtonTextAddColumnForm')}
        formState={{ title: '' }}
      />
    </Section>
  );
};

export default OneBoard;
