import { ChildrenProps } from '@/src/types';

export enum Label {
  Header = 'HEADER',
  Main = 'MAIN',
  Footer = 'FOOTER',
}

export type ContainerProps = ChildrenProps & {
  label: Label;
};

const PageContainer = ({ label, children }: ContainerProps) => (
  <div className={`page-container ${label}`}>{children}</div>
);

export default PageContainer;
