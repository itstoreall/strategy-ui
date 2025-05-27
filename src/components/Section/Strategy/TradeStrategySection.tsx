/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useLayoutEffect } from 'react';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import useTakeProfitOrders from '@/src/hooks/strategy/useTakeProfitOrders';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import useModal from '@/src/hooks/useModal';
import { ExchangeEnum, OrderTypeEnum, QueryKeyEnum } from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';
import TradeStrategyModalContent from '@/src/components/Section/Strategy/TradeStrategyModalContent';
import TradeStrategyOrderList from '@/src/components/Section/Strategy/TradeStrategyOrderList';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import useCreateOrder from '@/src/hooks/order/useCreateOrder';

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
  // const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [orders, setOrders] = useState<t.Order[] | null>(null);
  // const [isSelectedAllOrders, setIsSelectedAllOrders] = useState(false);
  const [strategyHistory, setStrategyHistory] = useState<History>(null);
  const [storedStrategy, setStoredStrategy] = useState<Strategy>(null);
  // const [totalSelectedAmount, setTotalSelectedAmount] = useState(0);
  // const [avgSelectedBuyPrice, setAvgSelectedBuyPrice] = useState(0);
  // const [totalSelectedInvested, setTotalSelectedInvested] = useState(0);
  // const [totalSelectedUnrealized, setTotalSelectedUnrealized] = useState(0);
  // const [totalSelectedProfit, setTotalSelectedProfit] = useState(0);

  const { userId, token, orderData, filterExchange, handleFilterExchange } =
    props;

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

  const {
    isStrategyModal,
    ModalContentEnum,
    RenderModal,
    openModal,
    /*
    closeModal,
    */
  } = useModal();

  // ---

  useEffect(() => {
    const lsData = getLSCurrentStrategy(token.symbol);
    if (lsData) {
      setStoredStrategy(lsData);
    }
  }, []);

  useEffect(() => {
    if (isSuccessUpdateStrategy) {
      resetTradeStrategy(false);
    }
  }, [isSuccessUpdateStrategy]);

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

    // History
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

  useLayoutEffect(() => {
    const exs = getCurrentExchanges(orderData.orders);
    // setSelectedOrders(new Set());
    if (exs.size && handleFilterExchange) {
      if (filterExchange === ExchangeEnum.All && exs.size === 1) {
        handleFilterExchange(Array.from(exs)[0]);
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
    if (selectedOrders) {
      setOrders(selectedOrders);
    }
  };

  // const chooseOrder = (val: ExchangeEnum) => {
  //   if (handleFilterExchange) {
  //     handleFilterExchange(val);
  //   }
  // };

  // const handleToggleSelect = (id: string) => {
  //   setSelectedOrders((prevSelected) => {
  //     const updatedSelected = new Set(prevSelected);
  //     if (updatedSelected.has(id)) {
  //       updatedSelected.delete(id);
  //     } else {
  //       updatedSelected.add(id);
  //     }
  //     return updatedSelected;
  //   });
  // };

  // const handleSelectAllOrders = () => {
  //   setIsSelectedAllOrders((prev: boolean) => {
  //     const newState = !prev;
  //     if (newState && orders) {
  //       const allOrderIds = orders.map((order) => order.id.toString());
  //       setSelectedOrders(new Set(allOrderIds));
  //     } else {
  //       setSelectedOrders(new Set());
  //     }
  //     return newState;
  //   });
  // };

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

  const handleDisplayBuyPrice = (strategy: t.TradeStrategy) => {
    const isAVGPrice = strategy.orders.split(', ').length > 1;
    const buyPrice = isAVGPrice
      ? u.uniNumberFormatter(strategy.avgBuyPrice)
      : strategy.avgBuyPrice;
    return buyPrice;
  };

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
    openModal(ModalContentEnum.Strategy);
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

      // /*
      if (!storedStrategy) return;
      const payload = {
        type: OrderTypeEnum.Sell,
        symbol: token.symbol,
        exchange: ExchangeEnum.Binance,
        amount: storedStrategy.amount,
        price: storedStrategy.avgBuyPrice,
        userId: userId,
      };

      console.log('payload:', payload);

      createOrder(payload);
      // */
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
        if (isClose) {
          /*
        closeModal();
        */
          return;
        }
      }
    } else {
      u.deleteLSTradeStrategyData();
      setStoredStrategy(null);
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
          <TradeStrategyOrderList
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
          <TradeStrategyModalContent
            strategyHistory={strategyHistory}
            storedStrategy={storedStrategy}
            updateStrategyHistory={updateStrategyHistory}
            createNewBuyTarget={createNewBuyTarget}
            resetTradeStrategy={resetTradeStrategy}
            deleteHystory={deleteHystory}
          />
        </RenderModal>
      )}
    </>
  ) : null;
};

export default TradeStrategySection;
