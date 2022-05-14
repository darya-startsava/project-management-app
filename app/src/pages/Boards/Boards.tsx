import React, { FC, useState } from 'react';
import { useGetAllBoardsQuery } from '$services/api';
// import { useTranslation } from 'react-i18next';
// import { useSnackbar } from 'notistack';
import Section from '$components/Section';
import BoardsHead from './BoardsHead';
import BoardsList from '$components/BoardsList';
import LightboxNewBoard from '$components/LightboxNewBoard';
// import CloseButton from '$components/CloseButton';
import { IBoard } from '$types/common';
import css from './Boards.module.scss';

export type TChangeBoardsShow = (searchValue: string) => void;

const Boards: FC = () => {
  // const { t } = useTranslation();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const { data: boardsArray = [] } = useGetAllBoardsQuery();

  // useEffect(() => {
  //   changeBoardsListShow('');
  // }, []);

  // if (!isSuccess) {
  //   enqueueSnackbar(t('Boards.errorBoardCreat'), {
  //     variant: 'error',
  //     autoHideDuration: 3000,
  //     action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
  //   });
  // }

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
