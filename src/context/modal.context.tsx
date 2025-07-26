/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from 'react';
import { ChildrenProps } from '@/src/types';
import { ModalContentEnum } from '@/src/enums';
import { ModalContextProps } from '@/src/components/Modal/types';
import RenderModal from '@/src/components/Modal/RenderModal';

const initContext: ModalContextProps = {
  modal: null,
  openModal: () => {},
  isClosing: false,
  closeModal: () => {},
  ModalContentEnum: ModalContentEnum,
  RenderModal: () => <></>,
  isFormModal: false,
  isStrategyModal: false,
  isStrategyHistoryModal: false,
  isStrategyOrderDetails: false,
};

const ModalContext = createContext<ModalContextProps>(initContext);

export const ModalProvider = ({ children }: ChildrenProps) => {
  const [modal, setModal] = useState<ModalContentEnum | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const isFormModal = modal === ModalContentEnum.Form;
  const isStrategyModal = modal === ModalContentEnum.Strategy;
  const isStrategyHistoryModal = modal === ModalContentEnum.StrategyHistory;
  const isStrategyOrderDetails = modal === ModalContentEnum.OrderDetails;

  // ---

  const openModal = (val: ModalContentEnum) => setModal(val);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModal(null);
      setIsClosing(false);
    }, 500);
  };

  const values = useMemo(() => {
    return {
      modal,
      openModal,
      isClosing,
      closeModal,
      ModalContentEnum,
      RenderModal,
      isFormModal,
      isStrategyModal,
      isStrategyHistoryModal,
      isStrategyOrderDetails,
    };
  }, [modal, isClosing]);

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
};

export default ModalContext;
