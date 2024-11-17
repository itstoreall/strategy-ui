import { ChildrenProps } from '@/src/types';

export enum Label {
  Auth = 'AUTH',
  Header = 'HEADER',
  Main = 'MAIN',
  Chart = 'CHART',
  Footer = 'FOOTER',
}

export type ContainerProps = ChildrenProps & {
  label: Label;
};

const PageContainer = ({ label, children }: ContainerProps) => (
  <div className={`page-container ${label}`}>{children}</div>
);

export default PageContainer;
