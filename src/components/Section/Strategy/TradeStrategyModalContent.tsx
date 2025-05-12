import { TradeStrategy } from '@/src/types';
import { TradeStrategyProps } from '@/src/components/Section/Strategy/TradeStrategySection';
import Button from '@/src/components/Button/Button';

type Props = Pick<TradeStrategyProps, 'token'> & {
  getLocalStorageData: () => TradeStrategy[] | null;
  saveTradeStrategy: () => void;
  resetTradeStrategy: () => void;
  deleteHystory: () => void;
};

const TradeStrategyModalContent = (props: Props) => {
  const {
    token,
    getLocalStorageData,
    saveTradeStrategy,
    resetTradeStrategy,
    deleteHystory,
  } = props;

  const storedData = getLocalStorageData();
  const storedStrategy = storedData
    ? storedData.find((storedStrategy: TradeStrategy) => {
        return storedStrategy.symbol === token.symbol;
      })
    : null;

  // updateStratedy(strategyId: number, params: UpdateStrategyParams)

  return (
    <>
      {storedStrategy ? (
        <div className="trade-strategy-modal-data">
          <span className="trade-strategy-modal-data-element">
            <span>{'Symbol:'}</span>
            <span>{storedStrategy.symbol}</span>
          </span>
          <span className="trade-strategy-modal-data-element">
            <span>{'Exchange:'}</span>
            <span>{storedStrategy.exchange}</span>
          </span>
          <span className="trade-strategy-modal-data-element">
            <span>{'Amount:'}</span>
            <span>{storedStrategy.amount}</span>
          </span>
          <span className="trade-strategy-modal-data-element">
            <span>{'AVG:'}</span>
            <span>{storedStrategy.avg}</span>
          </span>
          <span className="trade-strategy-modal-data-element">
            <span>{'Invested:'}</span>
            <span>{storedStrategy.invested}</span>
          </span>
          <span className="trade-strategy-modal-data-element">
            <span>{'Profit:'}</span>
            <span>{storedStrategy.profit}</span>
          </span>
          <span className="trade-strategy-modal-data-element">
            <span>{'Unrealized:'}</span>
            <span>{storedStrategy.unrealized}</span>
          </span>
          <span className="trade-strategy-modal-data-element">
            <span>{'Orders:'}</span>
            <span>{storedStrategy.orders}</span>
          </span>
        </div>
      ) : (
        <div>No Trade Strategy</div>
      )}

      <Button style={{ marginBottom: '1rem' }} clickContent={saveTradeStrategy}>
        Save
      </Button>
      <Button
        style={{ marginBottom: '1rem' }}
        clickContent={resetTradeStrategy}
      >
        Clear Storage
      </Button>
      <Button clickContent={deleteHystory}>Delete Hystory</Button>
    </>
  );
};

export default TradeStrategyModalContent;
