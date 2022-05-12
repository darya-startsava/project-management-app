import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Grid, Typography, InputBase, IconButton } from '@mui/material';
import Section from '$components/Section';
import BoardsList from '$components/BoardsList';
import css from './Boards.module.scss';

const Boards: FC = () => {
  const { t } = useTranslation();

  const searchHandler = (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Section className={css.boards} pageAllSpace={true}>
      <Grid container className={css.boards__head} direction="row">
        <Grid item className={css.boards__head_name}>
          <Typography variant="inherit" component="h1" className={css.boards__head_title}>
            {t('Boards.boardsTitle')}
          </Typography>
          <TableChartIcon />
        </Grid>

        <Grid
          item
          className={css.boards__head_form}
          component="form"
          autoComplete="off"
          onSubmit={searchHandler}
          noValidate
        >
          <InputBase
            className={css.boards__head_search}
            placeholder={t('Boards.boardsInputSearchText')}
            type="search"
            endAdornment={
              <IconButton onClick={searchHandler}>
                <SearchIcon />
              </IconButton>
            }
            fullWidth
          />
          <InputBase className={css.boards__head_submit} type="submit" />
        </Grid>
      </Grid>

      <BoardsList />
    </Section>
  );
};

export default Boards;
