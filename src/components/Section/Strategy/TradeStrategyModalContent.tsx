import {
  History,
  Strategy,
} from '@/src/components/Section/Strategy/TradeStrategySection';
import Button from '@/src/components/Button/Button';

// type Strategy = TradeStrategy | null;

type Props = {
  strategyHistory: History;
  storedStrategy: Strategy;
  updateStrategyHistory: () => void;
  resetTradeStrategy: (isClose: boolean) => void;
  deleteHystory: () => void;
};

const TradeStrategyModalContent = (props: Props) => {
  // const [storedStrategy, setStoredStrategy] = useState<Strategy>(null);

  const {
    strategyHistory,
    storedStrategy,
    updateStrategyHistory,
    resetTradeStrategy,
    deleteHystory,
  } = props;

  /*
  useEffect(() => {
    const storedData = getLocalStorageData();
    const _storedStrategy = storedData
      ? storedData.find((storedStrategy: TradeStrategy) => {
          return storedStrategy.symbol === token.symbol;
        })
      : null;
    setStoredStrategy(_storedStrategy ?? null);
  }, []);
  */

  // useEffect(() => {
  //   if (isSuccessUpdateStrategy) {
  //     console.log('isSuccessUpdateStrategy:', isSuccessUpdateStrategy);
  //     resetTradeStrategy(false);
  //     setStoredStrategy(null);
  //   }
  // }, [isSuccessUpdateStrategy]);

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
            <span>{'Price:'}</span>
            <span>{storedStrategy.price}</span>
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
            <span>{'Total:'}</span>
            <span>{storedStrategy.total}</span>
          </span>
          <span className="trade-strategy-modal-data-element">
            <span>{'Orders:'}</span>
            <span>{storedStrategy.orders}</span>
          </span>
        </div>
      ) : (
        <div>No Trade Strategy</div>
      )}

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
        strategyHistory.map((el, idx) => <div key={idx}>{el.amount}</div>)
      ) : (
        <div>No History</div>
      )}
    </>
  );
};

export default TradeStrategyModalContent;
