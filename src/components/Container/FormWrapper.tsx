'use client';

import { ChildrenProps } from '@/src/types';

type Props = ChildrenProps & {
  className?: string;
};

const FormWrapperContainer = ({ children, className }: Props) => {
  return (
    <div className={`form-wrapper-container ${className}`}>{children}</div>
  );
};

export default FormWrapperContainer;
