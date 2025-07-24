/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useLayoutEffect } from 'react';
import { deleteManyOrders } from '@/src/lib/api/deleteManyOrdersServerAction';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import useStrategyDCA from '@/src/hooks/useStrategyDCA';
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
  handleFilterExchange?: (val: ExchangeEnum) => void;
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

const c = {
  avg: 'AVG',
  deleteLSStrategy: 'LS Strategy will be deleted!',
  loading: 'loading',
  stopLoss: 'stop-loss',
  buy: 'buy',
  sell: 'sell',
};

const TradeStrategyDCAPlusSection = (props: TradeStrategyProps) => {
  // const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [storedStrategy, setStoredStrategy] = useState<Strategy>(null);
  const [sellPrice, setSellPrice] = useState<string | null>(null);
  const [orders, setOrders] = useState<t.Order[] | null>(null);

  const { token, orderData } = props; //snapshot,

  const { mutate: updStg, isSuccess: isSuccessUpdStg } = useUpdateStrategy();
  const { currentBTC, buyBTC, sellBTC, getStatus } = useStrategyDCA();
  const { updateData } = useInvalidateQueries();

  const isDisplayCloseButton = sellPrice && token.price >= +sellPrice;
  // const isDisplayCloseButton = true;

  const {
    isStrategyModal,
    // ModalContentEnum,
    RenderModal,
    // openModal,
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
    if (isSuccessUpdStg) {
      console.log('isSuccessUpdStg:', isSuccessUpdStg);
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
    if (!orderIds.length || !currentBTC) return;
    if (!confirm(confirmMsg.closeTrades(`${orderIds.length} BTC`))) return;
    const deletedOrders = await deleteManyOrders(orderIds);
    if (deletedOrders.deletedCount === orderIds.length) {
      const totalAmount = orderData.orders.reduce((acc, order) => {
        acc += order.amount;
        return acc;
      }, 0);
      const params = {
        a: totalAmount,
        b: currentBTC.avg,
        s: token.price,
        stgData: orderData.strategy.data,
      };
      const newStrategyData = u.createStrategyEntry(params);
      updStg({
        strategyId: orderData.strategy.id,
        newStrategyData,
        // newStrategyData: null,
      });
      updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
    }
  };

  const DCAPlusList = ({ cur, buy, sell }: DCAPlusListProps) => {
    useEffect(() => {
      if (sell.price) {
        setSellPrice(sell.price);
      }
    }, [sell, cur]);

    const status = getStatus();
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
        <li className={curItemStyle}>
          <span className="dca-plus-list-item-title">{c.avg}</span>
          <span>$ {u.numberCutter(cur.avg, 0)}</span>
          <span>{currentPercentDisplay}</span>
        </li>
        <li className={buyItemStyle}>
          <span className="dca-plus-list-item-title">{c.buy}</span>
          <span>$ {buy.price}</span>
          <span>{buy.amount}</span>
        </li>
        <li className={sellItemStyle}>
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
          {currentBTC && buyBTC && sellBTC ? (
            <div className="section-trade-strategy-dca-plus-values-block">
              <DCAPlusList cur={currentBTC} buy={buyBTC} sell={sellBTC} />
              {isDisplayCloseButton && (
                <div className="trade-strategy-dca-plus-button-block">
                  <Button
                    className="trade-strategy-dca-plus-button"
                    clickContent={handleCloseTrades}
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

export default TradeStrategyDCAPlusSection;

/* Dollar & BTC
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { RiBtcLine } from 'react-icons/ri';
*/
