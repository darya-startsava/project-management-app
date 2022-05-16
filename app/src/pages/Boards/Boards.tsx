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
import { CLOSE_SNACKBAR_TIME } from '$settings/index';
import { IBoard, INewNameFormState, TCreateElement } from '$types/common';
import css from './Boards.module.scss';

export type TChangeBoardsShow = (searchValue: string) => void;

const Boards: FC = () => {
  const { t } = useTranslation();
  const lengthMinLetters = 5;
  const lengthMaxLetters = 60;
  const createElement = t('Boards.boardsOne');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const [addBoard, { isLoading: isAddingBoard, error: errorAddBoard }] = useAddBoardMutation();
  const { data: boardsArray = [], error: errorGetBoards } = useGetAllBoardsQuery();

  useDidMount(() => {
    if (errorGetBoards) {
      const errorMessage = `${t('Boards.errorGetBoards', { createElement })} ${
        errorGetBoards || ''
      }`;
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
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
      await addBoard({ title: data.newTitle });
      enqueueSnackbar(t('Common.successCreate', { createElement }), {
        variant: 'success',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    } catch (_) {
      const errorMessage = `${t('Common.errorCreate', { createElement })} ${errorAddBoard || ''}`;
      return enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
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
        modalTitle={t('Common.createModalTitle', {
          createElementLowerCase: '$t(Boards.createElementLowerCase)',
        })}
        showModal={showModal}
        changeShowModal={setShowModal}
        submitCB={addNewColumn}
        isLoading={isAddingBoard}
        placeholderText={t('Boards.boardsModalTextareaPlaceholder')}
        rules={{
          required: true,
          minLength: {
            value: 5,
            message: t('Common.errorTextMinLengthNewTitle', { lengthMinLetters }),
          },
          maxLength: {
            value: 60,
            message: t('Common.errorTextMaxLengthNewTitle', { lengthMaxLetters }),
          },
        }}
      />
    </Section>
  );
};

export default Boards;
