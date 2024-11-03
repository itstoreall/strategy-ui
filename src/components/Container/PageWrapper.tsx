import { ChildrenProps } from '@/src/types';

const PageWrapperContainer = ({ children }: ChildrenProps) => (
  <div className="page-wrapper-container">{children}</div>
);

export default PageWrapperContainer;
