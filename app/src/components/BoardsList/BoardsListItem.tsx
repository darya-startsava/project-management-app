import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useUpdateBoardMutation } from '$services/api';
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
import { randNumber } from '$utils/index';
import { ROUTES_PATHS } from '$settings/routing';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import { IBoard, IBoardCreateObj } from '$types/common';
import css from './BoardsList.module.scss';
import { useDeleteBoardMutation } from '$services/api';

const BoardsListItem: FC<IBoard> = ({ id, title }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);
  const [deleteBoard] = useDeleteBoardMutation();

  async function deletingBoard({ id, title }: IBoard) {
    await deleteBoard({ id, title }).unwrap();
  }

  const [
    updateBoard,
    { isLoading: isUpdateBoard, error: errorUpdateBoard, isSuccess: isSuccessUpdateBoard },
  ] = useUpdateBoardMutation();

  useEffect(() => {
    if (errorUpdateBoard) {
      const errorMessage = t('Boards.errorUpdateBoardTitle', { ERROR_MESSAGE: errorUpdateBoard });
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
              onClick={async () => await deletingBoard({ id, title })}
              aria-label={t('Boards.deleteBoardLabel')}
            >
              <DeleteOutlineIcon color="inherit" />
            </IconButton>
          </Stack>
        </CardActions>
      </Grid>

      <LightboxBoard
        showModal={showUpdateModal}
        isLoading={isUpdateBoard}
        isUpdate={true}
        closeModalHandler={() => setShowUpdateModal(false)}
        submitCB={updateBoardTitle}
        modalTitle={t('Boards.updateModalTitle')}
        submitButtonText={t('Boards.updateModalSubmitButton')}
        formState={{ title: title }}
      />
    </>
  );
};

export default React.memo(BoardsListItem);
