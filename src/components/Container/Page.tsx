import { ChildrenProps } from '@/src/types';
// import { useEffect, useRef } from 'react';

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

const PageContainer = ({ label, children }: ContainerProps) => {
  // const ref = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleEvent = (event: Event) => {
  //     console.log(`Event triggered: ${event.type}`, ref.current);
  //   };

  //   if (ref.current && ref.current.offsetHeight > 700 && label === 'MAIN') {
  //     console.log(1, ref.current.offsetHeight);
  //     ref.current?.addEventListener('resize', handleEvent);
  //   }
  // }, [ref.current?.offsetHeight]);

  // useEffect(() => {
  //   const handleEvent = (event: Event) => {
  //     console.log(`Event triggered: ${event.type}`, ref.current);
  //   };

  //   const handleResize = (entries: ResizeObserverEntry[]) => {
  //     for (let entry of entries) {
  //       const { height } = entry.contentRect;
  //       ref.current?.addEventListener('scroll', handleEvent);
  //       console.log(
  //         `Resize event triggered. New height: ${height}`,
  //         ref.current
  //       );
  //     }
  //   };

  //   const observer = label === 'MAIN' ? new ResizeObserver(handleResize) : null;

  //   if (ref.current && observer) {
  //     observer.observe(ref.current);
  //     if (ref.current.offsetHeight > 700 && label === 'MAIN') {
  //       console.log(1, ref.current.offsetHeight);
  //     }
  //   }

  //   return () => {
  //     if (ref.current && observer) {
  //       observer.unobserve(ref.current);
  //     }
  //   };
  // }, [label]);

  return <div className={`page-container ${label}`}>{children}</div>;
};

export default PageContainer;
