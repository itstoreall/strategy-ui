'use client';

import { ChildrenProps } from '@/src/types';

type Props = ChildrenProps & {
  className?: string;
};

const SectionsContainer = ({ children, className }: Props) => {
  return <div className={`sections-container ${className}`}>{children}</div>;
};

export default SectionsContainer;
