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
import LightboxForCreateItem from '$components/LightboxForCreateItem';
import { randNumber } from '$utils/index';
import {
  CLOSE_SNACKBAR_TIME,
  COLUMNS_LENGTH_MIN_LETTERS,
  COLUMNS_LENGTH_MAX_LETTERS,
} from '$settings/index';
import { IError, INewNameFormState, TCreateElement } from '$types/common';
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import css from './OneBoard.module.scss';

const OneBoard: FC = () => {
  const params = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModalAddColumn, setShowModalAddColumn] = useState<boolean>(false);
  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);
  const { data: columns = [], error: errorGetColumns } = useGetAllColumnsQuery(params.id || '');
  const [addColumn, { isLoading: isAddingColumn, error, isSuccess: isSuccessAddColumn }] =
    useAddColumnMutation();

  useEffect(() => {
    if (errorGetColumns) {
      const errorMessage = t('Columns.errorGetColumns', {
        errorText: (errorGetColumns as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorGetColumns, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (isSuccessAddColumn) {
      enqueueSnackbar(t('Columns.successCreate'), {
        variant: 'success',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessAddColumn, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (error) {
      const errorMessage = t('Columns.errorCreate', {
        errorText: error,
      });
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [error, t, enqueueSnackbar, closeSnackbar]);

  const addNewColumn: TCreateElement<INewNameFormState> = (data: INewNameFormState) => {
    addColumn({
      body: { title: data.newTitle, order: columns.length },
      id: params.id || '',
    });
    setShowModalAddColumn(false);
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
        />
        <Box component="span">{t('Columns.pageTitle', { boardName: location.state })}</Box>
        <TableChartIcon />
      </Typography>

      <ColumnsListItem
        columns={columns}
        boardId={params.id || ''}
        addCardHandler={() => {
          setShowModalAddColumn(true);
        }}
      />

      <LightboxForCreateItem
        modalTitle={t('Columns.createModalTitle')}
        showModal={showModalAddColumn}
        changeShowModal={setShowModalAddColumn}
        submitCB={addNewColumn}
        isLoading={isAddingColumn}
        placeholderText={t('Columns.addModalTextareaPlaceholder')}
        localizationKeyTextareaErrorText="Columns.errorTextarea"
        submitButtonText={t('Columns.submitButtonTextInFormNewColumn')}
        rules={{
          required: true,
          minLength: {
            value: 5,
            message: t('Columns.errorTextMinLengthNewTitle', { COLUMNS_LENGTH_MIN_LETTERS }),
          },
          maxLength: {
            value: 20,
            message: t('Columns.errorTextMaxLengthNewTitle', { COLUMNS_LENGTH_MAX_LETTERS }),
          },
        }}
      />
    </Section>
  );
};

export default OneBoard;
