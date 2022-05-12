import React, { FC } from 'react';
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
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import css from './BoardsList.module.scss';

export interface IBoard {
  id: string;
  title: string;
}

interface IBoardProps extends IBoard {
  index: number;
}

const BoardsListItem: FC<IBoardProps> = ({ id, title, index }) => {
  const { t } = useTranslation();
  const arrImages = [img1, img2, img3];
  const indexImg = index % arrImages.length;

  return (
    <Grid item component="li" className={css.boardsList__item} key={id} mb={5}>
      <CardContent className={css.boardsList__item_content}>
        <CardMedia
          className={css.boardsList__item_img}
          component="img"
          image={arrImages[indexImg]}
          alt="green iguana"
        />

        <Typography className={css.boardsList__item_title} gutterBottom variant="h5" component="h2">
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

export default BoardsListItem;