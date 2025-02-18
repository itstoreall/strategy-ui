import { useState } from 'react';
import Link from 'next/link';
import { Order } from '@/src/types';
import { OrderTypeEnum } from '@/src/enums';
import MainDividerSection from '@/src/components/Section/MainDividerSection';

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
  const strategy = isBuy ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;

  const toggleList = () => setIsExpanded((prev) => !prev);

  // const headingColor = isBuy ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;
  const displayedData = isExpanded
    ? aggregatedData
    : aggregatedData.slice(0, 5);

  return (
    <>
      <MainDividerSection
        className="order-list-devider"
        title={isBuy ? config.buyDevider : config.sellDevider}
        isSwitchButton={data.length > 5}
        isDisabled={!isExpanded}
        setIsDisabled={toggleList}
      />

      <section className="section order-list">
        <div className="section-content order-list">
          <ul className="section-order-list">
            {displayedData.map((order, idx) => {
              // console.log(parseFloat(order.totalAmount.toFixed(6)));
              // const values = `${order.symbol}: ${order.amount} - ${order.price}`;
              return (
                <li key={idx} className="section-order-list-item">
                  <Link href={`/strategy/${strategy}-${order.symbol}`}>
                    <ul className="section-order-list-item-row-list">
                      <li className="row-list-item order-symbol">
                        <span>
                          {order.symbol}
                          {/* {'WERTFGR'} */}
                        </span>
                      </li>
                      <li className="row-list-item order-count">
                        <span>
                          {order.orders}
                          {/* {358} */}
                        </span>
                      </li>
                      <li className="row-list-item order-amount">
                        <span>
                          {parseFloat(order.totalAmount.toFixed(6))}
                          {/* {38564326} */}
                        </span>
                      </li>
                      <li
                        className={`row-list-item order-percent ${
                          isBuy ? 'color-green' : 'color-red'
                        }`}
                      >
                        <span>{`${'+'}${2356}%`}</span>
                      </li>
                    </ul>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default OrderListSection;
