import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useAddTaskMutation,
  useGetAllTasksQuery,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} from '$services/api';
import { useSnackbar } from 'notistack';
import classNames from 'classnames';
import CloseButton from '$components/CloseButton';
import Spinner from '$components/Spinner';
import LightboxTask from '$components/LightboxTask';
import ConfirmWindow from '$components/ConfirmWindow';
import TasksList from './TasksList';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputBase,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import {
  Check as CheckIcon,
  DoNotDisturb as DoNotDisturbIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import {
  IColumn,
  IColumnUpdateObj,
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
  draggableColumnProvided: DraggableProvided;
}

const ColumnsListItem: FC<IColumnsListItemProps> = ({
  title,
  boardId,
  id: columnId,
  draggableColumnProvided,
  order,
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isChangeColumnNameMode, setIsChangeColumnNameMode] = useState<boolean>(false);
  const [isShowConfirmModalDelete, setIsShowConfirmModalDelete] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [showModalAddTasks, setShowModalAddTasks] = useState<boolean>(false);

  const {
    data: tasks = [],
    error: errorGetTasks,
    isLoading: isLoadingTasks,
  } = useGetAllTasksQuery({ boardId, columnId });
  const [updateColumn, { error: errorUpdateColumn, isSuccess: isSuccessUpdateColumn }] =
    useUpdateColumnMutation();
  const [addTask, { isLoading: isAddingTask, error: errorAddTask, isSuccess: isSuccessAddTask }] =
    useAddTaskMutation();
  const [deleteColumn, { error: errorDeleteColumn, isSuccess: isSuccessDeleteColumn }] =
    useDeleteColumnMutation();

  // show get tasks error message
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

  // show add task error message
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

  // show add task success message
  useEffect(() => {
    if (isSuccessAddTask) {
      enqueueSnackbar(t('Tasks.isSuccessAddTask'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessAddTask, t, enqueueSnackbar, closeSnackbar]);

  // show update column error message
  useEffect(() => {
    if (errorUpdateColumn) {
      const errorMessage = t('Columns.errorUpdateColumnTitle', {
        ERROR_MESSAGE: (errorUpdateColumn as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, errorUpdateColumn, t]);

  // show update column success message
  useEffect(() => {
    if (isSuccessUpdateColumn) {
      enqueueSnackbar(t('Columns.successUpdateColumnTitle'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, isSuccessUpdateColumn, t]);

  // show delete column error message
  useEffect(() => {
    if (errorDeleteColumn) {
      const errorMessage = t('Columns.errorDeleteColumn', {
        ERROR_MESSAGE: (errorDeleteColumn as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorDeleteColumn, closeSnackbar, enqueueSnackbar, t]);

  // show delete board success message
  useEffect(() => {
    if (isSuccessDeleteColumn) {
      enqueueSnackbar(t('Columns.successDeleteColumn'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessDeleteColumn, closeSnackbar, enqueueSnackbar, t]);

  const addNewBoard: TCreateElement<INewNTaskFormState> = (data: INewNTaskFormState) => {
    addTask({
      body: data,
      boardId,
      columnId,
    });
    setShowModalAddTasks(false);
  };

  const changeTitleHandler: TChangeElHandler<HTMLInputElement> = (event) => {
    setNewTitle(event.target.value);
  };

  const cancelTitleHandler: TSimpleFunction = () => {
    setNewTitle(title);
    setIsChangeColumnNameMode(false);
  };

  const removeHandler = async () => {
    deleteColumn({ boardId, columnId });
    setIsShowConfirmModalDelete(false);
  };

  const submitTitleHandler = () => {
    submitTitle({ title: newTitle, order });
  };

  const submitTitle = (data: IColumnUpdateObj) => {
    setNewTitle(newTitle);
    updateColumn({ body: data, boardId, columnId });
    setIsChangeColumnNameMode(false);
  };

  return (
    <>
      <ListItem
        component="li"
        className={css.columnsList__item}
        ref={draggableColumnProvided.innerRef}
        {...draggableColumnProvided.draggableProps}
        {...draggableColumnProvided.dragHandleProps}
      >
        {isChangeColumnNameMode ? (
          <Stack className={css.columnsList__item_rename}>
            <InputBase
              className={css.columnsList__item_rename_input}
              value={newTitle}
              onChange={changeTitleHandler}
              placeholder={t('Columns.errorEmptyField')}
              aria-label={t('Columns.updateColumnTitleLabel')}
              name={title}
            />

            <ButtonGroup className={css.columnsList__item_rename_buttons}>
              <Button className={css.columnsList__item_rename_accept} onClick={submitTitleHandler}>
                <CheckIcon />
              </Button>

              <Button className={css.columnsList__item_rename_cancel} onClick={cancelTitleHandler}>
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
            {newTitle}
          </Typography>
        )}

        {isLoadingTasks ? (
          <Spinner size={30} />
        ) : (
          <>
            <TasksList tasks={tasks} columnId={columnId} />

            <>{isAddingTask && <Spinner size={30} />}</>

            <Box className={css.columnsList__buttonsWrapper}>
              <Button
                className={classNames(css.columnsList__item_addTaskButton, {
                  [css.disabled]: isAddingTask,
                })}
                onClick={() => {
                  setShowModalAddTasks(true);
                }}
                disabled={isAddingTask}
              >
                + {t('Tasks.addNewTaskButtonText')}
              </Button>

              <IconButton
                className={css.columnList_item_delete_button}
                size="small"
                onClick={() => setIsShowConfirmModalDelete(true)}
                aria-label={t('Boards.deleteColumnLabel')}
                disabled={isAddingTask}
              >
                <DeleteOutlineIcon color="inherit" />
              </IconButton>
            </Box>
          </>
        )}
      </ListItem>

      <ConfirmWindow
        isShow={isShowConfirmModalDelete}
        title={t('Columns.confirmDeleteColumnModalTitle')}
        disAgreeHandler={() => setIsShowConfirmModalDelete(false)}
        agreeHandler={removeHandler}
      />

      <LightboxTask
        showModal={showModalAddTasks}
        isLoading={isAddingTask}
        closeModalHandler={() => setShowModalAddTasks(false)}
        submitCB={addNewBoard}
        modalTitle={t('Tasks.createModalTitle')}
        submitButtonText={t('Tasks.submitButtonTextAddTaskForm')}
      />
    </>
  );
};

export default React.memo(ColumnsListItem);
