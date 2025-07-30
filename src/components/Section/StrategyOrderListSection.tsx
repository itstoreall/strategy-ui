/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { deleteOrder } from '@/src/lib/api/deleteOrderServerAction';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useRedirect from '@/src/hooks/useRedirect';
import useModal from '@/src/hooks/useModal';
import { Order, Strategy, TradeStrategy } from '@/src/types';
import { ExchangeEnum, QueryKeyEnum } from '@/src/enums';
import { customTokens } from '@/src/config';
import * as u from '@/src/utils';
import * as msg from '@/src/messages/confirm';
import StrategyOrderDetailsSection from '@/src/components/Section/Strategy/StrategyOrderDetailsSection';
import StrategyOrderEditMenuSection from '@/src/components/Section/StrategyOrderEditMenuSection';

type Props = {
  sortedOrders: Order[];
  strategy: Strategy;
  filterExchange: string;
  currentPrice: number;
  isEditMenu: boolean;
  handleFilterExchange: (val: ExchangeEnum) => void;
};

const c = {
  twoPercent: 2,
  fourPercent: 4,
  sevenPercent: 7,
  buyTargetPercent: 50,
  success: 'success',
  positiveValue: 'positiveValue',
  negativeValue: 'negativeValue',
  failed: 'failed',
  exchange: 'Exchange',
  created: 'Created',
  buy: 'Buy',
  sell: 'Sell',
  noOrders: 'No orders!',
};

const StrategyOrderListSection = (props: Props) => {
  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const {
    sortedOrders,
    strategy,
    filterExchange,
    currentPrice,
    isEditMenu,
    handleFilterExchange,
  } = props;

  const redirectTo = useRedirect();
  const { updateData } = useInvalidateQueries();
  const { mutate: updStg, isSuccess: isSuccessUpdStg } = useUpdateStrategy();
  const { RenderModal, openModal, ModalContentEnum, isStrategyOrderDetails } =
    useModal();

  const symbol = filteredOrders[0]?.symbol;
  const isCustomToken = customTokens.includes(symbol);

  useEffect(() => {
    const filteredOrders = filterExchange
      ? filterExchange !== ExchangeEnum.All
        ? sortedOrders.filter(
            (order: Order) => order.exchange === filterExchange
          )
        : sortedOrders
      : sortedOrders;
    if (filteredOrders?.length === 0 && sortedOrders?.length) {
      handleFilterExchange(ExchangeEnum.All);
    } else {
      setFilteredOrders(filteredOrders);
    }
  }, [sortedOrders]);

  useEffect(() => {
    if (isSuccessUpdStg && deleteOrderId) {
      removeOrder(deleteOrderId);
    }
  }, [isSuccessUpdStg]);

  /*
  useEffect(() => {
    const s = JSON.parse(strategy.data);
    if (s?.history) {
      console.log('s:', s.history);
    }
  }, [strategy]);

  useEffect(() => {
    console.log('deleteOrderId:', deleteOrderId);
  }, [deleteOrderId]);
  */

  // --- Details

  // /*
  const handleModal = (order: Order) => {
    if (isEditMenu) return;
    setOrderDetails(order);
    openModal(ModalContentEnum.OrderDetails);
  };
  // */

  const archiveOrder = (order: Order) => {
    if (!confirm(msg.editMenuArchiveBtn(order.id))) return;
    setDeleteOrderId(order.id);
    const strategyData = JSON.parse(strategy.data);
    const newEntry = {
      d: Date.now(),
      a: order.amount,
      b: order.price,
      s: currentPrice,
    };
    const updatedHistory = !!strategyData?.history
      ? [...strategyData.history, newEntry]
      : [newEntry];
    const newStrategyData = {
      ...strategyData,
      history: updatedHistory,
    };
    // /*
    updStg({
      strategyId: strategy.id,
      newStrategyData,
      // newStrategyData: null,
    });
    // */
  };

  const handleRemoveOrder = async (id: number) => {
    if (!confirm(msg.editMenuDeleteBtn(id))) return;
    removeOrder(id);
  };

  const removeOrder = async (id: number) => {
    const isDeleted = await deleteOrder(id);
    if (isDeleted) {
      setDeleteOrderId(null);
      updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
      if (sortedOrders.length === 1) {
        const lsTradeStrategyData = u.getLSTradeStrategyData();
        if (lsTradeStrategyData) {
          const dataWithoutCurrentToken = lsTradeStrategyData.filter(
            (el: TradeStrategy) => el.symbol !== sortedOrders[0]?.symbol
          );
          u.updateLSTradeStrategyData(dataWithoutCurrentToken);
        }
        redirectTo('/dashboard');
      }
    }
  };

  return (
    <section className="section strategy-order-list">
      <div className={'section-content strategy-order-list'}>
        {sortedOrders?.length && filteredOrders.length ? (
          <ul className="section-strategy-order-list">
            {filteredOrders.map((order: Order) => {
              const { id, price, amount } = order;
              const isDCAP = u.checkDCAP(symbol);
              // const isBTC = order.symbol === 'BTC';
              // const isETH = order.symbol === 'ETH';

              const sellPercent = isDCAP
                ? c.fourPercent
                : isCustomToken
                ? c.sevenPercent
                : strategy.target;

              const buyPercent = isDCAP
                ? -c.twoPercent
                : isCustomToken
                ? -c.fourPercent
                : -c.buyTargetPercent;

              const _percent = ((currentPrice - price) / price) * 100;
              const percent = _percent === 0 ? 0 : _percent;
              /*
              const percent = _percent < 0 && _percent > -0.09 ? 0 : _percent;
              */

              const isSuccess = percent >= sellPercent;
              const isPositive = percent >= 0 && percent < sellPercent;
              const isNegative = percent <= 0 && percent > buyPercent;
              const isFailed = percent <= buyPercent;

              /* --- Do not delete!
              console.log('');
              console.log(
                'sellPercent:',
                order.symbol,
                customTokens.includes(order.symbol),
                sellPercent
              );
              console.log('isSuccess:', isSuccess, order.price);
              console.log('isPositive:', isPositive);
              console.log('isNegative:', isNegative);
              console.log('isFailed:', isFailed, percent, buyPercent);

              const isSuccess = percentValue >= target;
              const isPositive = percentValue >= 0 && percentValue < target;
              const isNegative = percentValue <= 0 && percentValue > -50;
              const isFailed = percentValue <= -50;
              */

              const handleDisplayPercentValue = () => {
                const percentValue = percent.toFixed();
                const percentValueToDisplay = percentValue.includes('-')
                  ? percentValue.split('-')[1]
                  : percentValue;
                /*
                const isZeroRange = percent > 0 && percent < 0.01;
                const isZero = isZeroRange || percent === 0;
                */
                const isZero = percent === 0;
                const isBig = percentValueToDisplay.length > 2;
                const fixNumber = isZero || isBig ? 0 : 2;
                const signPlus = _percent.toString().includes('-')
                  ? ''
                  : _percent >= 0.1
                  ? '+'
                  : '';
                return `${signPlus}${percent.toFixed(fixNumber)}%`;
                // return `${isPlus ? '+' : ''}${fixedPercent}%`;
                // return `${signPlus}${fixedPercent.toFixed(fixNumber)}%`;
              };

              // ---

              const orderStyle = isSuccess
                ? c.success
                : isPositive
                ? c.positiveValue
                : isNegative
                ? c.negativeValue
                : isFailed
                ? c.failed
                : '';

              const isSingle = sortedOrders.length === 1;
              const itemCountStyle = isSingle ? 'single-item' : 'multi-items';
              const orderItemStyle = `${orderStyle} ${itemCountStyle}`;

              return (
                <li
                  key={id}
                  className={`section-strategy-order-list-item  ${orderItemStyle}`}
                  // onClick={() => showDetails(order)}
                  onClick={() => handleModal(order)}
                >
                  <ul className="section-strategy-order-list-item-row-list">
                    <li className="row-strategy-list-item order-amount">
                      {/* <span>{u.formatMillionAmount('234567035')}</span> */}
                      {/* <span>{u.formatMillionAmount(amount.toString())}</span> */}
                      <span>{u.numberCutter(amount, 3)}</span>
                    </li>

                    <li className="row-strategy-list-item order-price">
                      {/* <span>{formatMillionAmount('234567035')}</span> */}
                      {/* <span>{u.uniNumberFormatter(price)}</span> */}
                      <span>{u.numberCutter(price, isDCAP ? 0 : 3)}</span>
                      {/* <span>{price}</span> */}
                    </li>

                    <li className="row-strategy-list-item order-percent">
                      {/* <span>{'+2345%'}</span> */}

                      {isEditMenu ? (
                        <StrategyOrderEditMenuSection
                          isDCAP={isDCAP}
                          order={order}
                          archiveOrder={archiveOrder}
                          removeOrder={handleRemoveOrder}
                        />
                      ) : (
                        <span>{handleDisplayPercentValue()}</span>
                      )}
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        ) : (
          <span>{c.noOrders}</span>
        )}
      </div>

      {orderDetails && isStrategyOrderDetails && (
        <RenderModal>
          <StrategyOrderDetailsSection
            order={orderDetails}
            currentPrice={currentPrice}
            isSOP={filteredOrders.length === 1}
            // c={c}
          />
        </RenderModal>
      )}
    </section>
  );
};

export default StrategyOrderListSection;
