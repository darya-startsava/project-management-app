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
import Spinner from '$components/Spinner';
import CloseButton from '$components/CloseButton';
import { messageErrorOptions } from '$settings/index';
import { IColumn, IError, TSimpleFunction } from '$types/common';
import css from './ColumnsList.module.scss';
import classNames from 'classnames';

interface IColumnsListProps {
  columns: Array<IColumn>;
  boardId: string;
  addCardHandler: TSimpleFunction;
  showSpinnerEnd?: boolean;
}

const ColumnsList: FC<IColumnsListProps> = ({
  columns,
  addCardHandler,
  boardId,
  showSpinnerEnd = false,
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [updateColumn, { isLoading: isLoadingUpdateColumn, error: errorChangeOrderColumn }] =
    useUpdateDragAndDropColumnMutation();

  // show change column order error message
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
        {(droppableColumnProvided: DroppableProvided) => (
          <List
            component="ul"
            className={css.columnsList}
            ref={droppableColumnProvided.innerRef}
            {...droppableColumnProvided.droppableProps}
          >
            {columns.map((columnItem: IColumn) => (
              <Draggable
                key={columnItem.id}
                draggableId={columnItem.id}
                index={columnItem.order}
                isDragDisabled={isLoadingUpdateColumn}
              >
                {(draggableColumnProvided: DraggableProvided) => (
                  <ColumnsListItem
                    {...columnItem}
                    draggableColumnProvided={draggableColumnProvided}
                    boardId={boardId}
                  />
                )}
              </Draggable>
            ))}

            {droppableColumnProvided.placeholder}

            <>
              {showSpinnerEnd && (
                <ListItem component="li" className={css.columnsList__itemButton}>
                  <Spinner size={50} />
                </ListItem>
              )}
            </>

            <ListItem component="li" className={css.columnsList__itemButton}>
              <Button
                className={classNames(css.columnsList__item_addButton, {
                  [css.disabled]: showSpinnerEnd,
                })}
                onClick={addCardHandler}
                disabled={showSpinnerEnd}
              >
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
