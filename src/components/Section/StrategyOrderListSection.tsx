import { Order } from '@/src/types';

type Props = {
  orders: Order[];
};

const StrategyOrderListSection = ({ orders }: Props) => {
  return (
    <section className="section strategy-order-list">
      <div className={`section-content strategy-order-list ${'BUY'}`}>
        <ul className="section-strategy-order-list">
          {orders.map((order: Order) => {
            // console.log('order:', order);

            return (
              <li key={order.id} className="section-strategy-order-list-item">
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
                    <span>{order.amount * order.price}</span>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`section-content strategy-order-list ${'SELL'}`}>
        <ul className="section-strategy-order-list">
          {orders.map((order: Order) => {
            // console.log('order:', order);

            return (
              <li key={order.id} className="section-strategy-order-list-item">
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
                    <span>{order.amount * order.price}</span>
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
