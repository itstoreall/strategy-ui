/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import useModal from '@/src/hooks/useModal';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import { Order, OrderStrategyData, Token, TradeStrategy } from '@/src/types';
import { ExchangeEnum } from '@/src/enums';
import * as u from '@/src/utils';
import TradeStrategyModalContent from '@/src/components/Section/Strategy/TradeStrategyModalContent';
import TradeStrategyOrderList from '@/src/components/Section/Strategy/TradeStrategyOrderList';
import MainDividerSection from '@/src/components/Section/MainDividerSection';

export type TradeStrategyProps = {
  token: Token;
  orderData: OrderStrategyData;
  exchanges: ExchangeEnum[];
};

export type CopiedField = {
  id: number;
  key: string;
};

const c = {
  initExchange: ExchangeEnum.Binance,
  dividerTitle: 'Take Profit',
  tradeStrategyKey: 'tradeStrategy',
};

const TradeStrategySection = (props: TradeStrategyProps) => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isSelectedAllOrders, seIsSelectedAllOrders] = useState(false);
  const [exs, setExs] = useState<ExchangeEnum[] | null>(null);
  const [selectedEx, setSelectedEx] = useState<ExchangeEnum | null>(null);
  const [totalSelectedAmount, setTotalSelectedAmount] = useState(0);
  const [avgSelectedBuyPrice, setAvgSelectedBuyPrice] = useState(0);
  const [totalSelectedInvested, setTotalSelectedInvested] = useState(0);
  const [totalSelectedUnrealized, setTotalSelectedUnrealized] = useState(0);
  const [totalSelectedProfit, setTotalSelectedProfit] = useState(0);

  const { token, orderData, exchanges } = props;

  const { mutate: updateStrategy } = useUpdateStrategy();

  const {
    RenderModal,
    openModal,
    closeModal,
    ModalContentEnum,
    isStrategyModal,
  } = useModal();

  // ---

  useEffect(() => {
    console.log('orderData strategy:', orderData.strategy);
  }, [orderData]);

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

  const updateLocalStorage = (data: TradeStrategy[]) => {
    localStorage.setItem(c.tradeStrategyKey, JSON.stringify(data));
  };

  const getLocalStorageData = () => {
    const storedTradeStrategyData = localStorage.getItem(c.tradeStrategyKey);
    if (storedTradeStrategyData) {
      return JSON.parse(storedTradeStrategyData) as TradeStrategy[];
    } else return null;
  };

  const createNewTradeStrategy = (ex: ExchangeEnum) => {
    const newTradeStrategy: TradeStrategy = {
      symbol: token.symbol,
      exchange: ex,
      amount: u.uniNumberFormatter(totalSelectedAmount),
      avg: u.uniNumberFormatter(avgSelectedBuyPrice),
      invested: u.uniNumberFormatter(totalSelectedInvested),
      unrealized: u.uniNumberFormatter(totalSelectedUnrealized),
      profit: u.uniNumberFormatter(totalSelectedProfit),
      orders: Array.from(selectedOrders).join(', '),
    };
    return newTradeStrategy;
  };

  const displayConfirmMessage = (storedTradeStrategy: TradeStrategy) => {
    return `Will be replaced: ${token.symbol} (${storedTradeStrategy.exchange})

    amount: ${storedTradeStrategy.amount}
    invested: ${storedTradeStrategy.invested}
    unrealized: ${storedTradeStrategy.unrealized}
    profit: ${storedTradeStrategy.profit}
    orders: ${storedTradeStrategy.orders}
    `;
  };

  const handleTemporaryStorage = () => {
    if (!selectedEx || !totalSelectedAmount) return;
    const newTradeStrategy = createNewTradeStrategy(selectedEx);
    const storedData = getLocalStorageData();
    if (storedData) {
      const storedStrategy = storedData.find(
        (storedStrategy: TradeStrategy) => {
          return storedStrategy.symbol === token.symbol;
        }
      );
      if (storedStrategy) {
        if (confirm(displayConfirmMessage(storedStrategy))) {
          const newData = storedData.map((storedStrategy: TradeStrategy) => {
            return storedStrategy.symbol === token.symbol
              ? newTradeStrategy
              : storedStrategy;
          });
          updateLocalStorage(newData);
        }
      } else {
        const newData = [...storedData, newTradeStrategy];
        updateLocalStorage(newData);
      }
    } else {
      const newData = [newTradeStrategy];
      updateLocalStorage(newData);
    }
  };

  const handleUpdateStrategy = () => {
    handleTemporaryStorage();
    openModal(ModalContentEnum.Strategy);
  };

  const saveTradeStrategy = () => {
    const storedData = getLocalStorageData();
    const storedStrategy = storedData
      ? storedData.find((storedStrategy: TradeStrategy) => {
          return storedStrategy.symbol === token.symbol;
        })
      : null;
    if (storedStrategy && orderData.strategy) {
      updateStrategy({
        strategyId: orderData.strategy.id,
        params: {
          data: storedStrategy,
        },
      });
    }
  };

  const resetTradeStrategy = () => {
    const storedData = getLocalStorageData();
    if (!storedData) return;
    const dataWithoutCurrentToken = storedData.filter((el: TradeStrategy) => {
      return el.symbol !== token.symbol;
    });
    closeModal();
    updateLocalStorage(dataWithoutCurrentToken);
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
            token={token}
            getLocalStorageData={getLocalStorageData}
            saveTradeStrategy={saveTradeStrategy}
            resetTradeStrategy={resetTradeStrategy}
          />
        </RenderModal>
      )}
    </>
  ) : null;
};

export default TradeStrategySection;
