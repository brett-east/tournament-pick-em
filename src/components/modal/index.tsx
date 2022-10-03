import React, { useCallback, useEffect, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import styles from './styles.module.scss';
import { useUIContext } from '../ui-context';

export const useModal = () => {
  const { setModal } = useUIContext();

  const openModal = useCallback((
    component: ({ handleCloseModal }: HandleCloseModal) => JSX.Element,
  ) => setModal({
    element: () => component,
  }), [setModal]);

  return openModal;
};

export const Modal = () => {
  const { modal, setModal } = useUIContext();
  const [ModalElement, setModalElement] = useState<any>(null);

  useEffect(() => {
    setModalElement(modal.element);
  }, [modal]);

  const handleClickAway = useCallback(() => {
    setModal({ element: null });
  }, [setModal]);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      handleClickAway();
    }
  }, [handleClickAway]);

  useEffect(() => {
    if (!ModalElement) return;

    // add event listener when modal exists
    document.addEventListener('keydown', handleEscape);

    // eslint-disable-next-line consistent-return
    return () => {
      // cleanup event listener
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClickAway, ModalElement, handleEscape]);

  const handleClose = () => {
    // modal.config?.customClose?.();
    setModal({ element: null });
  };

  return ModalElement ? (
    <div className={styles.modalBackground}>
      <div className={styles.modalWrapper}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <ModalElement handleCloseModal={handleClose} />
          </div>
        </ClickAwayListener>
      </div>
    </div>
  ) : null;
};

export type HandleCloseModal = {
  handleCloseModal: () => void;
}
export interface IModal {
  element: any;
}
