import React, { FC, useEffect, useState } from 'react';
import { useGetAllBoardsQuery } from '$services/api';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Section from '$components/Section';
import BoardsHead from './BoardsHead';
import BoardsList from '$components/BoardsList';
import LightboxNewBoard from '$components/LightboxNewBoard';
import CloseButton from '$components/CloseButton';
import { IBoard } from '$types/common';
import css from './Boards.module.scss';

export type TChangeBoardsShow = (searchValue: string) => void;

const Boards: FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const { data: boardsArray = [], isLoading, isError, isFetching } = useGetAllBoardsQuery();

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // I think this is not good. But I dont understand ho do it better.
  // When i change page and get bad request i show 3 Snackbars.
  useEffect(() => {
    // console.log('isLoading', isLoading, 'isFetching', isFetching, 'isError', isError);

    if (!isLoading && !isFetching && isError) {
      enqueueSnackbar(t('Boards.errorGetBoards'), {
        variant: 'error',
        autoHideDuration: 3000,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [t, closeSnackbar, enqueueSnackbar, isLoading, isFetching, isError]);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const changeBoardsListShow: TChangeBoardsShow = (searchValue: string) => {
    if (!searchValue.trim().length) {
      setBoards(boardsArray);
      return;
    }
    const filteredBoards: Array<IBoard> = boardsArray.filter((board: IBoard) =>
      board.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setBoards(filteredBoards);
  };

  return (
    <Section className={css.boards} pageAllSpace={true}>
      <BoardsHead searchCB={changeBoardsListShow} />

      <BoardsList
        boards={boardsArray || boards}
        addCardHandler={() => {
          setShowModal(true);
        }}
      />

      <LightboxNewBoard showModal={showModal} changeShowModal={setShowModal} />
    </Section>
  );
};

export default Boards;
