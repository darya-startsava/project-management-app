import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LightboxForCreateTask from '$components/LightboxForCreateTask';
import TasksList from './TasksList';
import { Box, Button, ButtonGroup, InputBase, ListItem, Stack, Typography } from '@mui/material';
import { Add as AddIcon, DoNotDisturb as DoNotDisturbIcon } from '@mui/icons-material';
import {
  IColumn,
  INewNTaskFormState,
  TChangeElHandler,
  TCreateElement,
  TSimpleFunction,
} from '$types/common';
import css from './ColumnsList.module.scss';
import { useAddTaskMutation, useGetAllTasksQuery } from '$services/api';

interface IColumnsListItemProps extends IColumn {
  boardId: string;
}

const ColumnsListItem: FC<IColumnsListItemProps> = ({ title, boardId, id: columnId }) => {
  const { t } = useTranslation();
  const [isChangeColumnNameMode, setIsChangeColumnNameMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [showModalAddTasks, setShowModalAddTasks] = useState<boolean>(false);

  // , error: errorGetTasks
  const { data: tasks = [] } = useGetAllTasksQuery({ boardId, columnId });
  // , { isLoading: isAddingTask, error, isSuccess: isSuccessAddTask }
  const [addTask] = useAddTaskMutation();

  const addNewBoard: TCreateElement<INewNTaskFormState> = (data: INewNTaskFormState) => {
    addTask({
      body: {
        ...data,
        order: tasks.length + 1,
      },
      boardId,
      columnId,
    });
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
      <ListItem component="li" className={css.columnsList__item}>
        <Box className={css.columnsList__item_name}>
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
        </Box>
      </ListItem>

      <LightboxForCreateTask
        modalTitle={t('Tasks.createModalTitle')}
        showModal={showModalAddTasks}
        changeShowModal={setShowModalAddTasks}
        submitCB={addNewBoard}
        isLoading={false}
        // submitCB={addNewBoard}
        // isLoading={isAddingColumn}
        placeholderText={t('Tasks.addModalTextareaPlaceholder')}
        localizationKeyTextareaErrorText="Tasks.errorTextarea"
        submitButtonText={t('Tasks.submitButtonTextInFormNewTask')}
      />
    </>
  );
};

export default React.memo(ColumnsListItem);
