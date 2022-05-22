import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery } from '$services/api';
import { IconButton, ListItem, Stack, Typography } from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  HistoryEdu as HistoryEduIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import { randNumber } from '$utils/index';
import { SIZE_DESCRIPTION_TASK_IN_COLUMN } from '$settings/index';
import { ITask } from '$types/common';
import css from './TasksList.module.scss';

const TasksListItem: FC<ITask> = ({ title, description, userId }) => {
  const { t } = useTranslation();
  const { data: users = [], error: errorGetUsers } = useGetAllUsersQuery();
  const unknownUser = t('Tasks.unknownUser');
  const randomColorPart1 = useMemo(() => randNumber(255, 0), []);
  const randomColorPart2 = useMemo(() => randNumber(255, 0), []);
  const randomColorPart3 = useMemo(() => randNumber(255, 0), []);

  const getDescription = () => {
    if (description.length > SIZE_DESCRIPTION_TASK_IN_COLUMN) {
      return description.slice(0, SIZE_DESCRIPTION_TASK_IN_COLUMN) + '...';
    }

    return description;
  };

  const getUser = () => {
    const needUserData = users.filter((user) => userId === user.id)[0];
    if (!needUserData) {
      return unknownUser;
    }
    return t('Tasks.responsible', { USER: needUserData.login });
  };

  return (
    <ListItem
      component="li"
      className={css.tasksList__item}
      style={{
        backgroundColor: `rgb(${randomColorPart1}, ${randomColorPart2}, ${randomColorPart3})`,
      }}
    >
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
        {getDescription()}
      </Typography>

      <Typography className={css.tasksList__item_user} gutterBottom variant="inherit" component="p">
        {errorGetUsers ? unknownUser : getUser()}
      </Typography>

      <Stack direction="row" className={css.tasksList__item_buttonsWrapper}>
        <IconButton className={css.tasksList__item_button} size="small">
          <HistoryEduIcon color="inherit" />
        </IconButton>

        <IconButton className={css.tasksList__item_button} size="small">
          <StarOutlineIcon color="inherit" />
        </IconButton>

        <IconButton className={css.tasksList__item_button} size="small">
          <DeleteOutlineIcon color="inherit" />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default React.memo(TasksListItem);
