import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateColumnMutation } from '$services/api';
import { Button, List, ListItem } from '@mui/material';
import ColumnsListItem from './ColumnsListItem';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { IColumn, TSimpleFunction } from '$types/common';
import css from './ColumnsList.module.scss';

interface IColumnsListProps {
  columns: Array<IColumn>;
  boardId: string;
  addCardHandler: TSimpleFunction;
}

const ColumnsList: FC<IColumnsListProps> = ({ columns, addCardHandler, boardId }) => {
  const { t } = useTranslation();
  const [updateColumn, { isLoading: isLoadingUpdateColumn }] = useUpdateColumnMutation();

  const dragEndListItemHandler = (result: DropResult) => {
    if (!result.destination) return;

    const newOrder = result.destination.index;
    const columnId = result.draggableId;
    const columnDrag = columns.filter((oneColumn) => oneColumn.id === columnId)[0];

    updateColumn({
      boardId,
      columnId: columnId,
      body: {
        title: columnDrag.title,
        order: newOrder,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={dragEndListItemHandler}>
      <Droppable droppableId="kanbanList" direction="horizontal">
        {(provided: DroppableProvided) => (
          <List
            component="ul"
            className={css.columnsList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns.map((columnItem: IColumn) => (
              <Draggable
                key={columnItem.id}
                draggableId={columnItem.id}
                index={columnItem.order}
                isDragDisabled={isLoadingUpdateColumn}
              >
                {(provided: DraggableProvided) => (
                  <ColumnsListItem {...columnItem} provided={provided} boardId={boardId} />
                )}
              </Draggable>
            ))}

            {provided.placeholder}

            <ListItem component="li" className={css.columnsList__itemButton}>
              <Button className={css.columnsList__item_addButton} onClick={addCardHandler}>
                + {t('Columns.addNewColumnButtonText')}
              </Button>
            </ListItem>
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColumnsList;
