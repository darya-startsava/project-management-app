import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BoardsListItem from './BoardsListItem';
import { IBoard, TSimpleFunction } from '$types/common';
import css from './BoardsList.module.scss';

interface IBoardsListProps {
  listBoards: Array<IBoard>;
  addCardHandler: TSimpleFunction;
}
const BoardsList: FC<IBoardsListProps> = ({ listBoards, addCardHandler }) => {
  const { t } = useTranslation();

  return (
    <Grid container component="ul" className={css.boardsList}>
      {listBoards.map((boardItem: IBoard, index) => (
        <BoardsListItem key={boardItem.id} {...boardItem} index={index} />
      ))}

      <Grid item component="li" className={css.boardsList__item} mb={5}>
        <Button className={css.boardsList__item_addButton} onClick={addCardHandler}>
          <Box className={css.boardsList__item_addButtonText} component="span">
            {t('Boards.boardsAddButtonText')}
          </Box>
          <Box className={css.boardsList__item_buttonIconWrapper} component="span">
            <TableChartIcon />
            <AddOutlinedIcon />
          </Box>
        </Button>
      </Grid>
    </Grid>
  );
};

export default BoardsList;
