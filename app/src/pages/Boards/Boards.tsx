import React, { FC, useEffect, useState } from 'react';
import { useAddBoardMutation, useGetAllBoardsQuery } from '$services/api';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Section from '$components/Section';
import BoardsHead from './BoardsHead';
import BoardsList from '$components/BoardsList';
import LightboxForCreateItem from '$components/LightboxForCreateItem';
import CloseButton from '$components/CloseButton';
import { CLOSE_SNACKBAR_TIME } from '$settings/index';
import { IError, INewNameFormState, TCreateElement } from '$types/common';
import css from './Boards.module.scss';

export type TChangeBoardsShow = (searchValue: string) => void;

const Boards: FC = () => {
  const { t } = useTranslation();
  const lengthMinLetters = 5;
  const lengthMaxLetters = 60;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [
    addBoard,
    { isLoading: isAddingBoard, error: errorAddBoard, isSuccess: isSuccessAddBoard },
  ] = useAddBoardMutation();
  const { data: boards = [], error: errorGetBoards } = useGetAllBoardsQuery();

  useEffect(() => {
    if (errorGetBoards) {
      const errorMessage = t('Boards.errorGetBoards', {
        errorText: (errorGetBoards as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorGetBoards, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (isSuccessAddBoard) {
      enqueueSnackbar(t('Boards.successCreate'), {
        variant: 'success',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessAddBoard, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (errorAddBoard) {
      const errorMessage = t('Boards.errorCreate', { errorText: errorAddBoard });
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: CLOSE_SNACKBAR_TIME,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [t, errorAddBoard, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {}, [t, enqueueSnackbar, closeSnackbar]);

  const changeBoardsListShow: TChangeBoardsShow = (searchValue: string) => {
    if (!searchValue.trim().length) {
      return;
    }
    // for better time
    // const filteredBoards: Array<IBoard> = boardsArray.filter((board: IBoard) =>
    //   board.title.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setBoards(filteredBoards);
  };

  const addNewColumn: TCreateElement = (data: INewNameFormState) => {
    addBoard({ title: data.newTitle });
    setShowModal(false);
  };

  return (
    <Section className={css.boards} pageAllSpace={true}>
      <BoardsHead searchCB={changeBoardsListShow} />

      <BoardsList
        boards={boards}
        addCardHandler={() => {
          setShowModal(true);
        }}
        updateCardTitleHandler={() => {
          setShowModal(true);
        }}
      />

      <LightboxForCreateItem
        modalTitle={t('Boards.createModalTitle')}
        showModal={showModal}
        changeShowModal={setShowModal}
        submitCB={addNewColumn}
        isLoading={isAddingBoard}
        placeholderText={t('Boards.addModalTextareaPlaceholder')}
        localizationKeyTextareaErrorText="Boards.errorTextarea"
        submitButtonText={t('Boards.submitButtonTextInFormNewBoard')}
        rules={{
          required: true,
          minLength: {
            value: lengthMinLetters,
            message: t('Boards.errorTextMinLengthNewTitle', { lengthMinLetters }),
          },
          maxLength: {
            value: lengthMaxLetters,
            message: t('Boards.errorTextMaxLengthNewTitle', { lengthMaxLetters }),
          },
        }}
      />
    </Section>
  );
};

export default Boards;
