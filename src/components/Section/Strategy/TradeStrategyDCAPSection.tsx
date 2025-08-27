/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useLayoutEffect } from 'react';
import { deleteManyOrders } from '@/src/lib/api/deleteManyOrdersServerAction';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import useStrategyDCA from '@/src/hooks/useStrategyDCA';
import useRedirect from '@/src/hooks/useRedirect';
import useModal from '@/src/hooks/useModal';
import { ExchangeEnum, QueryKeyEnum } from '@/src/enums';
import * as confirmMsg from '@/src/messages/confirm';
import * as t from '@/src/types';
import * as u from '@/src/utils';
import TradeStrategyModalContentSection from '@/src/components/Section/Strategy/TradeStrategyModalContentSection';
import ListLoader from '@/src/components/ListLoader';
import Button from '@/src/components/Button/Button';

export type TradeStrategyProps = {
  userId: string;
  token: t.Token;
  snapshot: t.StrategySnapshot;
  orderData: t.OrderStrategyData;
  closePrice: string | null;
  isSubmit: boolean;
  handleFilterExchange?: (val: ExchangeEnum) => void;
  openClosePriceModal: () => void;
};

type DCAPlusListProps = {
  cur: t.CurrentValues;
  buy: t.TradeValues;
  sell: t.TradeValues;
};

export type CopiedField = {
  id: number;
  key: string;
};

export type History = t.HistoryEntry[] | null;
export type Strategy = t.TradeStrategy | null;
// type ModalContent = ModalContentEnum | null;

const c = {
  avg: 'AVG',
  deleteLSStrategy: 'LS Strategy will be deleted!',
  loading: 'loading',
  stopLoss: 'stop-loss',
  buy: 'buy',
  sell: 'sell',
};

const TradeStrategyDCAPSection = (props: TradeStrategyProps) => {
  // const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [storedStrategy, setStoredStrategy] = useState<Strategy>(null);
  const [sellPrice, setSellPrice] = useState<string | null>(null);
  const [orders, setOrders] = useState<t.Order[] | null>(null);

  const { token, orderData, closePrice, isSubmit, openClosePriceModal } = props; //snapshot,

  const { mutate: updStg, isSuccess: isSuccessUpdStg } = useUpdateStrategy();
  const { currentDCAP, buyDCAP, sellDCAP, getStatus } = useStrategyDCA();
  const { updateData } = useInvalidateQueries();
  const redirectTo = useRedirect();

  const isDisplayCloseButton = sellPrice && token.price >= +sellPrice;
  // const isDisplayCloseButton = true;

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
    setOrders(orderData.orders);
  }, [orderData]);

  useEffect(() => {
    if (isSubmit) {
      handleCloseTrades();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isSuccessUpdStg) {
      closeModal();
      redirectTo('/dashboard');
    }
  }, [isSuccessUpdStg]);

  // ---

  const getLSCurrentStrategy = (_symbol: string): t.TradeStrategy | null => {
    const lsData = u.getLSTradeStrategyData();
    const lsStrategy = lsData
      ? lsData.find((storedStrategy: t.TradeStrategy) => {
          return storedStrategy.symbol === _symbol;
        })
      : null;
    return lsStrategy ? lsStrategy : null;
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

  /*
  const handleCopyValue = (id: number, key: string, val: number) => {
    if (copiedField) return;
    setCopiedField({ id, key });
    u.copyToClipboard(val.toString());
    setTimeout(() => setCopiedField(null), 500);
  };
  */

  const handleCloseTrades = async () => {
    const orderIds = orderData.orders.map((order) => order.id);
    if (!orderIds.length || !currentDCAP) return;
    const { symbol } = orderData.orders[0];
    if (!confirm(confirmMsg.closeDCAP(orderIds.length, symbol))) return;
    // /*
    const deletedOrders = await deleteManyOrders(orderIds);
    if (deletedOrders.deletedCount !== orderIds.length) {
      return console.error('Error deleting orders!');
    }
    // */
    const totalAmount = orderData.orders.reduce((acc, order) => {
      acc += order.amount;
      return acc;
    }, 0);
    const params = {
      a: +totalAmount.toString().slice(0, 9),
      b: currentDCAP.avg,
      s: closePrice ? +closePrice : token.price,
      stgData: orderData.strategy.data,
    };
    const newStrategyData = u.updateStrategyHistoryEntry(params);
    // /*
    updStg({
      strategyId: orderData.strategy.id,
      newStrategyData,
      // newStrategyData: null,
    });
    updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
    // */
  };

  const closeTrades = () => {
    openModal(ModalContentEnum.Form);
    openClosePriceModal();
  };

  const DCAPlusList = ({ cur, buy, sell }: DCAPlusListProps) => {
    useEffect(() => {
      if (sell.price) {
        setSellPrice(sell.price);
      }
    }, [sell, cur]);

    const status = getStatus();
    console.log('status:', status);
    const currentPercentDisplay =
      cur.percent < 0
        ? `${u.numberCutter(cur.percent)}%`
        : `+${u.numberCutter(cur.percent)}%`;

    const isBuy = buy.isActive ? c.buy : '';
    const isSell = sell.isActive ? c.sell : '';
    const curItemStyle = `section-trade-strategy-dca-plus-list-item ${status}`;
    const buyItemStyle = `section-trade-strategy-dca-plus-list-item ${isBuy}`;
    const sellItemStyle = `section-trade-strategy-dca-plus-list-item ${isSell}`;

    return (
      <ul className="section-trade-strategy-dca-plus-list">
        <li
          className={curItemStyle}
          title="Average purchase price of all orders"
        >
          <span className="dca-plus-list-item-title">{c.avg}</span>
          <span>$ {u.numberCutter(cur.avg, 0)}</span>
          <span>{currentPercentDisplay}</span>
        </li>
        <li
          className={buyItemStyle}
          title="The purchase price is -2% of the last order price"
        >
          <span className="dca-plus-list-item-title">{c.buy}</span>
          <span>$ {buy.price}</span>
          <span>{buy.amount}</span>
        </li>
        <li
          className={sellItemStyle}
          title="The selling price is +4% to the avg price of all orders"
        >
          <span className="dca-plus-list-item-title">{c.sell}</span>
          <span>$ {sell.price}</span>
          <span>{sell.amount}</span>
        </li>
      </ul>
    );
  };

  return orders?.length ? (
    <>
      {/* <MainDividerSection
        className="order-list-devider"
        title={filterExchange}
        filterExchange={filterExchange}
        isSwitchButton={!isBTC}
        isDisabled={!isSelectedAllOrders}
        setIsDisabled={handleSelectAllOrders}
      /> */}

      <section className="section trade-strategy-dca-plus">
        <div className="section-content trade-strategy-dca-plus">
          {currentDCAP && buyDCAP && sellDCAP ? (
            <div className="section-trade-strategy-dca-plus-values-block">
              <DCAPlusList cur={currentDCAP} buy={buyDCAP} sell={sellDCAP} />
              {isDisplayCloseButton && (
                <div className="trade-strategy-dca-plus-button-block">
                  <Button
                    className="trade-strategy-dca-plus-button"
                    // clickContent={handleCloseTrades}
                    clickContent={closeTrades}
                  >
                    Close
                  </Button>
                  <div />
                </div>
              )}
            </div>
          ) : (
            <ListLoader text={c.loading} />
          )}
        </div>
      </section>

      {isStrategyModal && (
        <RenderModal>
          <TradeStrategyModalContentSection
            storedStrategy={storedStrategy}
            resetTradeStrategy={resetTradeStrategy}
          />
        </RenderModal>
      )}
      {isStrategyModal && (
        <RenderModal>
          <TradeStrategyModalContentSection
            storedStrategy={storedStrategy}
            resetTradeStrategy={resetTradeStrategy}
          />
        </RenderModal>
      )}
    </>
  ) : null;
};

export default TradeStrategyDCAPSection;

/* Dollar & BTC
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { RiBtcLine } from 'react-icons/ri';
*/
