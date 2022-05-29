import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  api,
  useUpdateDragAndDropColumnMutation,
  useUpdateDragAndDropTaskMutation,
} from '$services/api';
import { useAppSelector } from '$store/store';
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
import { IColumn, IError, ITask, TSimpleFunction } from '$types/common';
import css from './ColumnsList.module.scss';

interface IColumnsListProps {
  columns: Array<IColumn>;
  boardId: string;
  addCardHandler: TSimpleFunction;
}

const ColumnsList: FC<IColumnsListProps> = ({ columns, addCardHandler, boardId }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let allTasksArray: ITask[] = [];
  const columnsId: string[] = columns.map((item) => item.id);
  const state = useAppSelector((state) => state);

  columnsId.forEach((columnId) => {
    const result = api.endpoints.getAllTasks.select({ boardId, columnId })(state);
    if (result.isSuccess) {
      result.data.forEach((data) => (allTasksArray = [...allTasksArray, data]));
    }
  });

  const [updateColumn, { isLoading: isLoadingUpdateColumn, error: errorChangeOrderColumn }] =
    useUpdateDragAndDropColumnMutation();

  const [updateTask, { error: errorChangeOrderTask }] = useUpdateDragAndDropTaskMutation();

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

  useEffect(() => {
    if (errorChangeOrderTask) {
      const errorMessage = t('Tasks.dragDropError', {
        ERROR_MESSAGE: (errorChangeOrderTask as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorChangeOrderTask, t, enqueueSnackbar, closeSnackbar]);

  const dragEndListItemHandler = (result: DropResult) => {
    if (!result.destination) return;
    if (result.type === 'COLUMN') {
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
    } else if (result.type === 'TASK') {
      let newOrder = result.destination.index;
      if (newOrder < 1) {
        newOrder = 1;
      }
      const newColumn = result.destination.droppableId;
      const taskId = result.draggableId;
      const taskDrag = allTasksArray.filter((oneTask) => oneTask.id === taskId)[0];

      updateTask({
        body: {
          title: taskDrag.title,
          order: newOrder,
          description: taskDrag.description,
          userId: taskDrag.userId,
          boardId: taskDrag.boardId,
          columnId: newColumn,
        },
        boardId: taskDrag.boardId,
        columnId: taskDrag.columnId,
        taskId: taskDrag.id,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={dragEndListItemHandler}>
      <Droppable droppableId="kanbanList" type="COLUMN" direction="horizontal">
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
