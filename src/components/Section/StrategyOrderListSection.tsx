import { Order } from '@/src/types';
import normalizeDate, {
  formatMillionAmount,
  uniNumberFormatter,
} from '@/src/utils';
import StrategyOrderEditMenuSection from '@/src/components/Section/StrategyOrderEditMenuSection';

type Props = {
  sortedOrders: Order[];
  target: number;
  currentPrice: number;
  isEditMenu: boolean;
};

const StrategyOrderListSection = (props: Props) => {
  const { sortedOrders, target, currentPrice, isEditMenu } = props;

  const showDetails = (order: Order) => {
    if (isEditMenu) {
      return;
    }
    const profitValue = currentPrice * order.amount - order.fiat;
    alert(`
      ID: ${order.id}
      Price: $${order.price}
      Amount: ${order.amount}
      Invested: $${order.fiat}
      Profit: $${profitValue.toFixed()}
      Created: ${normalizeDate(order.createdAt, 'DD-MM-YY')}
      `);
  };

  return (
    <section className="section strategy-order-list">
      <div className={'section-content strategy-order-list'}>
        {sortedOrders.length ? (
          <ul className="section-strategy-order-list">
            {sortedOrders.map((order: Order) => {
              const { id, price, amount } = order;
              const percent = ((currentPrice - price) / price) * 100;
              const fixedPercent = Number(percent.toFixed());
              const isMinus = percent.toString().includes('-');
              const isPlus = !isMinus && fixedPercent !== 0;
              const percentDisplay = `${isPlus ? '+' : ''}${fixedPercent}%`;

              const isSuccess = fixedPercent >= target;
              const isPositive = fixedPercent >= 0 && fixedPercent < target;
              const isNegative = fixedPercent <= 0 && fixedPercent > -50;
              const isFailed = fixedPercent <= -50;

              // ---

              const orderStyle = isSuccess
                ? 'success'
                : isPositive
                ? 'positiveValue'
                : isNegative
                ? 'negativeValue'
                : isFailed
                ? 'failed'
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
                      <span>{formatMillionAmount(amount.toString())}</span>
                    </li>
                    <li className="row-strategy-list-item order-price">
                      {/* <span>{formatMillionAmount('234567035')}</span> */}
                      <span>{uniNumberFormatter(price)}</span>
                    </li>
                    <li className="row-strategy-list-item order-percent">
                      {/* <span>{'+2345%'}</span> */}

                      {isEditMenu ? (
                        <StrategyOrderEditMenuSection
                          id={order.id}
                          orderNumber={sortedOrders.length}
                        />
                      ) : (
                        <span>{percentDisplay}</span>
                      )}
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
