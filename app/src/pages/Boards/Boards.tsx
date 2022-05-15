import React, { FC, useState } from 'react';
import useDidMount from 'beautiful-react-hooks/useDidMount';
import { useAddBoardMutation, useGetAllBoardsQuery } from '$services/api';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Section from '$components/Section';
import BoardsHead from './BoardsHead';
import BoardsList from '$components/BoardsList';
import LightboxForCreateItem from '$components/LightboxForCreateItem';
import CloseButton from '$components/CloseButton';
import { IBoard, INewNameFormState, TCreateElement } from '$types/common';
import css from './Boards.module.scss';

export type TChangeBoardsShow = (searchValue: string) => void;

const Boards: FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const [addBoard, { isLoading: isAddingBoard }] = useAddBoardMutation();
  const { data: boardsArray = [], error } = useGetAllBoardsQuery();

  useDidMount(() => {
    if (error) {
      enqueueSnackbar(t('Boards.errorGetBoards'), {
        variant: 'error',
        autoHideDuration: 3000,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  });

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

  const addNewColumn: TCreateElement = async (data: INewNameFormState) => {
    try {
      await addBoard({ title: data.newTitle }).unwrap();
    } catch (_) {
      return enqueueSnackbar(t('Boards.errorBoardCreate'), {
        variant: 'error',
        autoHideDuration: 5000,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }

    enqueueSnackbar(t('Boards.successBoardCreate'), {
      variant: 'success',
      autoHideDuration: 5000,
      action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
    });
    setShowModal(false);
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

      <LightboxForCreateItem
        modalTitle={t('Boards.boardsModalTitle')}
        showModal={showModal}
        changeShowModal={setShowModal}
        submitCB={addNewColumn}
        isLoading={isAddingBoard}
        placeholderText={t('Boards.boardsModalTextareaPlaceholder')}
        rules={{
          required: true,
          minLength: {
            value: 5,
            message: t('Boards.errorTextMinLengthNewTitle'),
          },
          maxLength: {
            value: 60,
            message: t('Boards.errorTextMaxLengthNewTitle'),
          },
        }}
      />
    </Section>
  );
};

export default Boards;
