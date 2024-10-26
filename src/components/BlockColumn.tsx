import { CSSProperties } from 'react';

type Props = { children: React.ReactNode; gap: string };

const BlockColumn = ({ children, gap }: Props) => {
  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap,
  };

  return <div style={style}>{children}</div>;
};

export default BlockColumn;
