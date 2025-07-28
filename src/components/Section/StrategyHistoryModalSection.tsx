import { useEffect, useRef, useState } from 'react';
import { HistoryEntry } from '@/src/types';
import { normalizeKyivDate } from '@/src/utils';

type Props = {
  strategyData: string;
};

const StrategyHistoryModalSection = ({ strategyData }: Props) => {
  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (strategyData) {
      const _strategyData = JSON.parse(strategyData);
      setHistory(_strategyData.history);
    }
  }, [strategyData]);

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current) {
        const ulHeight = contentRef.current.offsetHeight;
        const maxHeight = window.innerHeight;
        setIsScrollable(ulHeight > maxHeight);
      }
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [history]);

  // ---

  /*
  const d = [
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
  ];
  // */

  const HistoryListItem = ({
    trade,
  }: {
    trade: { d: number; a: number; b: number; s: number };
  }) => {
    return (
      <li className="strategy-history-modal-list-item">
        <div className="strategy-history-list-item-content-block">
          <span className="strategy-history-list-item-content">
            <span>{'Date:'}</span>
            <span>{normalizeKyivDate(trade.d, 'DD-MM-YY HH:mm')}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{`Amount (${'BTC'}):`}</span>
            <span>{trade.a}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{'Buy:'}</span>
            <span>{`${trade.b} $`}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{'Sell:'}</span>
            <span>{`${trade.s} $`}</span>
          </span>
        </div>
      </li>
    );
  };

  return (
    <section
      className={`section strategy-history-modal${
        isScrollable ? '-scrollable' : ''
      }`}
    >
      <div
        ref={contentRef}
        className={'section-content strategy-history-modal'}
      >
        {history && (
          <>
            <ul className={'strategy-history-modal-list'}>
              {/* {d.map((el, idx) => { */}
              {history.map((el, idx) => {
                return <HistoryListItem key={idx} trade={el} />;
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default StrategyHistoryModalSection;
