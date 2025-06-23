/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import { IoMdTrash } from 'react-icons/io';
// import { TradeStrategy } from '@/src/types';
// import {
//   uniNumberFormatter,
//   normalizeKyivDate,
//   numberCutter,
// } from '@/src/utils';
import * as sec from '@/src/components/Section/Strategy/TradeStrategySection';
import NewEntrySection from '@/src/components/Section/Strategy/NewEntrySection';
// import Button from '@/src/components/Button/Button';

type Props = {
  // strategyHistory: sec.History;
  storedStrategy: sec.Strategy;
  // updateStrategyHistory: () => void;
  // createNewBuyTarget: () => void;
  resetTradeStrategy: (isClose: boolean) => void;
  // deleteHystory: () => void;
  // onCloseModal: () => void;
};

/*
type StringState = Dispatch<SetStateAction<string>>;
*/

// const c = {
//   amount: 'Amount',
//   buy: 'Buy',
//   sell: 'Sell',
//   targetButtonText: 'Create Target -10%',
// };

const TradeStrategyModalContentSection = (props: Props) => {
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  const {
    // strategyHistory,
    storedStrategy,
    // updateStrategyHistory,
    // createNewBuyTarget,
    resetTradeStrategy,
    // deleteHystory,
    // onCloseModal,
  } = props;

  useEffect(() => {
    if (storedStrategy) {
      setAmount(storedStrategy.amount.toString());
      setBuyPrice(storedStrategy.avgBuyPrice.toString());
      setSellPrice(storedStrategy.sellPrice.toString());
    }
  }, [storedStrategy]);

  useEffect(() => {
    if (storedStrategy && !amount) {
      setAmount(storedStrategy.amount.toString());
    }
  }, [amount]);

  useEffect(() => {
    if (storedStrategy && !buyPrice) {
      setBuyPrice(storedStrategy.avgBuyPrice.toString());
    }
  }, [buyPrice]);

  useEffect(() => {
    if (storedStrategy && !sellPrice) {
      setSellPrice(storedStrategy.sellPrice.toString());
    }
  }, [sellPrice]);

  // const NewEntry = ({ strategy }: { strategy: TradeStrategy }) => {
  //   const isAVGPrice = strategy.orders.split(', ').length > 1;

  //   const formatedBuyPrice = isAVGPrice
  //     ? uniNumberFormatter(+buyPrice)
  //     : buyPrice;

  //   const strategyDate = normalizeKyivDate(strategy.date, 'DD-MM-YY HH:mm');

  //   const newEntry = [
  //     { name: 'Date', value: strategyDate },
  //     { name: 'Exchange', value: strategy.exchange },
  //     { name: 'Symbol', value: strategy.symbol },
  //     { name: c.amount, value: amount },
  //     { name: c.buy, value: numberCutter(formatedBuyPrice, 3) },
  //     { name: c.sell, value: numberCutter(sellPrice, 3) },
  //     { name: 'Invested', value: strategy.invested },
  //     { name: 'Profit', value: numberCutter(strategy.profit, 3) },
  //     { name: 'Total', value: uniNumberFormatter(strategy.total) },
  //     { name: 'Orders', value: strategy.orders },
  //   ];

  //   return storedStrategy ? (
  //     <ul className="new-history-entry-list">
  //       {newEntry.map((el, idx) => {
  //         return (
  //           <li key={idx} className="new-history-entry-list-item">
  //             <span className="new-history-entry-list-item-key">{`${el.name}:`}</span>
  //             <span className="new-history-entry-list-item-val">
  //               {el.name === 'profit'
  //                 ? uniNumberFormatter(+el.value)
  //                 : el.value}
  //             </span>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   ) : (
  //     <div>No Trade Strategy</div>
  //   );
  // };

  return (
    <section className="section trade-strategy-modal">
      <div className="section-content trade-strategy-modal">
        <div className="new-history-entry-list-box">
          {storedStrategy && (
            <NewEntrySection
              strategy={storedStrategy}
              resetTradeStrategy={resetTradeStrategy}
              // storedStrategy={storedStrategy}
              // amount={amount}
              // buyPrice={buyPrice}
              // sellPrice={sellPrice}
            />
          )}

          {/* {storedStrategy && (
            <Button
              className="ls-trade-strategy-modal-section-reset-button"
              clickContent={() => resetTradeStrategy(true)}
            >
              <IoMdTrash size={24} fill="black" />
            </Button>
          )} */}

          {/* {storedStrategy && (
            <Button
            // className="ls-trade-strategy-modal-section-reset-button"
            // clickContent={onCloseModal}
            >
              {'<'}
            </Button>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default TradeStrategyModalContentSection;

/* 
const handleNumericInput = (val: string, state: StringState | null) => {
  if (!state) return;
  let value = val.replace(/,/g, '.');
  if (/^\d*\.?\d*$/.test(value)) {
    if (value.startsWith('.')) {
      value = `0${value}`;
    }
    state(value);
  } else {
    state(value.slice(0, -1));
  }
};

<Button
    style={{ marginBottom: '1rem' }}
    clickContent={createNewBuyTarget}
    disabled={!storedStrategy}
  >
    {c.targetButtonText}
</Button>

<div>
  <DefaultInput
    value={amount}
    handleChange={(val) => handleNumericInput(val, setAmount)}
  />
  <DefaultInput
    value={buyPrice}
    handleChange={(val: string) => handleNumericInput(val, setBuyPrice)}
  />
  <DefaultInput
    value={sellPrice}
    handleChange={(val: string) => handleNumericInput(val, setSellPrice)}
  />
</div>

<Button
  style={{ marginBottom: '1rem' }}
  clickContent={updateStrategyHistory}
  disabled={!storedStrategy}
>
  Save
</Button>
<Button clickContent={deleteHystory} disabled={!strategyHistory}>
  Delete Hystory
</Button>

{strategyHistory ? (
  <ul className="trade-strategy-modal-history-list">
    {strategyHistory.map((el, idx) => (
      <li key={idx} className="trade-strategy-modal-history-list-item">
        <span>{normalizeKyivDate(el.d, 'DD-MM-YY')}</span>
        <span>{el.a}</span>
        <span>{el.b}</span>
        <span>{el.s}</span>
      </li>
    ))}
  </ul>
) : (
  <div>No History</div>
)} */
