import { CSSProperties, useEffect, useState } from 'react';

const DotsLoader = ({ inlineStyle }: { inlineStyle?: CSSProperties }) => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prev) => {
        switch (prev) {
          case '.':
            return '..';
          case '..':
            return '...';
          case '...':
            return '';
          default:
            return '.';
        }
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return <span style={{ width: '30px', ...inlineStyle }}>{dots}</span>;
};

export default DotsLoader;
