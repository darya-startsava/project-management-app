import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import TableChartIcon from '@mui/icons-material/TableChart';
import {
  Grid,
  Typography,
  InputBase,
  IconButton,
  Box,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';
import Section from '$components/Section';
import BoardsList from '$components/BoardsList';
import css from './Boards.module.scss';

import { IBoard } from '$types/common';
import ModalPage from '$components/ModalPage';

const Boards: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newCardTitle, setNewCardTitle] = useState<string>('');
  const { t } = useTranslation();

  // useGetAllBoardsQuery,
  const listBoards: Array<IBoard> = [
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
      title: 'My Board 1',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d2',
      title: 'My Board 2',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d3',
      title: 'My Board 3',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d1',
      title: 'My Board 4',
    },
    {
      id: '9a111e19-2412-43e1-b8c4-13776842b8d1',
      title: 'My Board 5',
    },
  ];

  const searchHandler = (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault();
  };

  const typeNewBoardTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardTitle(event.target.value);
  };

  const addNewBoardHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (newCardTitle.trim() !== '') {
      console.log(newCardTitle);
      // useCreateOneBoardMutation,
      setNewCardTitle('');
    }
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

      <BoardsList
        listBoards={listBoards}
        addCardHandler={() => {
          setShowModal(true);
        }}
      />

      <ModalPage
        showModal={showModal}
        closeModalFunction={() => {
          setShowModal(false);
        }}
        modalTitle={t('Boards.boardsModalTitle')}
      >
        <Box
          className={css.modalAddForm}
          component="form"
          autoComplete="off"
          onSubmit={addNewBoardHandler}
          noValidate
        >
          <TextareaAutosize
            value={newCardTitle}
            className={css.modalAddForm_text}
            placeholder={t('Boards.boardsModalTextareaPlaceholder')}
            onChange={typeNewBoardTitle}
          />

          <FormLabel className={css.modalAddForm_submitWrapper}>
            <Box component="span">{t('Boards.boardsModalSubmitButton')}</Box>
            <InputBase
              className={css.modalAddForm_submit}
              type="submit"
              value={t('Boards.boardsModalSubmitButton')}
            />
          </FormLabel>
        </Box>
      </ModalPage>
    </Section>
  );
};

export default Boards;
