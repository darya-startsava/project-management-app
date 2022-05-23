import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddTaskMutation, useGetAllTasksQuery, useUpdateColumnMutation } from '$services/api';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import CloseButton from '$components/CloseButton';
import LightboxTask from '$components/LightboxTask';
import TasksList from './TasksList';
import {
  Box,
  Button,
  ButtonGroup,
  // InputBase,
  ListItem,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import { Check as CheckIcon, DoNotDisturb as DoNotDisturbIcon } from '@mui/icons-material';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import {
  IColumn,
  IError,
  INewNTaskFormState,
  // TChangeElHandler,
  TCreateElement,
  TSimpleFunction,
  IColumnUpdateTitle,
} from '$types/common';
import css from './ColumnsList.module.scss';
import { CLOSE_SNACKBAR_TIME } from '$settings/index';

interface IColumnsListItemProps extends IColumn {
  boardId: string;
}

const ColumnsListItem: FC<IColumnsListItemProps> = ({ title, boardId, id: columnId }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isChangeColumnNameMode, setIsChangeColumnNameMode] = useState<boolean>(false);
  // const [newTitle, setNewTitle] = useState<string>(title);
  const [showModalAddTasks, setShowModalAddTasks] = useState<boolean>(false);
  const [columnNewTitle, setColumnNewTitle] = useState<IColumnUpdateTitle | null>(null);

  const { data: tasks = [], error: errorGetTasks } = useGetAllTasksQuery({ boardId, columnId });

  const [updateColumn, { error: errorUpdateColumn, isSuccess: isSuccessUpdateColumn }] =
    useUpdateColumnMutation();
  const [addTask, { isLoading: isAddingTask, error: errorAddTask, isSuccess: isSuccessAddTask }] =
    useAddTaskMutation();

  const {
    // handleSubmit,
    control,
    reset,
    // formState: { isDirty, errors },
  } = useForm<IColumnUpdateTitle>({
    defaultValues: {
      title: title,
    },
  });

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
    if (errorUpdateColumn) {
      const errorMessage = t('Columns.errorUpdateColumnTitle', {
        ERROR_MESSAGE: errorUpdateColumn,
      });
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, errorUpdateColumn, t]);

  useEffect(() => {
    if (isSuccessUpdateColumn) {
      enqueueSnackbar(t('Columns.successUpdateColumnTitle'), {
        variant: 'success',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, isSuccessUpdateColumn, t]);

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

  // const changeTitleHandler: TChangeElHandler<HTMLInputElement> = (event) => {
  //   setNewTitle(event.target.value);
  // };

  const cancelTitleHandler: TSimpleFunction = () => {
    // setNewTitle(title);
    setIsChangeColumnNameMode(false);
  };

  const submitTitleHandler = () => {
    // setNewTitle(title);
    if (columnNewTitle) {
      updateColumn({ body: columnNewTitle, id: columnId });
      reset({
        title: '',
      });
    }
    setColumnNewTitle(null);
    setIsChangeColumnNameMode(false);
  };

  // const submitTitleHandler = (data: IColumnUpdateTitle, id: string) => {
  //   setNewTitle(title);
  //   updateColumn({ body: data, id });
  //   reset({
  //     title: data.title,
  //   });
  //   setIsChangeColumnNameMode(false);
  // };

  return (
    <>
      <ListItem component="li" className={css.columnsList__item}>
        <Box className={css.columnsList__item_name}>
          {isChangeColumnNameMode ? (
            <Stack
              className={css.columnsList__item_rename}
              component="form"
              autoComplete="off"
              // onSubmit={handleSubmit(submitTitleHandler)}
              noValidate
            >
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <TextField
                      type="text"
                      value={value}
                      placeholder={t('Columns.errorEmptyField')}
                      aria-label={t('Columns.updateColumnTitleLabel')}
                      onChange={onChange}
                    />

                    {error?.message && (
                      <Typography
                        variant="inherit"
                        component="p"
                        className={css.modalAddForm_errorText}
                      >
                        Error
                      </Typography>
                    )}
                  </>
                )}
              />

              <ButtonGroup className={css.columnsList__item_rename_buttons}>
                <Button
                  className={css.columnsList__item_rename_accept}
                  onClick={submitTitleHandler}
                >
                  <CheckIcon />
                </Button>

                <Button
                  className={css.columnsList__item_rename_cancel}
                  onClick={cancelTitleHandler}
                >
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
        </Box>
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
