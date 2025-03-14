import { useState } from 'react';
import Link from 'next/link';
import useFilterAndSortOrderList from '@/src/hooks/order/useFilterAndSortOrderList';
import { AggregatedOrderListAcc, Order, Token } from '@/src/types';
import { OrderTypeEnum } from '@/src/enums';
import { formatMillionAmount } from '@/src/utils';
import MainDividerSection from '@/src/components/Section/MainDividerSection';

type Props = {
  data: Order[];
  tokens: Token[] | null;
  userId: string | null;
};

/*
const config = {
  assets: 'Assets',
  buyTargets: 'Buy Targets',
};
*/

const OrderListSection = ({ data, tokens, userId }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isAdmin = data[0].userId === userId;
  const itemLimit = 10;

  const aggregatedData = Object.values(
    data.reduce((acc, order: Order) => {
      if (!tokens) return acc;
      const token = tokens.find((token) => token.symbol === order.symbol);
      if (!token) return acc;
      const percent = ((token.price - order.price) / order.price) * 100;
      if (!acc[order.symbol]) {
        // console.log(1, 'order:', order);
        acc[order.symbol] = {
          symbol: order.symbol,
          totalAmount: order.amount,
          totalFiat: order.fiat,
          orders: 1,
          percent: percent,
        };
      } else {
        const higherPercent =
          percent > acc[order.symbol].percent
            ? percent
            : acc[order.symbol].percent;

        acc[order.symbol].totalAmount += order.amount;
        acc[order.symbol].totalFiat += order.fiat;
        acc[order.symbol].orders += 1;
        // acc[order.symbol].percent = +higherPercent.toFixed();
        acc[order.symbol].percent = higherPercent;
      }
      return acc;
    }, {} as Record<string, AggregatedOrderListAcc>)
  );

  const {
    displayedData,
    filterSymbol,
    sortField,
    handleFilterChange,
    handleSortToggle,
    resetFilter,
  } = useFilterAndSortOrderList({
    aggregatedData,
    isExpanded,
    itemLimit,
  });

  // console.log('aggregatedData:', aggregatedData);

  const isBuy = data[0].type === OrderTypeEnum.Buy;
  const isToggle = new Set([...data.map((el) => el.symbol)]).size > itemLimit;
  const strategy = isBuy ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;

  const toggleList = () => setIsExpanded((prev) => !prev);

  return (
    <>
      <MainDividerSection
        className="order-list-devider"
        // title={isBuy ? config.assets : config.buyTargets}
        filterSymbol={filterSymbol}
        handleFilterChange={handleFilterChange}
        resetFilter={resetFilter}
        sortField={sortField}
        handleSortToggle={handleSortToggle}
        isSwitchButton={isToggle}
        isDisabled={!isExpanded}
        setIsDisabled={toggleList}
      />

      <section className="section order-list">
        <div className="section-content order-list">
          {displayedData.length ? (
            <ul className="section-order-list">
              {displayedData.map((order, idx) => {
                const { symbol, orders, totalAmount, percent } = order;

                const strategyPath = `/strategy/${strategy}-${symbol}`;
                const percentValue = percent < 0 && percent > -1 ? 0 : percent;
                const signPlus = percent.toString().includes('-')
                  ? ''
                  : percent >= 1
                  ? '+'
                  : '';

                // ---

                const percentColor = percent > 0 ? 'color-green' : 'color-blue';
                const percentStyle = `row-list-item order-percent ${percentColor}`;

                return (
                  <li key={idx} className="section-order-list-item">
                    <Link
                      className={`${isAdmin ? 'admin-link' : ''}`}
                      href={isAdmin ? strategyPath : ''}
                    >
                      <ul className="section-order-list-item-row-list">
                        <li className="row-list-item order-symbol">
                          <span>
                            {symbol}
                            {/* {'WERTFGR'} */}
                          </span>
                        </li>
                        <li className="row-list-item order-count">
                          <span>
                            {orders}
                            {/* {358} */}
                          </span>
                        </li>
                        <li className="row-list-item order-amount">
                          <span>
                            {formatMillionAmount(
                              parseFloat(totalAmount.toFixed(6)).toString()
                            )}
                            {/* {38564326} */}
                          </span>
                        </li>
                        <li className={percentStyle}>
                          <span
                            title={percent.toFixed(2)}
                          >{`${signPlus}${percentValue.toFixed()}%`}</span>
                        </li>
                      </ul>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span>No orders!</span>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderListSection;
