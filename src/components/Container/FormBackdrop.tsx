'use client';

import { ChildrenProps } from '@/src/types';

type Props = ChildrenProps & {
  className?: string;
};

const FormBackdropContainer = ({ children, className }: Props) => {
  return (
    <div className={`form-backdrop-container ${className}`}>{children}</div>
  );
};

export default FormBackdropContainer;
