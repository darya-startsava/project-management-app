import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, List, ListItem } from '@mui/material';
import TasksListItem from './TasksListItem';
import { ITask, TSimpleFunction } from '$types/common';
import css from './TasksList.module.scss';

interface ITasksListProps {
  tasks: Array<ITask>;
  addTaskHandler?: TSimpleFunction;
}

const TasksList: FC<ITasksListProps> = ({ tasks, addTaskHandler }) => {
  const { t } = useTranslation();

  return (
    <List component="ul" className={css.tasksList}>
      {tasks.map((tasksItem: ITask) => (
        <TasksListItem key={tasksItem.id} {...tasksItem} />
      ))}

      <ListItem component="li" className={css.tasksList__itemButton}>
        <Button className={css.tasksList__item_addButton} onClick={addTaskHandler}>
          + {t('Tasks.addNewTaskButtonText')}
        </Button>
      </ListItem>
    </List>
  );
};

export default TasksList;
