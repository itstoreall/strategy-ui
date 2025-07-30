/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import * as sec from '@/src/components/Section/Strategy/TradeStrategySection';
import NewEntrySection from '@/src/components/Section/Strategy/NewEntrySection';

type Props = {
  storedStrategy: sec.Strategy;
  resetTradeStrategy: (isClose: boolean) => void;
};

const TradeStrategyModalContentSection = (props: Props) => {
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  const { storedStrategy, resetTradeStrategy } = props;

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

  return (
    <section className="section trade-strategy-modal">
      <div className="section-content trade-strategy-modal">
        <div className="new-history-entry-list-box">
          {storedStrategy && (
            <NewEntrySection
              strategy={storedStrategy}
              resetTradeStrategy={resetTradeStrategy}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TradeStrategyModalContentSection;
