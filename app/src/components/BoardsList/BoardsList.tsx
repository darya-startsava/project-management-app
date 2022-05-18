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
  boards: Array<IBoard>;
  addCardHandler: TSimpleFunction;
}
const BoardsList: FC<IBoardsListProps> = ({ boards, addCardHandler }) => {
  const { t } = useTranslation();
  console.log(boards);

  return (
    <Grid container component="ul" className={css.boardsList}>
      {boards.map((boardItem: IBoard) => (
        <BoardsListItem key={boardItem.id} {...boardItem} />
      ))}

      <Grid item component="li" className={css.boardsList__item} mb={5}>
        <Button className={css.boardsList__item_addButton} onClick={addCardHandler}>
          <Box className={css.boardsList__item_addButtonText} component="span">
            {t('Boards.addNewBoardButtonText')}
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
