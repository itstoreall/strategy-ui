import { useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';
import { Order } from '@/src/types';
import { OrderTypeEnum } from '@/src/enums';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import Button from '@/src/components/Button/Button';

type Props = {
  data: Order[];
  // removeOrder: (id: number) => void;
};

const config = {
  buyDevider: 'BUY orders',
  sellDevider: 'SELL orders',
};

const OrderListSection = ({ data }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const aggregatedData = Object.values(
    data.reduce((acc, order) => {
      if (!acc[order.symbol]) {
        acc[order.symbol] = {
          // ...order,
          symbol: order.symbol,
          totalAmount: order.amount,
          totalFiat: order.fiat,
          orders: 1,
        };
      } else {
        acc[order.symbol].totalAmount += order.amount;
        acc[order.symbol].totalFiat += order.fiat;
        acc[order.symbol].orders += 1;
      }
      return acc;
    }, {} as Record<string, { symbol: string; totalAmount: number; totalFiat: number; orders: number }>)
    // }, {} as Record<string, Order & { totalAmount: number; orderCount: number }>)
  );

  // console.log('aggregatedData:', data, aggregatedData);

  const isBuy = data[0].type === OrderTypeEnum.Buy;

  const toggleList = () => setIsExpanded((prev) => !prev);

  // const headingColor = isBuy ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;
  const displayedData = isExpanded
    ? aggregatedData
    : aggregatedData.slice(0, 10);

  return (
    <>
      <MainDividerSection
        title={isBuy ? config.buyDevider : config.sellDevider}
        // isSwitchButton
        // isDisabled={true}
        // setIsDisabled={() => console.log()}
      />
      <section className="section order-list">
        <div className="section-content order-list">
          {/* <span className={`order-list-header ${headingColor}`} /> */}

          <ul className="section-order-list">
            {displayedData.map((order, idx) => {
              // console.log(parseFloat(order.totalAmount.toFixed(6)));
              // const values = `${order.symbol}: ${order.amount} - ${order.price}`;
              return (
                // <li key={idx} onClick={() => removeOrder(order.id)}>
                <li
                  key={idx}
                  className="section-order-list-item"
                  onClick={() => console.log(111)}
                >
                  <ul className="section-order-list-item-row-list">
                    <li className="row-list-item order-symbol">
                      {order.symbol}
                      {/* {'WERTFGR'} */}
                    </li>
                    <li className="row-list-item order-count">
                      {order.orders}
                      {/* {358} */}
                    </li>
                    <li className="row-list-item order-amount">
                      {parseFloat(order.totalAmount.toFixed(6))}
                      {/* {38564326} */}
                    </li>
                    <li
                      className={`row-list-item order-percent ${
                        isBuy ? 'color-green' : 'color-red'
                      }`}
                    >
                      {`${'+'}${2356}%`}
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>

          {aggregatedData.length > 10 && (
            <div className="toggle-block">
              <Button className="toggle-button" clickContent={toggleList}>
                {isExpanded ? (
                  <FiChevronUp size={20} />
                ) : (
                  <FiChevronDown size={20} />
                )}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderListSection;
