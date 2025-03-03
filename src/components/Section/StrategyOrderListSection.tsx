import { Order } from '@/src/types';
import { formatMillionAmount, uniNumberFormatter } from '@/src/utils';

type Props = {
  sortedOrders: Order[];
  target: number;
  currentPrice: number;
};

const StrategyOrderListSection = (props: Props) => {
  const { sortedOrders, target, currentPrice } = props;

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

              const isSingle = sortedOrders.length === 1;
              const itemCountStyle = isSingle ? 'single-item' : 'multi-items';
              const orderItemStyle = `${orderStyle} ${itemCountStyle}`;

              return (
                <li
                  key={order.id}
                  className={`section-strategy-order-list-item  ${orderItemStyle}`}
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
