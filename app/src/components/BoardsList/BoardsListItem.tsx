import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { randNumber } from '$utils/index';
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import { IBoard } from '$types/common';
import css from './BoardsList.module.scss';

const BoardsListItem: FC<IBoard> = ({ id, title }) => {
  const { t } = useTranslation();
  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);

  return (
    <Grid item component="li" className={css.boardsList__item} key={id} mb={5}>
      <CardContent className={css.boardsList__item_content}>
        <CardMedia
          className={css.boardsList__item_img}
          component="img"
          image={arrImages[indexImg]}
          alt={t('Boards.boardsHeadItemImgAlt')}
        />

        <Typography
          className={css.boardsList__item_title}
          gutterBottom
          variant="inherit"
          component="h2"
        >
          {title}
        </Typography>
      </CardContent>

      <CardActions className={css.boardsList__item_actionsWrapper}>
        <Link className={css.boardsList__item_link} to={`${ROUTES_PATHS.boards}/${id}`}>
          {t('Boards.boardsLinkItemText')}
        </Link>

        <Stack direction="row">
          <IconButton className={css.boardsList__item_button} size="small">
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
  );
};

export default React.memo(BoardsListItem);
