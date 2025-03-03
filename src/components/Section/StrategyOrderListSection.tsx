import { Order } from '@/src/types';
import { formatMillionAmount, uniNumberFormatter } from '@/src/utils';

type Props = {
  sortedOrders: Order[];
  target: number;
  currentPrice: number;
};

// const StrategyOrderListSection = ({ tokens, orders }: Props) => {
const StrategyOrderListSection = ({
  sortedOrders,
  target,
  currentPrice,
}: Props) => {
  // const target = 100;

  // const currentPrice = (
  //   tokens.find((token) => {
  //     return token.symbol === orders[0].symbol;
  //   }) ?? { price: 0 }
  // ).price;

  // const classifyOrder = (percent: number) => {
  //   // if (percent >= target / 2 && percent < target) return { priority: 1 };
  //   // if (percent > -25 && percent < target / 2) return { priority: 2 };
  //   // if (percent <= -25 && percent > -50) return { priority: 3 };
  //   // if (percent <= -50) return { priority: 4 };
  //   if (percent >= target) return { priority: 0 };
  //   if (percent >= 0 && percent < target) return { priority: 1 };
  //   if (percent <= 0 && percent > -50) return { priority: 2 };
  //   if (percent <= -50) return { priority: 3 };
  //   return { priority: 4 };
  // };

  // const classifiedOrders = orders.map((order) => {
  //   const percent = ((currentPrice - order.price) / order.price) * 100;
  //   const { priority } = classifyOrder(percent);
  //   return { ...order, percent, priority };
  // });

  // const sortedOrders = classifiedOrders.sort((a, b) => {
  //   if (a.priority === b.priority) {
  //     return b.percent - a.percent;
  //   }
  //   return a.priority - b.priority;
  // });

  // console.log('-');

  const showDetails = () => {
    alert(`
      Hi

      ${'Go:'}
      555
      `);
  };

  // console.log('sortedOrders -->', sortedOrders);

  return (
    <section className="section strategy-order-list">
      <div className={'section-content strategy-order-list'}>
        {sortedOrders.length ? (
          <ul className="section-strategy-order-list">
            {sortedOrders.map((order: Order) => {
              const percent =
                ((currentPrice - order.price) / order.price) * 100;
              const fixedPercent = Number(percent.toFixed());
              const isMinus = percent.toString().includes('-');
              const isPlus = !isMinus && fixedPercent !== 0;
              const percentDisplay = `${isPlus ? '+' : ''}${fixedPercent}%`;

              const isSuccess = fixedPercent >= target;
              const isPositiveValue =
                fixedPercent >= 0 && fixedPercent < target;
              const isNegativeValue = fixedPercent <= 0 && fixedPercent > -50;
              const isFailed = fixedPercent <= -50;

              // ---

              const orderStyle = isSuccess
                ? 'success'
                : isPositiveValue
                ? 'positiveValue'
                : isNegativeValue
                ? 'negativeValue'
                : isFailed
                ? 'failed'
                : '';

              /**
               * Formats small decimal numbers with braces for leading zeros.
               * E.g., 0.00000793 => 0.0{5}793
               * @param value - The small decimal number
               * @returns Formatted string
               */
              // const formatSmallNumber = (value: number): string => {
              //   if (value >= 1 || value <= -1) {
              //     // --- Handle non-small numbers normally:
              //     const _value = value.toString().split('.')[0];
              //     if (_value.length >= 7) {
              //       return formatMillionAmount(value.toFixed(2));
              //     } else return value.toFixed(2);
              //   }
              //   const strValue = value.toString();
              //   const match = strValue.match(/^0\.(0+)(\d+)$/);
              //   if (match) {
              //     const leadingZeros = match[1].length; // Count leading zeros
              //     const significantDigits = match[2]; // Extract significant digits
              //     console.log('^^^', leadingZeros, significantDigits);
              //     return `0.0{${leadingZeros}}${significantDigits}`;
              //   }
              //   return value.toString();
              // };

              return (
                <li
                  key={order.id}
                  className={`section-strategy-order-list-item ${orderStyle}`}
                  onClick={showDetails}
                >
                  <ul className="section-strategy-order-list-item-row-list">
                    <li className="row-strategy-list-item order-amount">
                      {/* <span>{formatMillionAmount('234567035')}</span> */}
                      <span>
                        {formatMillionAmount(order.amount.toString())}
                      </span>
                    </li>
                    <li className="row-strategy-list-item order-price">
                      {/* <span>{formatMillionAmount('234567035')}</span> */}
                      {/* <span>{formatMillionAmount(order.price.toFixed(2))}</span> */}
                      <span>{uniNumberFormatter(order.price)}</span>
                    </li>
                    <li className="row-strategy-list-item order-percent">
                      {/* <span>{'+2345%'}</span> */}
                      <span>{percentDisplay}</span>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        ) : (
          <span>No orders!</span>
        )}
      </div>
    </section>
  );
};

export default StrategyOrderListSection;
