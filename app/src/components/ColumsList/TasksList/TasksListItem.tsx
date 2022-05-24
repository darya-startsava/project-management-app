import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery, useUpdateTaskMutation } from '$services/api';
import { useSnackbar } from 'notistack';
import { SubmitHandler } from 'react-hook-form';
import { IconButton, ListItem, Stack, Typography } from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  HistoryEdu as HistoryEduIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import CloseButton from '$components/CloseButton';
import LightboxUpdateTask from '$components/LightboxUpdateTask';
import { randNumber } from '$utils/index';
import { SIZE_DESCRIPTION_TASK_IN_COLUMN } from '$settings/index';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import { IError, ITask, ITaskUpdate } from '$types/common';
import css from './TasksList.module.scss';

// interface TasksListItemProps extends ITask {
//   order: number;
// }

const TasksListItem: FC<ITask> = ({
  title,
  order,
  description,
  userId,
  // boardId,
  // columnId,
  // taskId,
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { data: users = [], error: errorGetUsers } = useGetAllUsersQuery();
  const unknownUser = t('Tasks.unknownUser');
  const randomColorPart1 = useMemo(() => randNumber(255, 0), []);
  const randomColorPart2 = useMemo(() => randNumber(255, 0), []);
  const randomColorPart3 = useMemo(() => randNumber(255, 0), []);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const [
    updateTask,
    { isLoading: isUpdateTask, error: errorUpdateTask, isSuccess: isSuccessUpdateTask },
  ] = useUpdateTaskMutation();

  useEffect(() => {
    if (errorUpdateTask) {
      const errorMessage = t('Tasks.errorUpdateTask', {
        ERROR_MESSAGE: (errorUpdateTask as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, errorUpdateTask, t]);

  useEffect(() => {
    if (isSuccessUpdateTask) {
      enqueueSnackbar(t('Tasks.successUpdateTask'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, isSuccessUpdateTask, t]);

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

  const updateTaskObj: SubmitHandler<ITaskUpdate> = (data) => {
    updateTask({ body: data, title, order, description, userId });
    setShowUpdateModal(false);
  };

  return (
    <>
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

        <Typography
          className={css.tasksList__item_user}
          gutterBottom
          variant="inherit"
          component="p"
        >
          {errorGetUsers ? unknownUser : getUser()}
        </Typography>

        <Stack direction="row" className={css.tasksList__item_buttonsWrapper}>
          <IconButton
            className={css.tasksList__item_button}
            size="small"
            onClick={() => setShowUpdateModal(true)}
          >
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

      <LightboxUpdateTask
        showModal={showUpdateModal}
        isLoading={isUpdateTask}
        // isUpdate={true}
        changeShowModal={() => setShowUpdateModal(false)}
        submitCB={updateTaskObj}
        modalTitle={t('Boards.updateModalTitle')}
        submitButtonText={t('Boards.updateModalSubmitButton')}
        // formState={{ title, description }}
      />
    </>
  );
};

export default React.memo(TasksListItem);
