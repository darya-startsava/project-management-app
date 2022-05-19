import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  HistoryEdu as HistoryEduIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import { ROUTES_PATHS } from '$settings/routing';
import {
  CLOSE_SNACKBAR_TIME,
  BOARDS_LENGTH_MIN_LETTERS,
  BOARDS_LENGTH_MAX_LETTERS,
} from '$settings/index';
import { randNumber } from '$utils/index';
import CloseButton from '$components/CloseButton';
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import { IBoard, IUpdateTitleFormState } from '$types/common';
import css from './BoardsList.module.scss';
import LightboxForUpdateItem from '$components/LightboxForUpdateItem';
import { useUpdateBoardMutation } from '$services/api';
import { SubmitHandler } from 'react-hook-form';

const BoardsListItem: FC<IBoard> = ({ id, title }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);

  const [
    updateBoard,
    { isLoading: isUpdateBoard, error: errorUpdateBoard, isSuccess: isSuccessUpdateBoard },
  ] = useUpdateBoardMutation();

  useEffect(() => {
    if (errorUpdateBoard) {
      const errorMessage = t('Boards.errorUpdateBoardTitle', { errorText: errorUpdateBoard });
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, errorUpdateBoard, t]);

  useEffect(() => {
    if (isSuccessUpdateBoard) {
      enqueueSnackbar(t('Boards.successUpdateBoardTitle'), {
        variant: 'success',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, isSuccessUpdateBoard, t]);

  useEffect(() => {}, [t, enqueueSnackbar, closeSnackbar]);

  const updateBoardTitle: SubmitHandler<IUpdateTitleFormState> = (data) => {
    updateBoard({ body: data, id });
    setShowUpdateModal(false);
  };

  return (
    <>
      <Grid item component="li" className={css.boardsList__item} key={id} mb={5}>
        <CardContent className={css.boardsList__item_content}>
          <CardMedia
            className={css.boardsList__item_img}
            component="img"
            image={arrImages[indexImg]}
            alt={t('Boards.boardsHeadItemImgAlt', { itemName: title })}
          />

          <Typography
            className={css.boardsList__item_title}
            gutterBottom
            variant="inherit"
            component="h3"
          >
            {title}
          </Typography>
        </CardContent>

        <CardActions className={css.boardsList__item_actionsWrapper}>
          <Link
            className={css.boardsList__item_link}
            to={`${ROUTES_PATHS.boards}/${id}`}
            state={title}
          >
            {t('Boards.boardsLinkItemText')}
          </Link>

          <Stack direction="row">
            <IconButton
              className={css.boardsList__item_button}
              size="small"
              onClick={() => setShowUpdateModal(true)}
            >
              <HistoryEduIcon color="inherit" />
            </IconButton>

            <IconButton className={css.boardsList__item_button} size="small">
              <StarOutlineIcon color="inherit" />
            </IconButton>

            <IconButton className={css.boardsList__item_button} size="small">
              <DeleteOutlineIcon color="inherit" />
            </IconButton>
          </Stack>
        </CardActions>
      </Grid>

      <LightboxForUpdateItem
        modalTitle={t('Boards.updateModalTitle')}
        showUpdateModal={showUpdateModal}
        changeShowUpdateModal={setShowUpdateModal}
        submitCB={updateBoardTitle}
        isLoading={isUpdateBoard}
        placeholderText={title}
        localizationKeyTextareaErrorText="Boards.errorTextarea"
        rules={{
          required: true,
          minLength: {
            value: BOARDS_LENGTH_MIN_LETTERS,
            message: t('Boards.errorTextMinLengthNewTitle', { BOARDS_LENGTH_MIN_LETTERS }),
          },
          maxLength: {
            value: BOARDS_LENGTH_MAX_LETTERS,
            message: t('Boards.errorTextMaxLengthNewTitle', { BOARDS_LENGTH_MAX_LETTERS }),
          },
        }}
      />
    </>
  );
};

export default React.memo(BoardsListItem);
