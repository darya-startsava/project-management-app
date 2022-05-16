import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, List, ListItem } from '@mui/material';
import ColumnsListItem from './ColumnsListItem';
import { IColumn, TSimpleFunction } from '$types/common';
import css from './ColumnsList.module.scss';

interface IColumnsListProps {
  columns: Array<IColumn>;
  addCardHandler: TSimpleFunction;
}

const ColumnsList: FC<IColumnsListProps> = ({ columns, addCardHandler }) => {
  const { t } = useTranslation();

  return (
    <List component="ul" className={css.columnsList}>
      {columns.map((columnItem: IColumn) => (
        <ColumnsListItem key={columnItem.id} {...columnItem} />
      ))}

      <ListItem component="li" className={css.columnsList__itemButton}>
        <Button className={css.columnsList__item_addButton} onClick={addCardHandler}>
          + {t('Columns.addButtonText')}
        </Button>
      </ListItem>
    </List>
  );
};

export default ColumnsList;