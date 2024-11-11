'use client';

import { ChildrenProps } from '@/src/types';

type Props = ChildrenProps & {
  className?: string;
};

const ButtonFullScreenContainer = ({ children, className }: Props) => {
  return (
    <div className={`button-full-screen-container ${className}`}>
      {children}
    </div>
  );
};

export default ButtonFullScreenContainer;
