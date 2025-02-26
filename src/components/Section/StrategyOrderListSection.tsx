import { Order, Token } from '@/src/types';

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
    if (percent >= target) return { style: 'success', priority: 0 };
    if (percent >= target / 2 && percent < target)
      return { style: 'halfSuccess', priority: 1 };
    if (percent > -25 && percent < target / 2)
      return { style: '', priority: 2 };
    if (percent <= -25 && percent > -50)
      return { style: 'halfFailed', priority: 3 };
    if (percent <= -50) return { style: 'failed', priority: 4 };
    return { style: '', priority: 5 };
  };

  const classifiedOrders = orders.map((order) => {
    const percent = ((currentPrice - order.price) / order.price) * 100;
    const { style, priority } = classifyOrder(percent);
    return { ...order, percent, style, priority };
  });

  const sortedOrders = classifiedOrders.sort((a, b) => {
    if (a.priority === b.priority) {
      return b.percent - a.percent;
    }
    return a.priority - b.priority;
  });

  // console.log('-');

  return (
    <section className="section strategy-order-list">
      <div className={'section-content strategy-order-list'}>
        <ul className="section-strategy-order-list">
          {sortedOrders.map((order: Order) => {
            const percent = ((currentPrice - order.price) / order.price) * 100;
            const isPlus = !percent.toString().includes('-');
            const percentDisplay = `${isPlus ? '+' : ''}${percent.toFixed()}%`;

            const isSuccess = percent >= target;
            const isPositiveValue = percent > 0 && percent < target;
            // const isHalfSuccess = percent >= target / 2 && percent < target;
            const isNegativeValue = percent <= 0 && percent > -50;
            const isFailed = percent <= -50;

            // console.log('isSuccess:', isSuccess);
            // console.log('isHalfSuccess:', isHalfSuccess);
            // console.log('isHalfFailed:', isHalfFailed);
            // console.log('isFailed:', isFailed);

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
              >
                <ul className="section-strategy-order-list-item-row-list">
                  <li className="row-strategy-list-item order-symbol">
                    <span>{order.symbol}</span>
                  </li>
                  <li className="row-strategy-list-item order-amount">
                    <span>{order.amount}</span>
                  </li>
                  <li className="row-strategy-list-item order-price">
                    <span>{order.price}</span>
                  </li>
                  <li className="row-strategy-list-item order-percent">
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
