import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteOrder } from '@/src/lib/api/deleteOrderServerAction';
import useFilterAndSortOrderList from '@/src/hooks/order/useFilterAndSortOrderList';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import { AggregatedOrderListAcc, Order, Token } from '@/src/types';
import { OrderTypeEnum, QueryKeyEnum } from '@/src/enums';
import { formatMillionAmount, normalizeDate } from '@/src/utils';
import MainDividerSection from '@/src/components/Section/MainDividerSection';

type Props = {
  data: Order[];
  tokens: Token[] | null;
  userId: string | null;
};

const config = {
  confirmDeletion: 'Buy Target will be deleted!',
  buyTargets: 'Buy Targets',
};

const lsLimitKey = 'orderListLimited';

const OrderListSection = ({ data, tokens, userId }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const savedState = localStorage.getItem(lsLimitKey);
    return savedState ? JSON.parse(savedState) : false;
  });

  const { updateData } = useInvalidateQueries();

  useEffect(() => {
    localStorage.setItem(lsLimitKey, JSON.stringify(isExpanded));
  }, [isExpanded]);

  const itemLimit = 5;
  const isAdmin = data[0].userId === userId;
  const isBull = data[0].type === OrderTypeEnum.Buy;
  const isToggle = new Set([...data.map((el) => el.symbol)]).size > itemLimit;
  const strategy = isBull ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;

  const aggregatedData = Object.values(
    data.reduce((acc, order: Order) => {
      if (!tokens) return acc;
      const token = tokens.find((token) => token.symbol === order.symbol);
      if (!token) return acc;
      const percent = isBull
        ? ((token.price - order.price) / order.price) * 100
        : ((order.price - token.price) / token.price) * 100;

      if (!acc[order.symbol]) {
        acc[order.symbol] = {
          id: order.id,
          symbol: order.symbol,
          price: order.price,
          totalAmount: order.amount,
          totalFiat: order.fiat,
          orders: 1,
          percent: percent,
          orderDate: order.updatedAt.toString(),
        };
      } else {
        const higherPercent =
          percent > acc[order.symbol].percent
            ? percent
            : acc[order.symbol].percent;

        const orderDate = normalizeDate(order.updatedAt, 'DD-MM-YY');

        acc[order.symbol].id += order.id;
        acc[order.symbol].price += order.price;
        acc[order.symbol].totalAmount += order.amount;
        acc[order.symbol].totalFiat += order.fiat;
        acc[order.symbol].orders += 1;
        // acc[order.symbol].percent = +higherPercent.toFixed();
        acc[order.symbol].percent = higherPercent;
        acc[order.symbol].orderDate = orderDate;
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
    label: isBull ? OrderTypeEnum.Buy : OrderTypeEnum.Sell,
    aggregatedData,
    isExpanded,
    itemLimit,
  });

  const toggleList = () => setIsExpanded((prev) => !prev);

  const removeBuyTarget = async (symbol: string, id: number) => {
    if (isBull) return;
    if (!confirm(`(${symbol}) ${config.confirmDeletion}`)) return;
    const isDeleted = await deleteOrder(id);
    if (isDeleted) {
      updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
    }
  };

  // ---

  return (
    <>
      <MainDividerSection
        className="order-list-devider"
        // title={isBull ? config.assets : config.buyTargets}
        filterSymbol={filterSymbol}
        handleFilterChange={handleFilterChange}
        resetFilter={resetFilter}
        sortField={sortField}
        handleSortToggle={handleSortToggle}
        isSwitchButton={isToggle}
        isDisabled={!isExpanded}
        setIsDisabled={toggleList}
      />

      <section className={`section order-list ${'empty'}`}>
        <div className="section-content order-list">
          <ul className="section-order-list">
            {displayedData.map((order: AggregatedOrderListAcc, idx) => {
              const { symbol, price, orders, totalAmount, percent } = order;

              const strategyPath = `/strategy/${strategy}-${symbol}`;
              const percentValue = percent < 0 && percent > -1 ? 0 : percent;
              const signPlus = percent.toString().includes('-')
                ? ''
                : percent >= 1
                ? '+'
                : '';

              // ---

              const bullColor = percent > 0 ? 'color-green' : 'color-blue';
              const bearColor = percent > 0 ? 'color-green' : 'color-yellow';
              const percentColor = isBull ? bullColor : bearColor;
              const percentStyle = `row-list-item order-percent ${percentColor}`;

              return (
                <li key={idx} className="section-order-list-item">
                  <Link
                    className={`${isAdmin ? 'admin-link' : ''}`}
                    href={isAdmin && isBull ? strategyPath : '/dashboard'}
                    onClick={() => removeBuyTarget(order.symbol, order.id)}
                  >
                    <ul className="section-order-list-item-row-list">
                      <li className="row-list-item order-symbol">
                        <span>
                          {symbol}
                          {/* {'WERTFGR'} */}
                        </span>
                      </li>
                      <li className="row-list-item uni-order-count-and-empty-value">
                        <span>
                          {isBull ? orders : '-'}
                          {/* {358} */}
                        </span>
                      </li>

                      <li className="row-list-item uni-order-amount-and-turget-buy-price">
                        <span>
                          {isBull
                            ? formatMillionAmount(
                                parseFloat(totalAmount.toFixed(6)).toString()
                              )
                            : price}
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
        </div>
      </section>
    </>
  );
};

export default OrderListSection;
