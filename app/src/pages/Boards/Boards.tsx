import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddBoardMutation, useGetAllBoardsQuery } from '$services/api';
import { Search as SearchIcon, TableChart as TableChartIcon } from '@mui/icons-material';
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
import ModalPage from '$components/ModalPage';
import css from './Boards.module.scss';

const Boards: FC = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newCardTitle, setNewCardTitle] = useState<string>('');
  const { data: boards = [] } = useGetAllBoardsQuery();
  const [addBoard, { isLoading: isLoadingAddNewBoard }] = useAddBoardMutation();

  const searchHandler = (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault();
  };

  const typeNewBoardTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardTitle(event.target.value);
  };

  const addNewBoardHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const title = newCardTitle.trim();
    if (title !== '') {
      await addBoard({ title }).unwrap();
      setNewCardTitle('');
      setShowModal(false);
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
            area-label={t('Boards.boardsInputSearchText')}
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
        boards={boards}
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
            area-label={t('Boards.boardsModalTextareaPlaceholder')}
            onChange={typeNewBoardTitle}
          />

          <FormLabel className={css.modalAddForm_submitWrapper}>
            <Box component="span">{t('Boards.boardsModalSubmitButton')}</Box>
            <InputBase
              className={css.modalAddForm_submit}
              type="submit"
              disabled={isLoadingAddNewBoard}
              value={t('Boards.boardsModalSubmitButton')}
            />
          </FormLabel>
        </Box>
      </ModalPage>
    </Section>
  );
};

export default Boards;
