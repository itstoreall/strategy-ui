/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useModal from '@/src/hooks/useModal';
import { customTokens } from '@/src/config';
import { Order } from '@/src/types';
import * as u from '@/src/utils';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import FormWrapper from '@/src/components/Container/FormWrapper';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';

type Props = {
  order: Order;
  currentPrice: number;
  c: { [key: string]: string | number };
};

type Prices = {
  buy: { key: string; val: string };
  sell: { key: string; val: string };
} | null;

const StrategyOrderDetailsSection = ({ order, currentPrice, c }: Props) => {
  const [isCustom, setIsCustom] = useState<boolean | null>(null);
  const [prices, setPrices] = useState<Prices>(null);

  const { closeModal } = useModal();

  const isCustomToken = customTokens.includes(order.symbol);

  useEffect(() => {
    if (order) {
      if (isCustomToken) {
        setIsCustom(true);
      } else {
        setIsCustom(false);
      }
    }
  }, [order]);

  useEffect(() => {
    if (isCustom) {
      const minusFourPercentPrice = u.minusPercent(order.price, 0.04);
      const minusFourFormatted = u.numberCutter(minusFourPercentPrice, 3);
      const plusSevenPercentPrice = u.plusPercent(order.price, 0.07);
      const plusSevenFormatted = u.numberCutter(plusSevenPercentPrice, 3);
      setPrices({
        buy: { key: `-${c.fourPercent}%`, val: minusFourFormatted },
        sell: { key: `+${c.sevenPercent}%`, val: plusSevenFormatted },
      });
    } else {
      const minusTenPercentPrice = u.minusPercent(order.price, 0.1);
      const minusTenFormatted = u.numberCutter(minusTenPercentPrice, 3);
      const plusTenPercentPrice = u.plusPercent(order.price, 0.1);
      const pluseTenFormatted = u.numberCutter(plusTenPercentPrice, 3);
      setPrices({
        buy: { key: `-${c.tenPercent}%`, val: minusTenFormatted },
        sell: { key: `+${c.tenPercent}%`, val: pluseTenFormatted },
      });
    }
  }, [isCustom]);

  const calculatedProfit = currentPrice * order.amount - order.fiat;
  const isProfit = calculatedProfit > 0;
  const profitLabel = isProfit ? c.profit : c.losses;
  const profitValue = isProfit
    ? `${calculatedProfit.toFixed(2)}`
    : `${calculatedProfit.toFixed(2)}`;

  const dateParts = u
    .normalizeISODate(order.createdAt, 'DD-MM-YY HH:mm')
    .split(' ');

  return (
    <section className="section strategy-order-details">
      <FormWrapper className="create-order-form-wrapper">
        <FormBackdropContainer>
          <Title tag={'h3'} className="form-title" text={'Details'} />

          <FormContentContainer>
            <div className={'section-content strategy-order-details'}>
              <div className="strategy-order-details-heading">
                <span className={`details-heading-exchange ${order.exchange}`}>
                  <span>{order.exchange}</span>
                  {/* {'BINANCE'} */}
                  {/* {'MEXC'} */}
                  {/* {'BYBIT'} */}
                  {/* {'OKX'} */}
                </span>
                <span className="details-heading-info-box">
                  <span className="heading-info-date">{`${dateParts[0]} (${dateParts[1]})`}</span>
                  <span className="heading-info-id">{`${c.id}: ${order.id}`}</span>
                </span>
              </div>

              <div className="strategy-order-details-info">
                <span className="strategy-order-details-info-block">
                  <span className="details-info-key">{`${c.price} ($):`}</span>
                  <span className="details-info-price">
                    {/* <span>{`${203000.567}`}</span> */}
                    <span>{`${order.price}`}</span>
                  </span>
                </span>
                <span className="strategy-order-details-info-block">
                  <span className="details-info-key">{`${c.amount} (${order.symbol}):`}</span>
                  <span className="details-info-amount">
                    {/* <span>{0.0000521}</span> */}
                    <span>{order.amount}</span>
                  </span>
                </span>
              </div>

              <div className="strategy-order-details-results">
                <span className="details-results-invested">
                  <span>{`${c.invested}:`}</span>
                  <span>{`${order.fiat} $`}</span>
                </span>
                <span
                  className={`details-results-profit ${
                    isProfit ? 'profit-color' : 'losses-color'
                  }`}
                >
                  <span>{`${profitLabel}:`}</span>
                  <span>{`${profitValue} $`}</span>
                </span>
              </div>

              {prices && (
                <div className="strategy-order-details-prices">
                  <span onClick={() => u.copyToClipboard(prices.buy.val)}>
                    <span>{prices.buy.key}</span>
                    <span>{`${prices.buy.val} $`}</span>
                    {/* <span>{`${203000.567} $`}</span> */}
                  </span>
                  <span onClick={() => u.copyToClipboard(prices.sell.val)}>
                    <span>{prices.sell.key}</span>
                    <span>{`${prices.sell.val} $`}</span>
                    {/* <span>{`${203000.567} $`}</span> */}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                clickContent={() => setIsCustom((prev) => !prev)}
                type="button"
                disabled={!prices || !isCustomToken}
              >
                {prices
                  ? isCustomToken
                    ? `Switch to ${
                        isCustom
                          ? `${c.tenPercent}/${c.tenPercent}`
                          : `${c.fourPercent}/${c.sevenPercent}`
                      }`
                    : 'Fixed'
                  : 'Calculating...'}
              </Button>

              <Button
                style={{ flex: '0 0 47px', backgroundColor: '#f25c5e' }}
                clickContent={closeModal}
                type="button"
              >
                {null}
              </Button>
            </div>
          </FormContentContainer>
        </FormBackdropContainer>
      </FormWrapper>
    </section>
  );
};

export default StrategyOrderDetailsSection;
