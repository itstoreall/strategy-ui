import { Order, Token } from '@/src/types';
import { formatMillionAmount } from '@/src/utils';

type Props = {
  tokens: Token[];
  orders: Order[];
};

const StrategyOrderListSection = ({ tokens, orders }: Props) => {
  const target = 100;

  const currentPrice = (
    tokens.find((token) => {
      return token.symbol === orders[0].symbol;
    }) ?? { price: 0 }
  ).price;

  const classifyOrder = (percent: number) => {
    // if (percent >= target / 2 && percent < target) return { priority: 1 };
    // if (percent > -25 && percent < target / 2) return { priority: 2 };
    // if (percent <= -25 && percent > -50) return { priority: 3 };
    // if (percent <= -50) return { priority: 4 };
    if (percent >= target) return { priority: 0 };
    if (percent >= 0 && percent < target) return { priority: 1 };
    if (percent <= 0 && percent > -50) return { priority: 2 };
    if (percent <= -50) return { priority: 3 };
    return { priority: 4 };
  };

  const classifiedOrders = orders.map((order) => {
    const percent = ((currentPrice - order.price) / order.price) * 100;
    const { priority } = classifyOrder(percent);
    return { ...order, percent, priority };
  });

  const sortedOrders = classifiedOrders.sort((a, b) => {
    if (a.priority === b.priority) {
      return b.percent - a.percent;
    }
    return a.priority - b.priority;
  });

  // console.log('-');

  const showDetails = () => {
    alert(`
      Hi

      ${'Go:'}
      555
      `);
  };

  return (
    <section className="section strategy-order-list">
      <div className={'section-content strategy-order-list'}>
        <ul className="section-strategy-order-list">
          {sortedOrders.map((order: Order) => {
            const percent = ((currentPrice - order.price) / order.price) * 100;
            const fixedPercent = Number(percent.toFixed());
            const isMinus = percent.toString().includes('-');
            const isPlus = !isMinus && fixedPercent !== 0;
            const percentDisplay = `${isPlus ? '+' : ''}${fixedPercent}%`;

            const isSuccess = fixedPercent >= target;
            const isPositiveValue = fixedPercent >= 0 && fixedPercent < target;
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

            return (
              <li
                key={order.id}
                className={`section-strategy-order-list-item ${orderStyle}`}
                onClick={showDetails}
              >
                <ul className="section-strategy-order-list-item-row-list">
                  <li className="row-strategy-list-item order-amount">
                    {/* <span>{formatMillionAmount('234567035')}</span> */}
                    <span>{formatMillionAmount(order.amount.toString())}</span>
                  </li>
                  <li className="row-strategy-list-item order-price">
                    {/* <span>{formatMillionAmount('234567035')}</span> */}
                    <span>{formatMillionAmount(order.price.toString())}</span>
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
      </div>
    </section>
  );
};

export default StrategyOrderListSection;
