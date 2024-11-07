/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useModals from '@/src/hooks/useModal';
import { CommonModalProps } from './types';

const CommonModal = (props: CommonModalProps) => {
  const { children, className, CloseButton } = props;

  const { isClosing, closeModal } = useModals();

  useEffect(() => {
    window.addEventListener('keyup', keyUpClose);
    return () => window.removeEventListener('keyup', keyUpClose);
  }, []);

  const keyUpClose = (event: { key: string }) =>
    event.key === 'Escape' && closeModal();

  const fadeStyle = isClosing ? 'fadeOut' : '';
  const backdropStyle = `modal-backdrop ${className} ${fadeStyle}`;

  return (
    <div className={backdropStyle} onMouseDown={() => closeModal()}>
      <div className={'modal'} onMouseDown={(e) => e.stopPropagation()}>
        {CloseButton ? <CloseButton {...{ closeModal }} /> : null}
        {children}
      </div>
    </div>
  );
};

export default CommonModal;
