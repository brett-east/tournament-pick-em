import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { IModal } from '../modal';

const UIContext = createContext({
  modal: {
    element: null,
  },
  setModal: ({ element }: any) => {},
});

interface UIProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const useUIContext = () => useContext(UIContext);

export const UIContextProvider = ({ children } : UIProviderProps) => {
  const [modal, setModal] = useState<IModal>({
    element: null,
  });

  const value = useMemo(() => ({
    modal,
    setModal,
  }), [modal]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export default UIContext;
