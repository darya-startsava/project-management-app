import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { List } from '@mui/material';
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
import TasksListItem from './TasksListItem';
import { IError, ITask } from '$types/common';
import css from './TasksList.module.scss';
import { useUpdateDragAndDropTaskMutation } from '$services/api';

interface ITasksListProps {
  tasks: Array<ITask>;
}

const TasksList: FC<ITasksListProps> = ({ tasks }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [updateTask, { isLoading: isLoadingUpdateTask, error: errorChangeOrderTask }] =
    useUpdateDragAndDropTaskMutation();

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

    const newOrder = result.destination.index;
    const taskId = result.draggableId;
    const taskDrag = tasks.filter((oneTask) => oneTask.id === taskId)[0];

    if (newOrder === result.source.index) return;

    updateTask({
      body: {
        title: taskDrag.title,
        order: newOrder,
        description: taskDrag.description,
        userId: taskDrag.userId,
        boardId: taskDrag.boardId,
        columnId: taskDrag.columnId,
      },
      boardId: taskDrag.boardId,
      columnId: taskDrag.columnId,
      taskId: taskDrag.id,
    });
  };

  return (
    // <List component="ul" className={css.tasksList}>
    //   {tasks.map((tasksItem: ITask) => (
    //     <TasksListItem
    //       key={tasksItem.id}
    //       {...tasksItem}
    //       order={tasksItem.order}
    //       columnId={tasksItem.columnId}
    //       boardId={tasksItem.boardId}
    //     />
    //   ))}
    // </List>
    <DragDropContext onDragEnd={dragEndListItemHandler}>
      <Droppable droppableId="taskInColumn" direction="vertical">
        {(droppableTaskProvided: DroppableProvided) => (
          <List
            component="ul"
            className={css.tasksList}
            ref={droppableTaskProvided.innerRef}
            {...droppableTaskProvided.droppableProps}
          >
            {tasks.map((tasksItem: ITask) => (
              <Draggable
                key={tasksItem.id}
                draggableId={tasksItem.id}
                index={tasksItem.order}
                isDragDisabled={isLoadingUpdateTask}
              >
                {(draggableTaskProvided: DraggableProvided) => (
                  <TasksListItem {...tasksItem} draggableTaskProvided={draggableTaskProvided} />
                )}
              </Draggable>
            ))}
            {droppableTaskProvided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TasksList;
