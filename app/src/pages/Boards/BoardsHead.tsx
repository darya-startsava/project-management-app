import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, TableChart as TableChartIcon } from '@mui/icons-material';
import { Grid, InputBase, IconButton } from '@mui/material';
import { TChangeElHandler } from '$types/common';
import { TChangeBoardsShow } from './Boards';
import css from './Boards.module.scss';

interface IBoardsHeadProps {
  searchCB: TChangeBoardsShow;
}

const BoardsHead: FC<IBoardsHeadProps> = ({ searchCB }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');

  const inputSearchHandler: TChangeElHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  //
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchCB(searchValue);
  };

  return (
    <Grid container className={css.boards__head} direction="row" alignItems="flex-start">
      <Grid item className={css.boards__head_name} component="h2">
        {t('Boards.pageTitle')}
        <TableChartIcon />
      </Grid>

      <Grid
        item
        className={css.boards__head_form}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
        noValidate
      >
        <InputBase
          name="searchValue"
          className={css.boards__head_search}
          type="search"
          placeholder={t('Boards.inputSearchText')}
          inputProps={{
            'aria-label': t('Boards.inputSearchText'),
          }}
          value={searchValue}
          onChange={inputSearchHandler}
          endAdornment={
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          }
          fullWidth
        />
        <InputBase className={css.boards__head_submit} type="submit" />
      </Grid>
    </Grid>
  );
};

export default BoardsHead;
