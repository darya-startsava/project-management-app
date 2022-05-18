import React, { FC } from 'react';
import { Button, ListItem, Typography } from '@mui/material';
import { ITask, TClickHandler } from '$types/common';
import css from './TasksList.module.scss';

const TasksListItem: FC<ITask> = ({ title, description }) => {
  const taskClickHandler: TClickHandler = () => {};

  return (
    <ListItem component="li" className={css.tasksList__item}>
      <Button className={css.tasksList__item_name} onClick={taskClickHandler}>
        <Typography
          className={css.tasksList__item_title}
          gutterBottom
          variant="inherit"
          component="h4"
        >
          {title}
        </Typography>
        <Typography
          className={css.tasksList__item_description}
          gutterBottom
          variant="inherit"
          component="p"
        >
          {`${description.slice(0, 40)}...`}
        </Typography>
      </Button>
    </ListItem>
  );
};

export default React.memo(TasksListItem);
