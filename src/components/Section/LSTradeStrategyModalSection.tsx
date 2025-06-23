import { useEffect, useRef, useState } from 'react';
import { TradeStrategy } from '@/src/types';
import NewEntrySection from '@/src/components/Section/Strategy/NewEntrySection';
import Button from '@/src/components/Button/Button';

export type Strategy = TradeStrategy | null;

type Props = {
  data: TradeStrategy[];
  storedStrategy: Strategy;
  handleChoseLSStrategy: (el: Strategy) => void;
  resetTradeStrategy: () => void;
  closeModal: () => void;
  onOpenModal: () => void;
};

/*
const c = {
  path: '/strategy/BUY',
  one: 'oneElement',
  two: 'twoElements',
  three: 'threeElements',
  four: 'fourElements',
  fromFive: 'fromFiveElements',
  fromSeven: 'fromSevenElements',
  resetConfirmMsg: 'All stored Trade Strategies will be deleted!',
  deleteLSStrategyMsg: 'LS Strategy will be deleted!',
  resetDelay: 2000,
};
*/

const LSTradeStrategyModalSection = (props: Props) => {
  const [isScrollable, setIsScrollable] = useState(false);

  const { data, storedStrategy, handleChoseLSStrategy, resetTradeStrategy } =
    props; // resetState, closeModal

  const contentRef = useRef<HTMLDivElement>(null);

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
  }, [data.length, storedStrategy]);

  const handleItemClick = (symbol: string | null) => {
    if (symbol) {
      const strategy = data.find((el) => el.symbol === symbol);
      if (strategy) {
        handleChoseLSStrategy(strategy);
      }
    } else {
      handleChoseLSStrategy(null);
    }
  };

  /*
  const resetAllLSData = () => {
    if (!confirm(c.resetConfirmMsg)) return;
    deleteLSTradeStrategyData();
    resetState();
    closeModal();
  };
  // */

  // ---

  const listStyle = 'ls-trade-strategy-modal-section-list';

  return (
    <section
      className={`section ls-trade-strategy-modal${
        isScrollable ? '-scrollable' : ''
      }`}
    >
      <div
        ref={contentRef}
        className={`section-content ls-trade-strategy-modal${
          storedStrategy ? '-new-entry-block' : ''
        }`}
      >
        {storedStrategy ? (
          <NewEntrySection
            strategy={storedStrategy}
            resetTradeStrategy={resetTradeStrategy}
            handleGoBack={() => handleItemClick(null)}
          />
        ) : (
          <ul className={listStyle}>
            {data.map((strategy, idx) => {
              return (
                <li
                  key={idx}
                  className="ls-trade-strategy-modal-section-list-item"
                >
                  <Button
                    className="ls-trade-strategy-modal-section-list-item-button"
                    clickContent={() => handleItemClick(strategy.symbol)}
                  >
                    {strategy.symbol}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default LSTradeStrategyModalSection;
