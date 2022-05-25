import React, { FC } from 'react';
import { List } from '@mui/material';
import TasksListItem from './TasksListItem';
import { ITask } from '$types/common';
import css from './TasksList.module.scss';

interface ITasksListProps {
  tasks: Array<ITask>;
}

const TasksList: FC<ITasksListProps> = ({ tasks }) => {
  return (
    <List component="ul" className={css.tasksList}>
      {tasks.map((tasksItem: ITask) => (
        <TasksListItem
          key={tasksItem.id}
          {...tasksItem}
          order={tasksItem.order}
          columnId={tasksItem.columnId}
          boardId={tasksItem.boardId}
        />
      ))}
    </List>
  );
};

export default TasksList;
