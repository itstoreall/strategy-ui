import { useState } from 'react';
import Link from 'next/link';
import { Order, Token } from '@/src/types';
import { OrderTypeEnum } from '@/src/enums';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import { formatMillionAmount } from '@/src/utils';

type Props = {
  data: Order[];
  tokens: Token[] | null;
  // removeOrder: (id: number) => void;
};

type AggregatedDataAcc = {
  symbol: string;
  totalAmount: number;
  totalFiat: number;
  orders: number;
  percent: number;
};

const config = {
  assets: 'Assets',
  buyTargets: 'Buy Targets',
};

const OrderListSection = ({ data, tokens }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const aggregatedData = Object.values(
    data.reduce((acc, order: Order) => {
      if (!tokens) return acc;
      const token = tokens.find((token) => token.symbol === order.symbol);
      if (!token) return acc;

      console.log('token.price:', token.price);

      const percent = ((token.price - order.price) / order.price) * 100;

      if (!acc[order.symbol]) {
        console.log(1, 'order:', order);
        acc[order.symbol] = {
          symbol: order.symbol,
          totalAmount: order.amount,
          totalFiat: order.fiat,
          orders: 1,
          percent: +percent.toFixed(),
        };
      } else {
        const higherPercent =
          percent > acc[order.symbol].percent
            ? percent
            : acc[order.symbol].percent;

        console.log(2, 'order:', order);
        acc[order.symbol].totalAmount += order.amount;
        acc[order.symbol].totalFiat += order.fiat;
        acc[order.symbol].orders += 1;
        acc[order.symbol].percent = +higherPercent.toFixed();
      }
      return acc;
    }, {} as Record<string, AggregatedDataAcc>)
  );

  console.log('aggregatedData:', aggregatedData);

  const isBuy = data[0].type === OrderTypeEnum.Buy;
  const isToggle = new Set([...data.map((el) => el.symbol)]).size > 5;
  const strategy = isBuy ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;

  const toggleList = () => setIsExpanded((prev) => !prev);

  // ---

  const displayedData = isExpanded
    ? aggregatedData
    : aggregatedData.slice(0, 5);

  return (
    <>
      <MainDividerSection
        className="order-list-devider"
        title={isBuy ? config.assets : config.buyTargets}
        isSwitchButton={isToggle}
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
                          {formatMillionAmount(
                            parseFloat(order.totalAmount.toFixed(6)).toString()
                          )}
                          {/* {38564326} */}
                        </span>
                      </li>
                      {/* <li className="row-list-item order-amount">
                        <span>
                          {parseFloat(order.totalAmount.toFixed(6))}
                        </span>
                      </li> */}
                      <li
                        className={`row-list-item order-percent ${
                          isBuy ? 'color-green' : 'color-red'
                        }`}
                      >
                        <span>{`${'+'}${order.percent}%`}</span>
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
