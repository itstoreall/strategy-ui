/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteOrder } from '@/src/lib/api/deleteOrderServerAction';
import useFilterAndSortOrderList from '@/src/hooks/order/useFilterAndSortOrderList';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useGlobalState from '@/src/hooks/useGlobalState';
import { OrderTypeEnum, QueryKeyEnum } from '@/src/enums';
import * as u from '@/src/utils';
import * as msg from '@/src/messages/confirm';
import { AggregatedOrderListAcc, Order, Token } from '@/src/types';
import MainDividerSection from '@/src/components/Section/MainDividerSection';

type Props = {
  data: Order[];
  tokens: Token[] | null;
  userId: string | null;
  isCustom?: boolean;
};

const c = {
  lsOrderLimitKey: 'orderListLimited',
  lsBuyTargetLimitKey: 'buyTargetListLimited',
  confirmDeletion: 'Buy Target will be deleted!',
  buyTargets: 'Targets',
  customTitle: 'DCA',
  fourPercent: 4,
  sevenPercent: 7,
  buy: 'Buy',
  wait: 'Wait',
  sell: 'Sell',
};

const OrderListSection = ({ data, tokens, userId, isCustom }: Props) => {
  const isBull = data[0].type === OrderTypeEnum.Buy;
  const currentLsKey = isBull ? c.lsOrderLimitKey : c.lsBuyTargetLimitKey;

  const [isBTCButton, setIsBTCButton] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const savedState = localStorage.getItem(currentLsKey);
    return savedState ? JSON.parse(savedState) : false;
  });

  const { updateData } = useInvalidateQueries();
  const { handleUnrealized } = useGlobalState();

  useEffect(() => {
    if (data) {
      const BTCOrder = data.find((order) => order.symbol === 'BTC');
      if (BTCOrder) {
        // console.log('isBull 1:', isBull);
        if (isBull) {
          setIsBTCButton(true);
        }
      } else {
        // console.log('isBull 2:', isBull);
        setIsBTCButton(false);
      }
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem(currentLsKey, JSON.stringify(isExpanded));
  }, [isExpanded]);

  const itemLimit = 5;
  const isAdmin = data[0].userId === userId;
  const isToggle = new Set([...data.map((el) => el.symbol)]).size > itemLimit;
  const strategy = isBull ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;

  const aggregatedData = Object.values(
    data.reduce((acc, order: Order) => {
      if (!tokens) return acc;
      const token = tokens.find((token) => token.symbol === order.symbol);
      if (!token) return acc;

      const isProfitable = token.price > order.price;
      const profit = isBull && isProfitable ? token.price * order.amount : null;
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
          unrealized: profit,
          orderDate: order.updatedAt.toString(),
        };
      } else {
        const orderDate = u.normalizeISODate(order.updatedAt, 'DD-MM-YY');

        const higherPercent =
          percent > acc[order.symbol].percent
            ? percent
            : acc[order.symbol].percent;

        const unrealized =
          profit || acc[order.symbol].unrealized
            ? ((acc[order.symbol].unrealized as number) += profit as number)
            : null;

        acc[order.symbol].id += order.id;
        acc[order.symbol].price += order.price;
        acc[order.symbol].totalAmount += order.amount;
        acc[order.symbol].totalFiat += order.fiat;
        acc[order.symbol].orders += 1;
        // acc[order.symbol].percent = +higherPercent.toFixed();
        acc[order.symbol].percent = higherPercent;
        acc[order.symbol].unrealized = unrealized;
        acc[order.symbol].orderDate = orderDate as string;
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
    isCustom,
    isExpanded,
    itemLimit,
  });

  useEffect(() => {
    if (aggregatedData && aggregatedData.length > 0) {
      let unrealizedValue: number = 0;
      aggregatedData.forEach((item) => {
        // if (!isCustom && item.symbol === 'BTC') {
        //   console.log('item:', item);
        //   setIsBTCButton(true);
        // }
        if (item.unrealized) {
          unrealizedValue += item.unrealized;
        }
      });
      if (unrealizedValue) {
        handleUnrealized(+unrealizedValue.toFixed());
      }
    }
  }, [aggregatedData]);

  // ---

  const toggleList = () => setIsExpanded((prev) => !prev);

  const removeBuyTarget = async (symbol: string, id: number) => {
    if (isBull) return;
    if (!confirm(msg.deleteBuyTarget(symbol))) return;
    const isDeleted = await deleteOrder(id);
    if (isDeleted) {
      updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
    }
  };

  // ---

  const OrderListItem = ({ order }: { order: AggregatedOrderListAcc }) => {
    const { symbol, price, orders, totalAmount, percent } = order;

    const strategyPath = `/strategy/${strategy}-${symbol}`;
    const percentValue = percent < 0 && percent > -0.09 ? 0 : percent;

    const handleDisplayPercentValue = () => {
      const _percentValue = percentValue.toFixed();
      const percentValueToDisplay = _percentValue.includes('-')
        ? _percentValue.split('-')[1]
        : _percentValue;
      const isZeroRange = percentValue > 0 && percentValue < 0.1;
      const isZero = isZeroRange || percentValue === 0;
      const isBig = percentValueToDisplay.length > 2;
      const fixNumber = isZero || isBig ? 0 : 1;
      const signPlus = percent.toString().includes('-')
        ? ''
        : percent >= 0.1
        ? '+'
        : '';
      return `${signPlus}${percentValue.toFixed(fixNumber)}%`;
    };

    // --- Uni Value (BuyTarget)

    const isReachedTarget = percentValue > 0;
    const currentBuyTargetValue = isReachedTarget ? c.buy : c.wait;
    const currentTargetPrice = tokens?.find(
      (token) => token.symbol === symbol
    )?.price;

    // --- Styles

    const customStatus =
      isCustom && order.percent >= c.sevenPercent
        ? 'custom-sell'
        : isCustom && order.percent <= -c.fourPercent
        ? 'custom-buy'
        : '';

    const tokenPriceStyle = `row-list-item-token-price ${customStatus}`;
    const bullColor = order.percent > 0 ? 'color-green' : 'color-blue';
    const bearColor = order.percent > 0 ? 'color-green' : 'color-yellow';
    const percentColor = isBull ? bullColor : bearColor;
    const percentStyle = `row-list-item order-percent ${percentColor}`;
    const reachedTarget = isReachedTarget ? 'color-green' : '';
    const uniValueStyle = `uni-value ${!isBull ? reachedTarget : ''}`;

    return (
      <li className="section-order-list-item">
        <Link
          className={`${isAdmin ? 'admin-link' : ''}`}
          href={isAdmin && isBull ? strategyPath : '/dashboard'}
          prefetch={false}
          onClick={() => removeBuyTarget(symbol, order.id)}
        >
          <ul className="section-order-list-item-row-list">
            <li className="row-list-item order-symbol">
              <span className="row-list-item-token-symbol">
                {symbol}
                {/* {'WERTFGR'} */}
                {currentTargetPrice && (
                  <span className={tokenPriceStyle}>
                    {u.handlePriceDisplay(symbol, currentTargetPrice, 3)}
                  </span>
                )}
              </span>
            </li>

            <li className="row-list-item uni-value-field">
              <div className="uni-value-field-content">
                {isBull && order.unrealized && (
                  <span className="unrealized-value">
                    {order.unrealized.toFixed()}
                  </span>
                )}

                <span className={uniValueStyle}>
                  {isBull ? orders : currentBuyTargetValue}
                </span>
              </div>
            </li>

            <li className="row-list-item uni-order-amount-and-turget-buy-price">
              <span>
                {isBull
                  ? u.formatMillionAmount(
                      parseFloat(totalAmount.toFixed(6)).toString()
                    )
                  : u.handlePriceDisplay(symbol, price, 3)}
                {/* {38564326} */}
              </span>
            </li>

            <li className={percentStyle}>
              <span title={u.numberCutter(percentValue, 3)}>
                {handleDisplayPercentValue()}
              </span>
            </li>
          </ul>
        </Link>
      </li>
    );
  };

  return (
    <>
      <MainDividerSection
        className="order-list-devider"
        title={!isBull ? c.buyTargets : isCustom ? c.customTitle : ''}
        filterSymbol={!isCustom ? filterSymbol : ''}
        handleFilterChange={isBull && !isCustom ? handleFilterChange : null}
        resetFilter={resetFilter}
        sortField={sortField}
        handleSortToggle={handleSortToggle}
        isBTCButton={isBTCButton}
        isSwitchButton={isToggle && !isCustom}
        isDisabled={!isExpanded}
        setIsDisabled={toggleList}
      />

      <section className={`section order-list ${'empty'}`}>
        <div className="section-content order-list">
          <ul className="section-order-list">
            {displayedData.map((order: AggregatedOrderListAcc, idx) => {
              if (order.symbol !== 'BTC' || !isBull) {
                return <OrderListItem key={idx} order={order} />;
              } else return;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default OrderListSection;
