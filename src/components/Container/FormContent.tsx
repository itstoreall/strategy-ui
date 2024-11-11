'use client';

import { ChildrenProps } from '@/src/types';

type Props = ChildrenProps & {
  className?: string;
};

const FormContentContainer = ({ children, className }: Props) => {
  return (
    <div className={`form-content-container ${className}`}>{children}</div>
  );
};

export default FormContentContainer;
