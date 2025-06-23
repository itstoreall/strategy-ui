import { TradeStrategy } from '@/src/types';
import {
  uniNumberFormatter,
  normalizeKyivDate,
  numberCutter,
} from '@/src/utils';
import Button from '../../Button/Button';
import { IoMdTrash } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';

type Props = {
  strategy: TradeStrategy;
  resetTradeStrategy: (is: boolean) => void;
  handleGoBack?: () => void;
};

const c = {
  amount: 'Amount',
  buy: 'Buy',
  sell: 'Sell',
  targetButtonText: 'Create Target -10%',
};

const NewEntrySection = ({
  strategy,
  resetTradeStrategy,
  handleGoBack,
}: Props) => {
  const isAVGPrice = strategy.orders.split(', ').length > 1;

  const formatedBuyPrice = isAVGPrice
    ? uniNumberFormatter(+strategy.avgBuyPrice)
    : strategy.avgBuyPrice;

  const strategyDate = normalizeKyivDate(strategy.date, 'DD-MM-YY HH:mm');

  const newEntry = [
    { name: 'Date', value: strategyDate },
    { name: 'Exchange', value: strategy.exchange },
    { name: 'Symbol', value: strategy.symbol },
    { name: c.amount, value: strategy.amount },
    { name: c.buy, value: numberCutter(formatedBuyPrice, 3) },
    { name: c.sell, value: numberCutter(strategy.sellPrice, 3) },
    { name: 'Invested', value: strategy.invested },
    { name: 'Profit', value: numberCutter(strategy.profit, 3) },
    { name: 'Total', value: uniNumberFormatter(strategy.total) },
    { name: 'Orders', value: strategy.orders },
  ];

  return strategy ? (
    <section className="section new-entry">
      <ul className="new-history-entry-list">
        {newEntry.map((el, idx) => {
          return (
            <li key={idx} className="new-history-entry-list-item">
              <span className="new-history-entry-list-item-key">{`${el.name}:`}</span>
              <span className="new-history-entry-list-item-val">
                {el.name === 'profit'
                  ? uniNumberFormatter(+el.value)
                  : el.value}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="new-entry-section-button-block">
        <Button
          className="new-entry-section-reset-button"
          clickContent={() => resetTradeStrategy(true)}
        >
          <IoMdTrash size={24} fill="black" />
        </Button>

        {handleGoBack && (
          <div className="ls-trade-strategy-modal-section-go-back-button-box">
            <Button
              className="new-entry-section-go-back-button"
              clickContent={handleGoBack}
            >
              <IoArrowUndoSharp size={22} fill="black" />
            </Button>
          </div>
        )}
      </div>
    </section>
  ) : (
    <div>No Trade Strategy</div>
  );

  /*
  return strategy ? (
    <ul className="new-history-entry-list">
      {newEntry.map((el, idx) => {
        return (
          <li key={idx} className="new-history-entry-list-item">
            <span className="new-history-entry-list-item-key">{`${el.name}:`}</span>
            <span className="new-history-entry-list-item-val">
              {el.name === 'profit' ? uniNumberFormatter(+el.value) : el.value}
            </span>
          </li>
        );
      })}
    </ul>
  ) : (
    <div>No Trade Strategy</div>
  );
  */
};

export default NewEntrySection;
