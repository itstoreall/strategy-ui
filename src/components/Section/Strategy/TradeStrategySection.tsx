/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import useModal from '@/src/hooks/useModal';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import { ExchangeEnum } from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';
import TradeStrategyModalContent from '@/src/components/Section/Strategy/TradeStrategyModalContent';
import TradeStrategyOrderList from '@/src/components/Section/Strategy/TradeStrategyOrderList';
import MainDividerSection from '@/src/components/Section/MainDividerSection';

export type TradeStrategyProps = {
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

// const c = {};

const TradeStrategySection = (props: TradeStrategyProps) => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [orders, setOrders] = useState<t.Order[] | null>(null);
  const [isSelectedAllOrders, seIsSelectedAllOrders] = useState(false);
  const [strategyHistory, setStrategyHistory] = useState<History>(null);
  const [storedStrategy, setStoredStrategy] = useState<Strategy>(null);
  const [totalSelectedAmount, setTotalSelectedAmount] = useState(0);
  const [avgSelectedBuyPrice, setAvgSelectedBuyPrice] = useState(0);
  const [totalSelectedInvested, setTotalSelectedInvested] = useState(0);
  const [totalSelectedUnrealized, setTotalSelectedUnrealized] = useState(0);
  const [totalSelectedProfit, setTotalSelectedProfit] = useState(0);

  const { token, orderData, filterExchange, handleFilterExchange } = props;

  const { mutate: updateStrategy } = useUpdateStrategy(); // isSuccess: isSuccessUpdateStrategy

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
    // Take Profit
    if (orderData.orders && handleFilterExchange) {
      const exs = new Set<ExchangeEnum>();
      orderData.orders.forEach((order) => {
        if (exs.has(order.exchange)) return;
        exs.add(order.exchange);
      });
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

  useEffect(() => {
    setSelectedOrders(new Set());
    handleSelectedOrders();
  }, [filterExchange]);

  useEffect(() => {
    if (orders) {
      const selectedOrderList = orders.filter((order) =>
        selectedOrders.has(order.id.toString())
      );

      // Update selection state (Toggle)
      if (orders?.length === selectedOrders.size) {
        seIsSelectedAllOrders(true);
      } else if (isSelectedAllOrders && orders?.length > selectedOrders.size) {
        seIsSelectedAllOrders(false);
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

      setTotalSelectedAmount(totalAmount);
      setTotalSelectedInvested(totalInvested);
      setTotalSelectedUnrealized(totalUnrealized);
      setTotalSelectedProfit(totalUnrealized - totalInvested);

      // Calculate AVG Buy Price
      const avgPrice = u.calculateAVGPrice(selectedOrderList);
      setAvgSelectedBuyPrice(avgPrice);
    }
  }, [selectedOrders, orders, token]);

  // ---

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

  const handleToggleSelect = (id: string) => {
    setSelectedOrders((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(id)) {
        updatedSelected.delete(id);
      } else {
        updatedSelected.add(id);
      }
      return updatedSelected;
    });
  };

  const handleSelectAllOrders = () => {
    seIsSelectedAllOrders((prev) => {
      const newState = !prev;
      if (newState && orders) {
        const allOrderIds = orders.map((order) => order.id.toString());
        setSelectedOrders(new Set(allOrderIds));
      } else {
        setSelectedOrders(new Set());
      }
      return newState;
    });
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
    if (!confirm('Local Storage will be cleaned out!') || !storedData) return;
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

  // console.log('--->', Boolean(orders && orders.length), orders, orders?.length);

  return orders && orders.length ? (
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
            resetTradeStrategy={resetTradeStrategy}
            deleteHystory={deleteHystory}
          />
        </RenderModal>
      )}
    </>
  ) : null;
};

export default TradeStrategySection;
