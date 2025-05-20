import { TradeStrategy } from '@/src/types';
import { uniNumberFormatter } from '@/src/utils';
import * as sec from '@/src/components/Section/Strategy/TradeStrategySection';
import Button from '@/src/components/Button/Button';

type Props = {
  strategyHistory: sec.History;
  storedStrategy: sec.Strategy;
  updateStrategyHistory: () => void;
  resetTradeStrategy: (isClose: boolean) => void;
  deleteHystory: () => void;
};

const TradeStrategyModalContent = (props: Props) => {
  const {
    strategyHistory,
    storedStrategy,
    updateStrategyHistory,
    resetTradeStrategy,
    deleteHystory,
  } = props;

  const NewEntry = ({ strategy }: { strategy: TradeStrategy }) => {
    const isAVGPrice = strategy.orders.split(', ').length > 1;

    const buyPrice = isAVGPrice
      ? uniNumberFormatter(strategy.avgBuyPrice)
      : strategy.avgBuyPrice;

    const newEntry = [
      { name: 'symbol', value: strategy.symbol },
      { name: 'exchange', value: strategy.exchange },
      { name: 'amount', value: strategy.amount },
      { name: 'buy price (AVG)', value: buyPrice },
      { name: 'sell price', value: strategy.sellPrice },
      { name: 'invested', value: strategy.invested },
      { name: 'profit', value: strategy.profit },
      { name: 'total', value: uniNumberFormatter(strategy.total) },
      { name: 'orders', value: strategy.orders },
    ];

    return storedStrategy ? (
      <ul className="new-history-entry-list">
        {newEntry.map((el, idx) => (
          <li key={idx} className="new-history-entry-list-item">
            <span>{`${el.name}:`}</span>
            <span>
              {el.name === 'profit' ? uniNumberFormatter(+el.value) : el.value}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <div>No Trade Strategy</div>
    );
  };

  return (
    <>
      <div className="trade-strategy-modal-new-history-entry-block"></div>
      {storedStrategy && <NewEntry strategy={storedStrategy} />}

      <Button
        style={{ marginBottom: '1rem' }}
        clickContent={updateStrategyHistory}
      >
        Save
      </Button>
      <Button
        style={{ marginBottom: '1rem' }}
        clickContent={() => resetTradeStrategy(true)}
      >
        Clear Storage
      </Button>
      <Button clickContent={deleteHystory}>Delete Hystory</Button>

      {strategyHistory ? (
        <ul className="trade-strategy-modal-history-list">
          {strategyHistory.map((el, idx) => (
            <li key={idx} className="trade-strategy-modal-history-list-item">
              <span>{el.d}</span>
              <span>{el.a}</span>
              <span>{el.b}</span>
              <span>{el.s}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>No History</div>
      )}
    </>
  );
};

export default TradeStrategyModalContent;
