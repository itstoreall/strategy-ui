import { useEffect, useRef, useState } from 'react';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';
import { HistoryEntry } from '@/src/types';
import { normalizeKyivDate } from '@/src/utils';
import * as confirmMsg from '@/src/messages/confirm';
import Button from '@/src/components/Button/Button';

type Props = {
  strategyData: string;
};

type ListItemProps = {
  trade: { d: number; a: number; b: number; s: number };
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
        const maxHeight = 500;
        // const maxHeight = window.innerHeight;
        setIsScrollable(ulHeight > maxHeight);
      }
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [history]);

  // ---

  // /*
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
      d: 1753544161743,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161744,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161745,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161746,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161747,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161748,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161749,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161750,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161751,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161752,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161753,
      s: 118058,
    },
  ];
  // */

  const HistoryListItem = ({ trade }: ListItemProps) => {
    const recoverTrade = (id: number) => {
      if (confirm(confirmMsg.recoverTrade(id))) {
        console.log('recover...');
      }
    };

    const deleteTrade = (id: number) => {
      if (confirm(confirmMsg.deleteTrade(id))) {
        console.log('delete...');
      }
    };

    return (
      <li className="strategy-history-modal-list-item">
        <div className="strategy-history-list-item-controls-block">
          <Button
            className="new-entry-section-reset-button"
            clickContent={() => recoverTrade(trade.d)}
          >
            <RiExchangeDollarLine size={24} fill="black" />
          </Button>
          <Button
            className="new-entry-section-reset-button"
            clickContent={() => deleteTrade(trade.d)}
          >
            <IoMdTrash size={24} fill="black" />
          </Button>
        </div>
        <div className="strategy-history-list-item-content-block">
          <span className="strategy-history-list-item-content">
            <span>{'ID:'}</span>
            <span>{trade.d}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{`Amount (${'BTC'}):`}</span>
            <span>{trade.a}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{'Buy (AVG):'}</span>
            <span>{`${trade.b} $`}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{'Sell:'}</span>
            <span>{`${trade.s} $`}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{'Date:'}</span>
            <span>{normalizeKyivDate(trade.d, 'DD-MM-YY HH:mm')}</span>
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
              {/* {history.map((el, idx) => { */}
              {d.map((el, idx) => {
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
