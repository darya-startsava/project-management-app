import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, List, ListItem } from '@mui/material';
import ColumnsListItem from './ColumnsListItem';
import { IColumn, TSimpleFunction } from '$types/common';
import css from './ColumnsList.module.scss';

interface IColumnsListProps {
  columns: Array<IColumn>;
  boardId: string;
  addCardHandler: TSimpleFunction;
}

const ColumnsList: FC<IColumnsListProps> = ({ columns, addCardHandler, boardId }) => {
  const { t } = useTranslation();

  return (
    <List component="ul" className={css.columnsList}>
      {columns.map((columnItem: IColumn) => (
        <ColumnsListItem
          key={columnItem.id}
          {...columnItem}
          boardId={boardId}
          order={columnItem.order}
        />
      ))}

      <ListItem component="li" className={css.columnsList__itemButton}>
        <Button className={css.columnsList__item_addButton} onClick={addCardHandler}>
          + {t('Columns.addNewColumnButtonText')}
        </Button>
      </ListItem>
    </List>
  );
};

export default ColumnsList;
