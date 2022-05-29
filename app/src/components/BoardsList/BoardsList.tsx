import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid } from '@mui/material';
import { TableChart as TableChartIcon, AddOutlined as AddOutlinedIcon } from '@mui/icons-material';
import BoardsListItem from './BoardsListItem';
import { IBoard, TSimpleFunction } from '$types/common';
import css from './BoardsList.module.scss';

interface IBoardsListProps {
  boards: Array<IBoard>;
  addCardHandler: TSimpleFunction;
  showSearchResults: boolean;
}
const BoardsList: FC<IBoardsListProps> = ({ boards, addCardHandler, showSearchResults }) => {
  const { t } = useTranslation();

  return (
    <Grid container component="ul" className={css.boardsList}>
      {boards.map((boardItem: IBoard) => (
        <BoardsListItem key={boardItem.id} {...boardItem} />
      ))}

      {!showSearchResults && (
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
      )}
    </Grid>
  );
};

export default BoardsList;
