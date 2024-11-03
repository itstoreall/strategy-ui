'use client';

import { useEffect } from 'react';
import { ChildrenProps } from '@/src/types';

const PageWrapperContainer = ({ children }: ChildrenProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="page-wrapper-container">{children}</div>;
};

export default PageWrapperContainer;
