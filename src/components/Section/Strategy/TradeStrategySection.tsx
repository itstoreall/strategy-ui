/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useLayoutEffect } from 'react';
import useTakeProfitOrders from '@/src/hooks/strategy/useTakeProfitOrders';
import useModal from '@/src/hooks/useModal';
/*
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import useCreateOrder from '@/src/hooks/order/useCreateOrder';
*/
import { ExchangeEnum } from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';
import TradeStrategyModalContentSection from '@/src/components/Section/Strategy/TradeStrategyModalContentSection';
import TradeStrategyOrderListSection from '@/src/components/Section/Strategy/TradeStrategyOrderListSection';
import MainDividerSection from '@/src/components/Section/MainDividerSection';

export type TradeStrategyProps = {
  userId: string;
  token: t.Token;
  orderData: t.OrderStrategyData;
  filterExchange: ExchangeEnum;
  handleFilterExchange?: (val: ExchangeEnum) => void;
};

export type CopiedField = {
  id: number;
  key: string;
};

export type History = t.HistoryEntry[] | null;
export type Strategy = t.TradeStrategy | null;

const c = {
  deleteLSStrategy: 'LS Strategy will be deleted!',
};

const TradeStrategySection = (props: TradeStrategyProps) => {
  const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [orders, setOrders] = useState<t.Order[] | null>(null);
  // const [strategyHistory, setStrategyHistory] = useState<History>(null);
  const [storedStrategy, setStoredStrategy] = useState<Strategy>(null);

  const { token, orderData, filterExchange, handleFilterExchange } = props;

  const {
    selectedOrders,
    isSelectedAllOrders,
    totalSelectedAmount,
    avgSelectedBuyPrice,
    totalSelectedInvested,
    totalSelectedUnrealized,
    totalSelectedProfit,
    setIsSelectedAllOrders,
    handleAmount,
    handleBuyPrice,
    handleInvested,
    handleUnrealized,
    handleProfit,
    handleToggleSelect,
    handleSelectAllOrders,
  } = useTakeProfitOrders({ orders });

  console.log('TradeStrategySection filterExchange:', filterExchange);
  console.log('orders:', orders?.length);

  /*
  const { userOrders } = useFetchAllUserOrders(userId, { enabled: !!userId });

  const { mutate: updateStrategy, isSuccess: isSuccessUpdateStrategy } =
    useUpdateStrategy();

  const invalidateQuery = [
    QueryKeyEnum.UserOrders,
    QueryKeyEnum.UserStrategyOrders,
  ];

  const {
    mutate: createOrder,
    // isSuccess,
    // isError,
  } = useCreateOrder(invalidateQuery);

  useEffect(() => {
    if (isSuccessUpdateStrategy) {
      resetTradeStrategy(false);
      }
      }, [isSuccessUpdateStrategy]);
      
  useLayoutEffect(() => {
    if (orderData.strategy && orderData.strategy?.data) {
      const _strategyHistory =
        typeof orderData.strategy.data === 'string'
          ? JSON.parse(orderData.strategy.data)
          : typeof orderData.strategy.data === 'object'
          ? [orderData.strategy.data]
          : orderData.strategy.data;
      setStrategyHistory(_strategyHistory);
    }
  }, [orderData]);
  */

  const {
    isStrategyModal,
    ModalContentEnum,
    RenderModal,
    openModal,
    closeModal,
  } = useModal();

  // ---

  useEffect(() => {
    const lsData = getLSCurrentStrategy(token.symbol);
    if (lsData) {
      setStoredStrategy(lsData);
    }
  }, []);

  useLayoutEffect(() => {
    // Take Profit
    if (orderData.orders && handleFilterExchange) {
      const exs = getCurrentExchanges(orderData.orders);
      if (exs.size === 1) {
        handleFilterExchange(Array.from(exs)[0]);
      } else if (exs.size > 1) {
        handleFilterExchange(ExchangeEnum.All);
      }
    }
  }, [orderData]);

  // useLayoutEffect(() => {
  useEffect(() => {
    const exs = getCurrentExchanges(orderData.orders);
    // setSelectedOrders(new Set());
    console.log('exs & handleFilterExchange:', exs, !!handleFilterExchange); // Set(1) {'BINANCE'} true
    if (exs.size && handleFilterExchange) {
      console.log('filterExchange & size 1:', filterExchange, exs.size); // ALL 1
      if (filterExchange === ExchangeEnum.All && exs.size === 1) {
        console.log('filterExchange & size 2:', filterExchange, exs.size); // ALL 1
        const val = Array.from(exs)[0];
        console.log('val 3:', val);
        handleFilterExchange(val);
      }
      handleSelectedOrders();
    }
  }, [filterExchange, orderData]);

  useEffect(() => {
    if (orders) {
      const selectedOrderList = orders.filter((order) =>
        selectedOrders.has(order.id.toString())
      );

      // Update selection state (Toggle)
      if (orders?.length === selectedOrders.size) {
        if (orders.length) {
          setIsSelectedAllOrders(true);
        }
      } else if (isSelectedAllOrders && orders?.length > selectedOrders.size) {
        setIsSelectedAllOrders(false);
      }

      // Calculate totals
      const { totalAmount, totalUnrealized, totalInvested } = orders.reduce(
        (acc, order) => {
          if (selectedOrders.has(order.id.toString())) {
            acc.totalAmount += order.amount;
            acc.totalUnrealized += order.amount * token.price;
            acc.totalInvested += order.fiat;
          }
          return acc;
        },
        { totalAmount: 0, totalUnrealized: 0, totalInvested: 0 }
      );

      handleAmount(totalAmount);
      handleInvested(totalInvested);
      handleUnrealized(totalUnrealized);
      handleProfit(totalUnrealized - totalInvested);

      // Calculate AVG Buy Price
      const avgPrice = u.calculateAVGPrice(selectedOrderList);
      handleBuyPrice(avgPrice);
    }
  }, [selectedOrders, orders, token]);

  // console.log('isSelectedAllOrders', isSelectedAllOrders);

  // ---

  const getCurrentExchanges = (data: t.Order[]) => {
    const exs = new Set<ExchangeEnum>();
    data.forEach((order) => {
      if (exs.has(order.exchange)) return;
      exs.add(order.exchange);
    });
    return exs;
  };

  const handleSelectedOrders = () => {
    const selectedOrders = orderData.orders.filter((order) => {
      const currentPrice = token.price;
      const percent = ((currentPrice - order.price) / order.price) * 100;
      return order.exchange === filterExchange && percent > 0;
      // return order.exchange === selectedEx && percent > 0;
    });
    console.log('selectedOrders:', selectedOrders); // []
    if (selectedOrders) {
      setOrders(selectedOrders);
    }
  };

  // --- StoredData:

  const getLSCurrentStrategy = (_symbol: string): t.TradeStrategy | null => {
    const lsData = u.getLSTradeStrategyData();
    const lsStrategy = lsData
      ? lsData.find((storedStrategy: t.TradeStrategy) => {
          return storedStrategy.symbol === _symbol;
        })
      : null;
    return lsStrategy ? lsStrategy : null;
  };

  const createNewTradeStrategy = (ex: ExchangeEnum) => {
    const newTradeStrategy: t.TradeStrategy = {
      date: Date.now(),
      symbol: token.symbol,
      exchange: ex,
      amount: totalSelectedAmount,
      avgBuyPrice: avgSelectedBuyPrice,
      sellPrice: token.price,
      invested: totalSelectedInvested,
      total: totalSelectedUnrealized,
      profit: totalSelectedProfit,
      orders: Array.from(selectedOrders).join(', '),
    };
    return newTradeStrategy;
  };

  // ---

  const displayConfirmMessage = (storedTradeStrategy: t.TradeStrategy) => {
    return `Will be replaced: ${token.symbol} (${storedTradeStrategy.exchange})

    amount: ${storedTradeStrategy.amount}
    invested: ${storedTradeStrategy.invested}
    total: ${u.uniNumberFormatter(storedTradeStrategy.total)}
    profit: ${u.uniNumberFormatter(storedTradeStrategy.profit)}
    orders: ${storedTradeStrategy.orders}
    `;
  };

  const handleTemporaryStorage = () => {
    if (!filterExchange || !totalSelectedAmount) return;
    const newTradeStrategy = createNewTradeStrategy(filterExchange);
    const storedData = u.getLSTradeStrategyData();
    if (storedData) {
      const storedStrategy = storedData.find(
        (storedStrategy: t.TradeStrategy) => {
          return storedStrategy.symbol === token.symbol;
        }
      );
      if (storedStrategy) {
        if (confirm(displayConfirmMessage(storedStrategy))) {
          const newData = storedData.map((storedStrategy: t.TradeStrategy) => {
            return storedStrategy.symbol === token.symbol
              ? newTradeStrategy
              : storedStrategy;
          });
          u.updateLSTradeStrategyData(newData);
          setStoredStrategy(newTradeStrategy);
        }
      } else {
        const newData = [...storedData, newTradeStrategy];
        u.updateLSTradeStrategyData(newData);
        setStoredStrategy(newTradeStrategy);
      }
    } else {
      const newData = [newTradeStrategy];
      u.updateLSTradeStrategyData(newData);
      setStoredStrategy(newTradeStrategy);
    }
  };

  const handleUpdateStrategy = () => {
    /*
    handleTemporaryStorage();
    */
    if (storedStrategy) {
      openModal(ModalContentEnum.Strategy);
    }
  };

  /* --- Do not delete!
  const handleDisplayBuyPrice = (strategy: t.TradeStrategy) => {
    const isAVGPrice = strategy.orders.split(', ').length > 1;
    const buyPrice = isAVGPrice
      ? u.uniNumberFormatter(strategy.avgBuyPrice)
      : strategy.avgBuyPrice;
    return buyPrice;
  };

  const createNewBuyTarget = () => {
    if (userOrders) {
      const existingTarget = userOrders.sell.find(
        (order) => order.symbol === token.symbol
      );
      if (!!existingTarget) {
        alert(`${token.symbol} Target already exists!`);
        return;
      }
      if (!confirm(`${token.symbol} (-10%) Targer will be created!`)) return;
      if (!storedStrategy) return;
      const payload = {
        type: OrderTypeEnum.Sell,
        symbol: token.symbol,
        exchange: ExchangeEnum.Binance,
        amount: storedStrategy.amount,
        price: u.minusPercent(token.price, 0.1),
        userId: userId,
      };
      console.log('payload:', payload);
      createOrder(payload);
    }
  };
  
  const updateStrategyHistory = () => {
    const storedStrategy = getLSCurrentStrategy(token.symbol);
    if (storedStrategy && orderData.strategy) {
      const buyPrice = handleDisplayBuyPrice(storedStrategy);
      const newHistoryEntry: t.HistoryEntry = {
        d: storedStrategy.date,
        // e: storedStrategy.exchange,
        a: storedStrategy.amount,
        b: +buyPrice,
        s: storedStrategy.sellPrice,
        // o: storedStrategy.orders,
      };
      
      if (!confirm('New History entry will be created!')) return;
      const newData = strategyHistory
      ? [...strategyHistory, newHistoryEntry]
      : [newHistoryEntry];
      updateStrategy({
        strategyId: +orderData.strategy.id,
        params: newData,
      });
    }
  };
  
  const deleteHystory = () => {
    if (!confirm('All History will be deleted!')) return;
    updateStrategy({
      strategyId: orderData.strategy.id,
      params: null,
    });
    setStrategyHistory(null);
  };
  */

  const resetTradeStrategy = (isClose: boolean) => {
    const storedData = u.getLSTradeStrategyData();
    const confirmMsg = `${token.symbol} ${c.deleteLSStrategy}`;
    if (!confirm(confirmMsg) || !storedData) return;
    const dataWithoutCurrentToken = storedData.filter((el: t.TradeStrategy) => {
      return el.symbol !== token.symbol;
    });

    if (dataWithoutCurrentToken.length) {
      if (storedData.length > dataWithoutCurrentToken.length) {
        u.updateLSTradeStrategyData(dataWithoutCurrentToken);
        setStoredStrategy(null);
      }
    } else {
      u.deleteLSTradeStrategyData();
      setStoredStrategy(null);
    }
    if (isClose) {
      closeModal();
      return;
    }
  };

  const handleCopyValue = (id: number, key: string, val: number) => {
    if (copiedField) return;
    setCopiedField({ id, key });
    u.copyToClipboard(val.toString());
    setTimeout(() => setCopiedField(null), 500);
  };

  return orders?.length ? (
    <>
      <MainDividerSection
        className="order-list-devider"
        title={filterExchange}
        filterExchange={filterExchange}
        isSwitchButton
        isDisabled={!isSelectedAllOrders}
        setIsDisabled={handleSelectAllOrders}
        /*
        subTitle={calculateStrategyPercent()}
        */
      />

      <section className="section trade-strategy">
        <div className="section-content trade-strategy">
          <TradeStrategyOrderListSection
            token={token}
            orderSet={orders}
            totalSelectedAmount={totalSelectedAmount}
            avgSelectedBuyPrice={avgSelectedBuyPrice}
            totalSelectedInvested={totalSelectedInvested}
            totalSelectedUnrealized={totalSelectedUnrealized}
            totalSelectedProfit={totalSelectedProfit}
            selectedOrders={selectedOrders}
            storedStrategy={storedStrategy}
            copiedField={copiedField}
            handleTemporaryStorage={handleTemporaryStorage}
            handleUpdateStrategy={handleUpdateStrategy}
            handleToggleSelect={handleToggleSelect}
            handleCopyValue={handleCopyValue}
          />
        </div>
      </section>

      {isStrategyModal && (
        <RenderModal>
          <TradeStrategyModalContentSection
            // strategyHistory={strategyHistory}
            storedStrategy={storedStrategy}
            // updateStrategyHistory={updateStrategyHistory}
            // createNewBuyTarget={createNewBuyTarget}
            resetTradeStrategy={resetTradeStrategy}
            // deleteHystory={deleteHystory}
          />
        </RenderModal>
      )}
    </>
  ) : null;
};

export default TradeStrategySection;
