import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BoardsListItem from './BoardsListItem';
import css from './BoardsList.module.scss';
import { Box } from '@mui/system';

export interface IBoard {
  id: string;
  title: string;
}

const BoardsList: FC = () => {
  const { t } = useTranslation();
  const listBoards: Array<IBoard> = [
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
      title: 'My Board 1',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d2',
      title: 'My Board 2',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d3',
      title: 'My Board 3',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d1',
      title: 'My Board 4',
    },
    {
      id: '9a111e19-2412-43e1-b8c4-13776842b8d1',
      title: 'My Board 5',
    },
  ];

  const addCardHandler = (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault();
  };

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
