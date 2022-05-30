import React, { FC, useEffect, useRef, useState } from 'react';
import { useAddBoardMutation, useGetAllBoardsQuery } from '$services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Section from '$components/Section';
import BoardsHead from './BoardsHead';
import Spinner from '$components/Spinner';
import BoardsList from '$components/BoardsList';
import CloseButton from '$components/CloseButton';
import LightboxBoard from '$components/LightboxBoard';
import { messageErrorOptions, messageSuccessOptions } from '$settings/index';
import { IBoardCreateObj, IError, TCreateElement, TSimpleFunction } from '$types/common';
import css from './Boards.module.scss';

export type TChangeBoardsShow = (searchValue: string) => void;
interface ILocationState {
  openModal?: boolean;
}

const Boards: FC = () => {
  const { t } = useTranslation();
  const langRef = useRef(t);
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [
    addBoard,
    { isLoading: isAddingBoard, error: errorAddBoard, isSuccess: isSuccessAddBoard },
  ] = useAddBoardMutation();
  const {
    data: boards = [],
    error: errorGetBoards,
    isLoading: isLoadingBoards,
  } = useGetAllBoardsQuery();

  // show get boards error message
  useEffect(() => {
    const needOpenMenu = (location?.state as ILocationState)?.openModal || false;
    if (needOpenMenu) {
      setShowModal(true);
    }
  }, [location]);

  useEffect(() => {
    if (errorGetBoards) {
      const errorMessage = langRef.current('Boards.errorGetBoards', {
        ERROR_MESSAGE: (errorGetBoards as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorGetBoards, langRef, enqueueSnackbar, closeSnackbar]);

  // show add board success message
  useEffect(() => {
    if (isSuccessAddBoard) {
      enqueueSnackbar(langRef.current('Boards.successCreate'), {
        ...messageSuccessOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [isSuccessAddBoard, langRef, enqueueSnackbar, closeSnackbar]);

  // show add board error message
  useEffect(() => {
    if (errorAddBoard) {
      const errorMessage = langRef.current('Boards.errorCreate', {
        ERROR_MESSAGE: (errorAddBoard as IError).data.message || '',
      });
      enqueueSnackbar(errorMessage, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorAddBoard, langRef, enqueueSnackbar, closeSnackbar]);

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

  const addNewColumn: TCreateElement<IBoardCreateObj> = (data: IBoardCreateObj) => {
    addBoard(data);
    closeModal();
  };

  const closeModal: TSimpleFunction = () => {
    setShowModal(false);
    navigate(location.pathname, { replace: false });
  };

  return (
    <Section className={css.boards} pageAllSpace={true}>
      <BoardsHead searchCB={changeBoardsListShow} />

      {isLoadingBoards ? (
        <Spinner className={css.boards__loader} />
      ) : (
        <BoardsList
          boards={boards}
          addCardHandler={() => {
            setShowModal(true);
          }}
          showSpinnerEnd={isLoadingBoards || isAddingBoard}
        />
      )}

      <LightboxBoard
        showModal={showModal}
        isLoading={isAddingBoard}
        isUpdate={false}
        closeModalHandler={closeModal}
        submitCB={addNewColumn}
        modalTitle={t('Boards.createModalTitle')}
        submitButtonText={t('Boards.submitButtonTextAddForm')}
        formState={{ title: '', description: '' }}
      />
    </Section>
  );
};

export default Boards;
