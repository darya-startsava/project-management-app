import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useDeleteTaskMutation, useGetAllUsersQuery } from '$services/api';
import { IconButton, ListItem, Stack, Typography } from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  HistoryEdu as HistoryEduIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import ConfirmWindow from '$components/ConfirmWindow';
import CloseButton from '$components/CloseButton';
import { randNumber } from '$utils/index';
import {
  messageErrorOptions,
  messageSuccessOptions,
  SIZE_DESCRIPTION_TASK_IN_COLUMN,
} from '$settings/index';
import { IError, ITask } from '$types/common';
import css from './TasksList.module.scss';

const TasksListItem: FC<ITask> = ({ title, description, userId, id, boardId, columnId }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { data: users = [], error: errorGetUsers } = useGetAllUsersQuery();
  const unknownUser = t('Tasks.unknownUser');
  const randomColorPart1 = useMemo(() => randNumber(255, 0), []);
  const randomColorPart2 = useMemo(() => randNumber(255, 0), []);
  const randomColorPart3 = useMemo(() => randNumber(255, 0), []);
  const [isShowConfirmModalDelete, setIsShowConfirmModalDelete] = useState<boolean>(false);

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

  const [deleteTask, { error: errorDeleteTask, isSuccess: isSuccessDeleteTask }] =
    useDeleteTaskMutation();

  useEffect(() => {
    if (errorDeleteTask) {
      const errorMessage = t('Tasks.errorDeleteTask', {
        ERROR_MESSAGE: (errorDeleteTask as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorDeleteTask, closeSnackbar, enqueueSnackbar, t]);

  useEffect(() => {
    if (isSuccessDeleteTask) {
      enqueueSnackbar(t('Tasks.successDeleteTask'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessDeleteTask, closeSnackbar, enqueueSnackbar, t]);

  const removeHandler = async () => {
    deleteTask({ boardId, columnId, taskId: id });
    setIsShowConfirmModalDelete(false);
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

        <IconButton
          className={css.tasksList__item_button}
          size="small"
          onClick={() => setIsShowConfirmModalDelete(true)}
          aria-label={t('Tasks.deleteTaskLabel')}
        >
          <DeleteOutlineIcon color="inherit" />
        </IconButton>
      </Stack>
      <ConfirmWindow
        isShow={isShowConfirmModalDelete}
        title={t('Tasks.confirmDeleteTaskModalTitle')}
        disAgreeHandler={() => setIsShowConfirmModalDelete(false)}
        agreeHandler={removeHandler}
      />
    </ListItem>
  );
};

export default React.memo(TasksListItem);
