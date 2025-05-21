/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import useModal from '@/src/hooks/useModal';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import * as t from '@/src/types';
import { ExchangeEnum } from '@/src/enums';
import * as u from '@/src/utils';
import TradeStrategyModalContent from '@/src/components/Section/Strategy/TradeStrategyModalContent';
import TradeStrategyOrderList from '@/src/components/Section/Strategy/TradeStrategyOrderList';
import MainDividerSection from '@/src/components/Section/MainDividerSection';

export type TradeStrategyProps = {
  token: t.Token;
  orderData: t.OrderStrategyData;
  exchanges: ExchangeEnum[];
};

export type CopiedField = {
  id: number;
  key: string;
};

export type History = t.HistoryEntry[] | null;
export type Strategy = t.TradeStrategy | null;

const c = {
  initExchange: ExchangeEnum.Binance,
  dividerTitle: 'Take Profit',
  // tradeStrategyKey: 'tradeStrategy',
};

const TradeStrategySection = (props: TradeStrategyProps) => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [orders, setOrders] = useState<t.Order[] | null>(null);
  const [isSelectedAllOrders, seIsSelectedAllOrders] = useState(false);
  const [exs, setExs] = useState<ExchangeEnum[] | null>(null);
  const [selectedEx, setSelectedEx] = useState<ExchangeEnum | null>(null);
  const [strategyHistory, setStrategyHistory] = useState<History>(null);
  const [storedStrategy, setStoredStrategy] = useState<Strategy>(null);
  const [totalSelectedAmount, setTotalSelectedAmount] = useState(0);
  const [avgSelectedBuyPrice, setAvgSelectedBuyPrice] = useState(0);
  const [totalSelectedInvested, setTotalSelectedInvested] = useState(0);
  const [totalSelectedUnrealized, setTotalSelectedUnrealized] = useState(0);
  const [totalSelectedProfit, setTotalSelectedProfit] = useState(0);

  const { token, orderData, exchanges } = props;

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

  /*
  useEffect(() => {
    if (isSuccessUpdateStrategy) {
      console.log('isSuccess:', orderData.strategy.data);
      resetTradeStrategy(false);
    }
  }, [isSuccessUpdateStrategy]);

  useEffect(() => {
    console.log('strategyHistory:', strategyHistory);
  }, [strategyHistory]);
  // */

  useEffect(() => {
    const _exs = exchanges.filter((ex) => {
      const isProfitable = orderData.orders?.find((order) => {
        const currentPrice = token.price;
        const percent = ((currentPrice - order.price) / order.price) * 100;
        return percent > 0 && order.exchange === ex;
      });
      return ex !== ExchangeEnum.All && !!isProfitable;
    });

    if (_exs) {
      const ex = _exs.includes(c.initExchange) ? c.initExchange : _exs[0];
      if (!selectedEx) {
        setSelectedEx(ex);
      } else {
        if (!_exs.includes(selectedEx)) {
          if (ex && ex?.length) {
            setSelectedEx(ex);
          } else {
            setExs(null);
            return;
          }
        }
      }
      setExs(_exs);
    }
  }, [exchanges]);

  useEffect(() => {
    if (orderData && selectedEx) {
      handleSelectedOrders();
    }
  }, [exs]);

  useEffect(() => {
    if (orderData && selectedEx) {
      handleSelectedOrders();
      setSelectedOrders(new Set());
    }
  }, [selectedEx]);

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
      return order.exchange === selectedEx && percent > 0;
    });
    if (selectedOrders) {
      setOrders(selectedOrders);
    }
  };

  const handleFilterExchange = (val: ExchangeEnum) => {
    setSelectedEx(val);
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

  // const getLSData = () => {
  //   const storedTradeStrategyData = localStorage.getItem(c.tradeStrategyKey);
  //   if (storedTradeStrategyData) {
  //     return JSON.parse(storedTradeStrategyData) as t.TradeStrategy[];
  //   } else return null;
  // };

  const getLSCurrentStrategy = (_symbol: string): t.TradeStrategy | null => {
    const lsData = u.getLSTradeStrategyData();
    const lsStrategy = lsData
      ? lsData.find((storedStrategy: t.TradeStrategy) => {
          return storedStrategy.symbol === _symbol;
        })
      : null;
    return lsStrategy ? lsStrategy : null;

    // if (lsData) {
    //   const lsStrategy = lsData.find((storedStrategy: TradeStrategy) => {
    //     return storedStrategy.symbol === _symbol;
    //   });
    //   return lsStrategy ? lsStrategy : null;
    // } else return null;
  };

  // const updateLocalStorage = (data: t.TradeStrategy[]) => {
  //   localStorage.setItem(c.tradeStrategyKey, JSON.stringify(data));
  // };

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
    if (!selectedEx || !totalSelectedAmount) return;
    const newTradeStrategy = createNewTradeStrategy(selectedEx);
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
        a: storedStrategy.amount,
        b: +buyPrice,
        s: storedStrategy.sellPrice,
        // o: storedStrategy.orders,
      };
      // console.log('newHistoryEntry:', newHistoryEntry);
      if (!confirm('New History entry will be created!')) return;
      const newData = strategyHistory
        ? [...strategyHistory, newHistoryEntry]
        : [newHistoryEntry];

      // console.log('newData:', newData);

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
    // console.log('-->', dataWithoutCurrentToken.length);
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

  return orders && orders.length ? (
    <>
      <MainDividerSection
        className="order-list-devider"
        title={c.dividerTitle}
        exchanges={exs}
        filterExchange={selectedEx}
        isSwitchButton
        isDisabled={!isSelectedAllOrders}
        handleFilterExchange={handleFilterExchange}
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
