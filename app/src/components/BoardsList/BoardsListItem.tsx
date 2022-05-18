import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  HistoryEdu as HistoryEduIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import { ROUTES_PATHS } from '$settings/routing';
import { randNumber } from '$utils/index';
import CloseButton from '$components/CloseButton';
import { CLOSE_SNACKBAR_TIME } from '$settings/index';
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import { IBoard, TUpdateElement, IUpdateTitleFormState, INewNameFormState } from '$types/common';
import css from './BoardsList.module.scss';
import LightboxForUpdateItem from '$components/LightboxForUpdateItem';
import { useUpdateBoardMutation } from '$services/api';
import Lightbox from '$components/Lightbox';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const BoardsListItem: FC<IBoard> = ({ id, title }) => {
  const { t } = useTranslation();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const lengthMinLetters = 5;
  const lengthMaxLetters = 60;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);

  const [
    updateBoard,
    { isLoading: isUpdateBoard, error: errorUpdateBoard, isSuccess: isSuccessUpdateBoard },
  ] = useUpdateBoardMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = useForm<INewNameFormState>({
    defaultValues: {
      newTitle: title,
    },
  });

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

  const updateBoardTitle: SubmitHandler<INewNameFormState> = (data: IUpdateTitleFormState) => {
    updateBoard({ id: data.cardId, title: data.cardTitle });
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

      {/* <LightboxForUpdateItem
        modalTitle={t('Boards.updateModalTitle')}
        showUpdateModal={showUpdateModal}
        changeShowUpdateModal={setShowUpdateModal}
        submitCB={updateBoardTitle}
        isLoading={isUpdateBoard}
        localizationKeyTextareaErrorText="Boards.errorTextarea"
        rules={{
          required: true,
          minLength: {
            value: lengthMinLetters,
            message: t('Boards.errorTextMinLengthNewTitle', { lengthMinLetters }),
          },
          maxLength: {
            value: lengthMaxLetters,
            message: t('Boards.errorTextMaxLengthNewTitle', { lengthMaxLetters }),
          },
        }}
      /> */}
      <Lightbox
        showModal={showUpdateModal}
        closeModalFunction={() => {
          setShowUpdateModal(false);
        }}
        modalTitle="Change item"
      >
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(updateBoardTitle)}
          noValidate
        >
          <Controller
            control={control}
            name="newTitle"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextareaAutosize
                  value={value}
                  placeholder={'title'}
                  area-label=""
                  onChange={onChange}
                />

                {error?.message && (
                  <Typography
                    variant="inherit"
                    component="p"
                    className={css.modalAddForm_errorText}
                  >
                    Error
                  </Typography>
                )}
              </>
            )}
          />

          <InputBase
            type="submit"
            disableInjectingGlobalStyles={true}
            // disabled={isLoading || !isDirty}
            value="Change"
          />
        </Box>
      </Lightbox>
    </>
  );
};

export default React.memo(BoardsListItem);
