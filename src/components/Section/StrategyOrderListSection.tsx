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

    alert(`
      ${c.id}: ${order.id}
      ${c.price}: $${order.price} (+10% = ${u.plusPercent(order.price, 0.1)})
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
              const { target } = strategy;
              const percent = ((currentPrice - price) / price) * 100;
              // const fixedPercent = Number(percent.toFixed());
              // const isMinus = percent.toString().includes('-');
              // const isPlus = !isMinus && fixedPercent !== 0;
              // const percentDisplay = `${isPlus ? '+' : ''}${fixedPercent}%`;

              const percentValue = percent < 0 && percent > -0.09 ? 0 : percent;
              // const signPlus = percent.toString().includes('-')
              //   ? ''
              //   : percent >= 0.1
              //   ? '+'
              //   : '';

              // const isSuccess = fixedPercent >= target;
              // const isPositive = fixedPercent >= 0 && fixedPercent < target;
              // const isNegative = fixedPercent <= 0 && fixedPercent > -50;
              // const isFailed = fixedPercent <= -50;

              const isSuccess = percentValue >= target;
              const isPositive = percentValue >= 0 && percentValue < target;
              const isNegative = percentValue <= 0 && percentValue > -50;
              const isFailed = percentValue <= -50;

              const handleDisplayPercentValue = () => {
                const _percentValue = percentValue.toFixed();
                const percentValueToDisplay = _percentValue.includes('-')
                  ? _percentValue.split('-')[1]
                  : _percentValue;
                const isZeroRange = percentValue > 0 && percentValue < 0.1;
                const isZero = isZeroRange || percentValue === 0;
                const isBig = percentValueToDisplay.length > 2;
                const fixNumber = isZero || isBig ? 0 : 1;
                const signPlus = percent.toString().includes('-')
                  ? ''
                  : percent >= 0.1
                  ? '+'
                  : '';
                return `${signPlus}${percentValue.toFixed(fixNumber)}%`;
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
                      {/* <span>{formatMillionAmount('234567035')}</span> */}
                      <span>{u.formatMillionAmount(amount.toString())}</span>
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
                        // <span>{percentValue}</span>
                        // <span>{percentDisplay}</span>
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
