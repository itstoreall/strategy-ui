import { TradeStrategy } from '@/src/types';
import Link from 'next/link';

type Props = {
  data: TradeStrategy[];
  closeModal: () => void;
  resetState: () => void;
};

const c = {
  path: '/strategy/BUY',
  one: 'oneElement',
  two: 'twoElements',
  three: 'threeElements',
  four: 'fourElements',
  more: 'fromFiveElements',
  resetDelay: 2000,
};

const LSTradeStrategyModalSection = (props: Props) => {
  const { data, resetState, closeModal } = props;

  /*
  const d = [
    { symbol: '1' },
    { symbol: '2' },
    { symbol: '3' },
    { symbol: '4' },
    { symbol: '5' },
  ];
  */

  const rowStyle =
    data.length === 1
      ? c.one
      : data.length === 2
      ? c.two
      : data.length === 3
      ? c.three
      : data.length === 4
      ? c.four
      : c.more;

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
    </section>
  );
};

export default LSTradeStrategyModalSection;
