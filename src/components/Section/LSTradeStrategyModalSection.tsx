import Link from 'next/link';
import { IoMdTrash } from 'react-icons/io';
import { TradeStrategy } from '@/src/types';
import { deleteLSTradeStrategyData } from '@/src/utils';
import Button from '@/src/components/Button/Button';

type Props = {
  data: TradeStrategy[];
  // data: { symbol: string }[];
  closeModal: () => void;
  resetState: () => void;
};

const c = {
  path: '/strategy/BUY',
  one: 'oneElement',
  two: 'twoElements',
  three: 'threeElements',
  four: 'fourElements',
  fromSeven: 'fromSevenElements',
  resetConfirmMsg: 'All stored Trade Strategies will be deleted!',
  resetDelay: 2000,
};

const LSTradeStrategyModalSection = (props: Props) => {
  const { data, resetState, closeModal } = props;

  const resetAllLSData = () => {
    if (!confirm(c.resetConfirmMsg)) return;
    deleteLSTradeStrategyData();
    resetState();
    closeModal();
  };

  // ---

  const rowStyle =
    data.length === 1
      ? c.one
      : data.length === 2
      ? c.two
      : data.length === 3
      ? c.three
      : data.length === 4
      ? c.four
      : data.length > 6 && data.length < 10
      ? c.fromSeven
      : '';

  const listStyle = `ls-trade-strategy-modal-section-list ${rowStyle}`;

  return (
    <section className="section ls-trade-strategy-modal">
      <ul className={listStyle}>
        {data.map((strategy, idx) => {
          const strategyPath = `${c.path}-${strategy.symbol}`;

          const handleLinkClick = () => {
            setTimeout(() => {
              closeModal();
              resetState();
            }, c.resetDelay);
          };

          return (
            <li key={idx} className="ls-trade-strategy-modal-section-list-item">
              <Link
                className={'ls-trade-strategy-modal-section-list-item-link'}
                href={strategyPath}
                onClick={handleLinkClick}
              />
              <span className="ls-trade-strategy-modal-section-token-symbol">
                {strategy.symbol}
              </span>
            </li>
          );
        })}
      </ul>

      <Button
        className="ls-trade-strategy-modal-section-reset-button"
        clickContent={resetAllLSData}
      >
        <IoMdTrash size={24} fill="black" />
      </Button>
    </section>
  );
};

export default LSTradeStrategyModalSection;
