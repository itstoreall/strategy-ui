import { ReactNode } from 'react';
import { ChildrenProps } from '@/src/types';
import { ModalContentEnum } from '@/src/enums';

export type ModalContextProps = {
  modal: ModalContentEnum | null;
  openModal: (val: ModalContentEnum) => void;
  isClosing: boolean;
  closeModal(): void;
  ModalContentEnum: typeof ModalContentEnum;
  RenderModal: ({ children }: ChildrenProps) => JSX.Element;
  isFormModal: boolean;
};

export type CloseButtonProps = { closeModal: () => void };

export type CommonModalProps = {
  children: ReactNode;
  className: string;
  CloseButton?: ({ closeModal }: CloseButtonProps) => JSX.Element;
};
