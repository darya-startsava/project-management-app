import React, { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, FormLabel, InputBase, TextareaAutosize, Typography } from '@mui/material';
import { TableChart as TableChartIcon } from '@mui/icons-material';
import Section from '$components/Section';
import ColumnsListItem from '$components/ColumsList';
import Lightbox from '$components/Lightbox';
import { randNumber } from '$utils/index';
import img1 from '$assets/img/1.jpg';
import img2 from '$assets/img/2.jpg';
import img3 from '$assets/img/3.jpg';
import css from './OneBoard.module.scss';

const OneBoard: FC = () => {
  const params = useParams();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newCardTitle, setNewCardTitle] = useState<string>('');
  const arrImages = [img1, img2, img3];
  const indexImg = useMemo(() => randNumber(arrImages.length - 1), [arrImages.length]);

  const typeNewBoardTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardTitle(event.target.value);
  };

  const addNewBoardHandler = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Section className={css.one_board} pageAllSpace={true}>
      <Typography className={css.one_board__title} component="h2" variant="inherit">
        <Box
          className={css.one_board__title_img}
          component="span"
          style={{
            backgroundImage: `url(${arrImages[indexImg]})`,
          }}
        ></Box>
        {t('Columns.columnsTitle')} {params.id || 'Board 1'}
        <TableChartIcon />
      </Typography>

      <ColumnsListItem
        columns={[]}
        addCardHandler={() => {
          setShowModal(true);
        }}
      />

      <Lightbox
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
              disabled={false}
              value={t('Boards.boardsModalSubmitButton')}
            />
          </FormLabel>
        </Box>
      </Lightbox>
    </Section>
  );
};

export default OneBoard;
