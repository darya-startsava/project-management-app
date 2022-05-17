import React, { FC, useState } from 'react';
import { Box, Button, ButtonGroup, InputBase, ListItem, Stack, Typography } from '@mui/material';
import { Add as AddIcon, DoNotDisturb as DoNotDisturbIcon } from '@mui/icons-material';
import { IColumn, TChangeElHandler, TSimpleFunction } from '$types/common';
import css from './ColumnsList.module.scss';

const ColumnsListItem: FC<IColumn> = ({ title }) => {
  const [isChangeColumnNameMode, setIsChangeColumnNameMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const changeHandler: TChangeElHandler<HTMLInputElement> = (event) => {
    setNewTitle(event.target.value);
  };

  const cancelHandler: TSimpleFunction = () => {
    setNewTitle(title);
    setIsChangeColumnNameMode(false);
  };

  return (
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
      </Box>
    </ListItem>
  );
};

export default React.memo(ColumnsListItem);
