import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateDragAndDropColumnMutation } from '$services/api';
import { useSnackbar } from 'notistack';
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
import CloseButton from '$components/CloseButton';
import { messageErrorOptions } from '$settings/index';
import { IColumn, IError, TSimpleFunction } from '$types/common';
import css from './ColumnsList.module.scss';

interface IColumnsListProps {
  columns: Array<IColumn>;
  boardId: string;
  addCardHandler: TSimpleFunction;
}

const ColumnsList: FC<IColumnsListProps> = ({ columns, addCardHandler, boardId }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [updateColumn, { isLoading: isLoadingUpdateColumn, error: errorChangeOrderColumn }] =
    useUpdateDragAndDropColumnMutation();

  useEffect(() => {
    if (errorChangeOrderColumn) {
      const errorMessage = t('Columns.dragDropError', {
        ERROR_MESSAGE: (errorChangeOrderColumn as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorChangeOrderColumn, t, enqueueSnackbar, closeSnackbar]);

  const dragEndListItemHandler = (result: DropResult) => {
    if (!result.destination) return;

    const newOrder = result.destination.index;
    const columnId = result.draggableId;
    const columnDrag = columns.filter((oneColumn) => oneColumn.id === columnId)[0];

    if (newOrder === result.source.index) return;

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
                  <ColumnsListItem {...columnItem} draggableProvided={provided} boardId={boardId} />
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
