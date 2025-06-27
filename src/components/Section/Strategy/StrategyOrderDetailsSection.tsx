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
  // c: { [key: string]: string | number };
};

type Prices = {
  buy: { key: string; val: string };
  sell: { key: string; val: string };
} | null;

type FuturePriceProps = {
  symbol: string;
  label: string;
  val: string;
};

type HandlePercentPriceArgs = {
  buyKey: number;
  sellKey: number;
  price: number;
  minusPercent: u.PricePercent;
  plusPercent: u.PricePercent;
  cut: number;
};

const c = {
  twoPercent: 2,
  fourPercent: 4,
  sevenPercent: 7,
  tenPercent: 10,
  id: 'ID',
  price: 'Price',
  amount: 'Amount',
  invested: 'Invested',
  profit: 'Profit',
  losses: 'Losses',
};

const StrategyOrderDetailsSection = ({ order, currentPrice }: Props) => {
  const [isCustom, setIsCustom] = useState<boolean | null>(null);
  const [prices, setPrices] = useState<Prices>(null);

  const { closeModal } = useModal();

  const isCustomToken = customTokens.includes(order.symbol);
  const isBTC = order.symbol === 'BTC';

  useEffect(() => {
    if (order) {
      if (isBTC) {
        return;
      } else if (isCustomToken) {
        setIsCustom(true);
      } else {
        setIsCustom(false);
      }
    }
  }, [order]);

  useEffect(() => {
    if (isBTC) {
      handlePrice({
        buyKey: c.twoPercent,
        sellKey: c.fourPercent,
        price: order.price,
        minusPercent: 0.02,
        plusPercent: 0.04,
        cut: 0,
      });
    } else if (isCustom) {
      handlePrice({
        buyKey: c.fourPercent,
        sellKey: c.sevenPercent,
        price: order.price,
        minusPercent: 0.04,
        plusPercent: 0.07,
        cut: 3,
      });
    } else if (!isCustom && isCustom !== null) {
      handlePrice({
        buyKey: c.tenPercent,
        sellKey: c.tenPercent,
        price: order.price,
        minusPercent: 0.1,
        plusPercent: 0.1,
        cut: 3,
      });
    }
  }, [isCustom]);

  // ---

  const handlePrice = (args: HandlePercentPriceArgs) => {
    const { buyKey, sellKey, price, minusPercent, plusPercent, cut } = args;
    const minusPercentPrice = u.minusPercent(price, minusPercent);
    const minusValue = u.numberCutter(minusPercentPrice, cut);
    const plusPercentPrice = u.plusPercent(order.price, plusPercent);
    const plusValue = u.numberCutter(plusPercentPrice, cut);
    setPrices({
      buy: { key: `-${buyKey}%`, val: minusValue },
      sell: { key: `+${sellKey}%`, val: plusValue },
    });
  };

  const calculatedProfit = currentPrice * order.amount - order.fiat;
  const isProfit = calculatedProfit > 0;
  const profitLabel = isProfit ? c.profit : c.losses;
  const profitValue = isProfit
    ? `${calculatedProfit.toFixed(2)}`
    : `${calculatedProfit.toFixed(2)}`;

  const dateParts = u
    .normalizeISODate(order.createdAt, 'DD-MM-YY HH:mm')
    .split(' ');

  const FuturePrice = ({ symbol, label, val }: FuturePriceProps) => {
    const futurePrice = u.handlePriceDisplay(symbol, val, 3);
    // const futurePrice = u.handlePriceDisplay(symbol, 203000.234567, 3);
    return (
      <span onClick={() => u.copyToClipboard(val)}>
        <span>{label}</span>
        <span>{`${futurePrice} $`}</span>
        {/* <span>{`${u.numberCutter(203000.234567, 3)} $`}</span> */}
      </span>
    );
  };

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
                    {/* <span>{`${u.numberCutter(203000.56789, 3)}`}</span> */}
                    <span>{`${u.numberCutter(order.price, 3)}`}</span>
                  </span>
                </span>
                <span className="strategy-order-details-info-block">
                  <span className="details-info-key">{`${c.amount} (${order.symbol}):`}</span>
                  <span className="details-info-amount">
                    {/* <span>{u.numberCutter(0.000054321, 3)}</span> */}
                    <span>{u.numberCutter(order.amount, 3)}</span>
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
                  <FuturePrice
                    symbol={order.symbol}
                    label={prices.buy.key}
                    val={prices.buy.val}
                  />
                  <FuturePrice
                    symbol={order.symbol}
                    label={prices.sell.key}
                    val={prices.sell.val}
                  />
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
