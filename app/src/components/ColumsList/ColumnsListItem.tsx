import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddTaskMutation, useGetAllTasksQuery } from '$services/api';
import { useSnackbar } from 'notistack';
import CloseButton from '$components/CloseButton';
import LightboxTask from '$components/LightboxTask';
import TasksList from './TasksList';
import { Button, ButtonGroup, InputBase, ListItem, Stack, Typography } from '@mui/material';
import { Add as AddIcon, DoNotDisturb as DoNotDisturbIcon } from '@mui/icons-material';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import {
  IColumn,
  IError,
  INewNTaskFormState,
  TChangeElHandler,
  TCreateElement,
  TSimpleFunction,
} from '$types/common';
import { DraggableProvided } from 'react-beautiful-dnd';
import css from './ColumnsList.module.scss';

interface IColumnsListItemProps extends IColumn {
  boardId: string;
  draggableProvided: DraggableProvided;
}

const ColumnsListItem: FC<IColumnsListItemProps> = ({
  title,
  boardId,
  id: columnId,
  draggableProvided,
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isChangeColumnNameMode, setIsChangeColumnNameMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [showModalAddTasks, setShowModalAddTasks] = useState<boolean>(false);
  const { data: tasks = [], error: errorGetTasks } = useGetAllTasksQuery({ boardId, columnId });
  const [addTask, { isLoading: isAddingTask, error: errorAddTask, isSuccess: isSuccessAddTask }] =
    useAddTaskMutation();

  useEffect(() => {
    if (errorGetTasks) {
      const errorMessage = t('Tasks.errorGetTasks', {
        ERROR_MESSAGE: (errorGetTasks as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorGetTasks, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (errorAddTask) {
      const errorMessage = t('Tasks.errorAddTask', {
        ERROR_MESSAGE: (errorAddTask as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorAddTask, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (isSuccessAddTask) {
      enqueueSnackbar(t('Tasks.isSuccessAddTask'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessAddTask, t, enqueueSnackbar, closeSnackbar]);

  const addNewBoard: TCreateElement<INewNTaskFormState> = (data: INewNTaskFormState) => {
    addTask({
      body: data,
      boardId,
      columnId,
    });
    setShowModalAddTasks(false);
  };

  const changeHandler: TChangeElHandler<HTMLInputElement> = (event) => {
    setNewTitle(event.target.value);
  };

  const cancelHandler: TSimpleFunction = () => {
    setNewTitle(title);
    setIsChangeColumnNameMode(false);
  };

  return (
    <>
      <ListItem
        component="li"
        className={css.columnsList__item}
        ref={draggableProvided.innerRef}
        {...draggableProvided.draggableProps}
        {...draggableProvided.dragHandleProps}
      >
        {isChangeColumnNameMode ? (
          <Stack className={css.columnsList__item_rename}>
            <InputBase
              className={css.columnsList__item_rename_input}
              value={newTitle}
              onChange={changeHandler}
              name={title}
            />

            <ButtonGroup className={css.columnsList__item_rename_buttons}>
              <Button className={css.columnsList__item_rename_accept} onClick={() => {}}>
                <AddIcon />
              </Button>

              <Button className={css.columnsList__item_rename_cancel} onClick={cancelHandler}>
                <DoNotDisturbIcon />
              </Button>
            </ButtonGroup>
          </Stack>
        ) : (
          <Typography
            className={css.columnsList__item_title}
            gutterBottom
            variant="inherit"
            component="h3"
            onClick={() => setIsChangeColumnNameMode(true)}
          >
            {title}
          </Typography>
        )}

        <TasksList tasks={tasks} />

        <Button
          className={css.columnsList__item_addTaskButton}
          onClick={() => {
            setShowModalAddTasks(true);
          }}
        >
          + {t('Tasks.addNewTaskButtonText')}
        </Button>
      </ListItem>

      <LightboxTask
        showModal={showModalAddTasks}
        isLoading={isAddingTask}
        changeShowModal={setShowModalAddTasks}
        submitCB={addNewBoard}
        modalTitle={t('Tasks.createModalTitle')}
        submitButtonText={t('Tasks.submitButtonTextAddTaskForm')}
      />
    </>
  );
};

export default React.memo(ColumnsListItem);
