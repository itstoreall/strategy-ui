/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Order, Strategy } from '@/src/types';
import { ExchangeEnum } from '@/src/enums';
import * as u from '@/src/utils';
import StrategyOrderEditMenuSection from '@/src/components/Section/StrategyOrderEditMenuSection';

type Props = {
  sortedOrders: Order[];
  strategy: Strategy;
  filterExchange: string;
  currentPrice: number;
  isEditMenu: boolean;
  handleFilterExchange: (val: ExchangeEnum) => void;
};

const c = {
  customBuyTargetPercent: 4,
  customSuccessPercent: 7,
  success: 'success',
  positiveValue: 'positiveValue',
  negativeValue: 'negativeValue',
  failed: 'failed',
  id: 'ID',
  price: 'Price',
  amount: 'Amount',
  invested: 'Invested',
  profit: 'Profit',
  losses: 'Losses',
  exchange: 'Exchange',
  created: 'Created',
  noOrders: 'No orders!',
};

const customTokens = [
  'SOL',
  'XRP',
  'LINK',
  'QNT',
  'COMP',
  'UNI',
  'DOGE',
  'FIL',
];

const StrategyOrderListSection = (props: Props) => {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const {
    sortedOrders,
    strategy,
    filterExchange,
    currentPrice,
    isEditMenu,
    handleFilterExchange,
  } = props;

  useEffect(() => {
    const filteredOrders = filterExchange
      ? filterExchange !== ExchangeEnum.All
        ? sortedOrders.filter(
            (order: Order) => order.exchange === filterExchange
          )
        : sortedOrders
      : sortedOrders;
    if (filteredOrders?.length === 0 && sortedOrders?.length) {
      handleFilterExchange(ExchangeEnum.All);
    } else {
      setFilteredOrders(filteredOrders);
    }
  }, [sortedOrders]);

  // --- Details
  const showDetails = (order: Order) => {
    if (isEditMenu) {
      return;
    }
    const calculatedProfit = currentPrice * order.amount - order.fiat;
    const isProfit = calculatedProfit > 0;
    const profitValue = isProfit
      ? `$${calculatedProfit.toFixed(2)}`
      : `${calculatedProfit.toFixed(2)} ($)`;

    const LimitOrderPrice = u.plusPercent(order.price, 0.1);

    alert(`
      ${c.id}: ${order.id}
      ${c.price}: $${order.price} (+10% = ${u.numberCutter(LimitOrderPrice, 3)})
      ${c.amount}: ${order.amount}
      ${c.invested}: $${order.fiat}
      ${isProfit ? c.profit : c.losses}: ${profitValue}
      ${c.exchange}: ${order.exchange}
      ${c.created}: ${u.normalizeISODate(order.createdAt, 'DD-MM-YY')}
      `);
  };

  return (
    <section className="section strategy-order-list">
      <div className={'section-content strategy-order-list'}>
        {sortedOrders?.length && filteredOrders.length ? (
          <ul className="section-strategy-order-list">
            {filteredOrders.map((order: Order) => {
              const { id, price, amount } = order;

              const sellPercent = customTokens.includes(order.symbol)
                ? c.customSuccessPercent
                : strategy.target;
              const buyPercent = customTokens.includes(order.symbol)
                ? -c.customBuyTargetPercent
                : -50;

              const _percent = ((currentPrice - price) / price) * 100;
              const percent = _percent < 0 && _percent > -0.09 ? 0 : _percent;

              const isSuccess = percent >= sellPercent;
              const isPositive = percent >= 0 && percent < sellPercent;
              const isNegative = percent <= 0 && percent > buyPercent;
              const isFailed = percent <= buyPercent;

              /* --- Do not delete!
              console.log('');
              console.log(
                'sellPercent:',
                order.symbol,
                customTokens.includes(order.symbol),
                sellPercent
              );
              console.log('isSuccess:', isSuccess, order.price);
              console.log('isPositive:', isPositive);
              console.log('isNegative:', isNegative);
              console.log('isFailed:', isFailed, percent, buyPercent);

              const isSuccess = percentValue >= target;
              const isPositive = percentValue >= 0 && percentValue < target;
              const isNegative = percentValue <= 0 && percentValue > -50;
              const isFailed = percentValue <= -50;
              */

              const handleDisplayPercentValue = () => {
                const percentValue = percent.toFixed();
                const percentValueToDisplay = percentValue.includes('-')
                  ? percentValue.split('-')[1]
                  : percentValue;
                const isZeroRange = percent > 0 && percent < 0.1;
                const isZero = isZeroRange || percent === 0;
                const isBig = percentValueToDisplay.length > 2;
                const fixNumber = isZero || isBig ? 0 : 1;
                const signPlus = _percent.toString().includes('-')
                  ? ''
                  : _percent >= 0.1
                  ? '+'
                  : '';
                return `${signPlus}${percent.toFixed(fixNumber)}%`;
                // return `${isPlus ? '+' : ''}${fixedPercent}%`;
                // return `${signPlus}${fixedPercent.toFixed(fixNumber)}%`;
              };

              // ---

              const orderStyle = isSuccess
                ? c.success
                : isPositive
                ? c.positiveValue
                : isNegative
                ? c.negativeValue
                : isFailed
                ? c.failed
                : '';

              const isSingle = sortedOrders.length === 1;
              const itemCountStyle = isSingle ? 'single-item' : 'multi-items';
              const orderItemStyle = `${orderStyle} ${itemCountStyle}`;

              return (
                <li
                  key={id}
                  className={`section-strategy-order-list-item  ${orderItemStyle}`}
                  onClick={() => showDetails(order)}
                >
                  <ul className="section-strategy-order-list-item-row-list">
                    <li className="row-strategy-list-item order-amount">
                      {/* <span>{u.formatMillionAmount('234567035')}</span> */}
                      {/* <span>{u.formatMillionAmount(amount.toString())}</span> */}
                      <span>{u.numberCutter(amount)}</span>
                    </li>

                    <li className="row-strategy-list-item order-price">
                      {/* <span>{formatMillionAmount('234567035')}</span> */}
                      {/* <span>{u.uniNumberFormatter(price)}</span> */}
                      <span>{u.numberCutter(price, 3)}</span>
                      {/* <span>{price}</span> */}
                    </li>

                    <li className="row-strategy-list-item order-percent">
                      {/* <span>{'+2345%'}</span> */}

                      {isEditMenu ? (
                        <StrategyOrderEditMenuSection
                          id={order.id}
                          symbol={sortedOrders[0].symbol}
                          orderNumber={sortedOrders.length}
                        />
                      ) : (
                        <span>{handleDisplayPercentValue()}</span>
                      )}
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        ) : (
          <span>{c.noOrders}</span>
        )}
      </div>
    </section>
  );
};

export default StrategyOrderListSection;
