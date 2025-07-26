import { useEffect, useRef, useState } from 'react';
import { HistoryEntry } from '@/src/types';

type Props = {
  strategyData: string;
};

const StrategyHistoryModalSection = ({ strategyData }: Props) => {
  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log('strategy:', strategy);

    const checkHeight = () => {
      if (contentRef.current) {
        const ulHeight = contentRef.current.offsetHeight;
        const maxHeight = window.innerHeight;
        setIsScrollable(ulHeight > maxHeight);
      }
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);

    if (strategyData) {
      const _strategyData = JSON.parse(strategyData);
      setHistory(_strategyData.history);
    }
    return () => window.removeEventListener('resize', checkHeight);
  }, [strategyData]);

  useEffect(() => {
    if (!history) return;
    console.log('history:', history);
  }, [history]);

  // ---

  // const listStyle = 'ls-trade-strategy-modal-section-list';

  return (
    <section
      className={`section strategy-history-modal${
        isScrollable ? '-scrollable' : ''
      }`}
    >
      <div
        ref={contentRef}
        className={'section-content strategy-history-modal'}
        // className={`section-content strategy-history-modal${
        //   storedStrategy ? '-new-entry-block' : ''
        // }`}
      >
        {history && (
          <ul className={'strategy-history-modal-list'}>
            {history.map((el, idx) => {
              return (
                <li key={idx} className="strategy-history-modal-list-item">
                  <div>{el.d}</div>
                  <div>{el.a}</div>
                  <div>{el.b}</div>
                  <div>{el.s}</div>
                  {/* <Button
                    className="ls-trade-strategy-modal-section-list-item-button"
                    clickContent={() => handleItemClick(strategy.symbol)}
                  >
                    {strategy.symbol}
                  </Button> */}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default StrategyHistoryModalSection;
