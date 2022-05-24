import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useUpdateBoardMutation, useDeleteBoardMutation } from '$services/api';
import { SubmitHandler } from 'react-hook-form';
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
import CloseButton from '$components/CloseButton';
import LightboxBoard from '$components/LightboxBoard';
import ConfirmWindow from '$components/ConfirmWindow';
import { randNumber } from '$utils/index';
import { ROUTES_PATHS } from '$settings/routing';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import { IBoard, IBoardCreateObj, IError } from '$types/common';
import css from './BoardsList.module.scss';

const BoardsListItem: FC<IBoard> = ({ id, title, description }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [isShowConfirmModalDelete, setIsShowConfirmModalDelete] = useState<boolean>(false);

  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);

  const [
    updateBoard,
    { isLoading: isUpdateBoard, error: errorUpdateBoard, isSuccess: isSuccessUpdateBoard },
  ] = useUpdateBoardMutation();

  useEffect(() => {
    if (errorUpdateBoard) {
      const errorMessage = t('Boards.errorUpdateBoardTitle', {
        ERROR_MESSAGE: (errorUpdateBoard as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorUpdateBoard, closeSnackbar, enqueueSnackbar, t]);

  useEffect(() => {
    if (isSuccessUpdateBoard) {
      enqueueSnackbar(t('Boards.successUpdateBoardTitle'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessUpdateBoard, closeSnackbar, enqueueSnackbar, t]);

  const updateBoardTitle: SubmitHandler<IBoardCreateObj> = (data) => {
    updateBoard({ body: data, id });
    setShowUpdateModal(false);
  };

  const [deleteBoard, { error: errorDeletingBoard, isSuccess: isSuccessDeletingBoard }] =
    useDeleteBoardMutation();

  useEffect(() => {
    if (errorDeletingBoard) {
      const errorMessage = t('Boards.errorDeletingBoard', {
        ERROR_MESSAGE: (errorDeletingBoard as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorDeletingBoard, closeSnackbar, enqueueSnackbar, t]);

  useEffect(() => {
    if (isSuccessDeletingBoard) {
      enqueueSnackbar(t('Boards.successDeletingBoard'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessDeletingBoard, closeSnackbar, enqueueSnackbar, t]);

  const removeHandler = async () => {
    deleteBoard({ id, title, description });
    setIsShowConfirmModalDelete(false);
  };

  return (
    <>
      <Grid item component="li" className={css.boardsList__item} key={id} mb={5}>
        <CardContent className={css.boardsList__item_content}>
          <CardMedia
            className={css.boardsList__item_img}
            component="img"
            image={arrImages[indexImg]}
            alt={t('Boards.boardsHeadItemImgAlt', { ITEM_NAME: title })}
          />

          <Typography
            className={css.boardsList__item_title}
            gutterBottom
            variant="inherit"
            component="h3"
          >
            {title}
          </Typography>

          <Typography
            className={css.boardsList__item_description}
            gutterBottom
            variant="inherit"
            component="p"
          >
            {description}
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
              aria-label={t('Boards.editBoardTitleLabel')}
              onClick={() => setShowUpdateModal(true)}
            >
              <HistoryEduIcon color="inherit" />
            </IconButton>

            <IconButton className={css.boardsList__item_button} size="small">
              <StarOutlineIcon color="inherit" aria-label={t('Boards.addBoardToFavoritesLabel')} />
            </IconButton>

            <IconButton
              className={css.boardsList__item_button}
              size="small"
              onClick={() => setIsShowConfirmModalDelete(true)}
              aria-label={t('Boards.deleteBoardLabel')}
            >
              <DeleteOutlineIcon color="inherit" />
            </IconButton>
          </Stack>
        </CardActions>
      </Grid>

      <ConfirmWindow
        isShow={isShowConfirmModalDelete}
        title={t('Boards.confirmDeleteBoardModalTitle')}
        disAgreeHandler={() => setIsShowConfirmModalDelete(false)}
        agreeHandler={removeHandler}
      />

      <LightboxBoard
        showModal={showUpdateModal}
        isLoading={isUpdateBoard}
        isUpdate={true}
        closeModalHandler={() => setShowUpdateModal(false)}
        submitCB={updateBoardTitle}
        modalTitle={t('Boards.updateModalTitle')}
        submitButtonText={t('Boards.updateModalSubmitButton')}
        formState={{ title, description }}
      />
    </>
  );
};

export default React.memo(BoardsListItem);
