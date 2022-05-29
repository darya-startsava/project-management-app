import React, { FC, useCallback, useEffect, useState } from 'react';
import { useAddBoardMutation, useGetAllBoardsQuery } from '$services/api';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Section from '$components/Section';
import BoardsHead from './BoardsHead';
import BoardsList from '$components/BoardsList';
import CloseButton from '$components/CloseButton';
import LightboxBoard from '$components/LightboxBoard';
import { Typography } from '@mui/material';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import { IBoard, IBoardCreateObj, IError, TCreateElement } from '$types/common';
import css from './Boards.module.scss';

export type TChangeBoardsShow = (searchValue: string) => void;

const Boards: FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [
    addBoard,
    { isLoading: isAddingBoard, error: errorAddBoard, isSuccess: isSuccessAddBoard },
  ] = useAddBoardMutation();
  const { data: dataBoards = [], error: errorGetBoards } = useGetAllBoardsQuery();
  const [boards, setBoards] = useState<Array<IBoard>>(dataBoards);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  useEffect(() => {
    if (errorGetBoards) {
      const errorMessage = t('Boards.errorGetBoards', {
        ERROR_MESSAGE: (errorGetBoards as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorGetBoards, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (isSuccessAddBoard) {
      enqueueSnackbar(t('Boards.successCreate'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessAddBoard, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (errorAddBoard) {
      const errorMessage = t('Boards.errorCreate', {
        ERROR_MESSAGE: (errorAddBoard as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorAddBoard, t, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {}, [t, enqueueSnackbar, closeSnackbar]);

  const changeBoardsListShow: TChangeBoardsShow = useCallback(
    (searchValue: string) => {
      searchValue ? setShowSearchResults(true) : setShowSearchResults(false);
      let filteredBoards: Array<IBoard> = dataBoards;
      if (searchValue) {
        filteredBoards = dataBoards.filter(
          (board: IBoard) =>
            board.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            board.description.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      setBoards(filteredBoards);
    },
    [dataBoards]
  );

  const addNewColumn: TCreateElement<IBoardCreateObj> = (data: IBoardCreateObj) => {
    addBoard(data);
    setShowModal(false);
  };

  return (
    <Section className={css.boards} pageAllSpace={true}>
      <BoardsHead searchCB={changeBoardsListShow} />
      {showSearchResults && !boards.length && (
        <Typography component="p" className={css.boards_search_message}>
          {t('Boards.nothingFoundMessage')}
        </Typography>
      )}
      <BoardsList
        boards={boards}
        showSearchResults={showSearchResults}
        addCardHandler={() => {
          setShowModal(true);
        }}
      />

      <LightboxBoard
        showModal={showModal}
        isLoading={isAddingBoard}
        isUpdate={false}
        closeModalHandler={() => setShowModal(false)}
        submitCB={addNewColumn}
        modalTitle={t('Boards.createModalTitle')}
        submitButtonText={t('Boards.submitButtonTextAddForm')}
        formState={{ title: '', description: '' }}
      />
    </Section>
  );
};

export default Boards;
