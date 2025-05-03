/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { GoClock } from 'react-icons/go';
import { GoGear } from 'react-icons/go';
import { ExchangeEnum } from '@/src/enums';
import { Order, OrderStrategyData, Token } from '@/src/types';
import * as u from '@/src/utils';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import Button from '@/src/components/Button/Button';

type Props = {
  token: Token;
  orderData: OrderStrategyData;
};

type ListProps = { token: Token; orderSet: Order[] };

type CopiedField = {
  id: number;
  key: string;
};

type OrderContentProps = {
  id: number;
  amount: number;
  invested: number;
  total: number;
  percent: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onCopy: (id: number, key: string, val: number) => void;
  copiedField: CopiedField | null;
};

const c = {
  dividerTitle: 'Take Profit on Binance',
};

const TradeStrategySection = ({ token, orderData }: Props) => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<CopiedField | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isSelectedAllOrders, seIsSelectedAllOrders] = useState(false);
  const [totalSelectedAmount, setTotalSelectedAmount] = useState(0);
  const [totalSelectedInvested, setTotalSelectedInvested] = useState(0);
  const [avgSelectedBuyPrice, setAvgSelectedBuyPrice] = useState(0);
  const [totalSelectedUnrealized, setTotalSelectedUnrealized] = useState(0);
  const [totalSelectedProfit, setTotalSelectedProfit] = useState(0);

  useEffect(() => {
    if (orderData) {
      const binanceOrders = orderData.orders.filter((order) => {
        const currentPrice = token.price;
        const percent = ((currentPrice - order.price) / order.price) * 100;
        return order.exchange === ExchangeEnum.Binance && percent > 0;
      });

      if (binanceOrders) {
        setOrders(binanceOrders);
      }
    }
  }, [orderData]);

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

  const handleCopyValue = (id: number, key: string, val: number) => {
    if (copiedField) return;
    setCopiedField({ id, key });
    u.copyToClipboard(val.toString());
    setTimeout(() => setCopiedField(null), 500);
  };

  const OrderContent = ({
    id,
    amount,
    invested,
    total,
    // percent,
    isSelected,
    onToggleSelect,
    onCopy,
    copiedField,
  }: OrderContentProps) => {
    const isCopied = copiedField?.id === id;

    // ---

    const selectedStyle = isSelected ? 'selected' : '';
    const contentStyle = `section-trade-strategy-list-item-content ${selectedStyle}`;
    const buttonIconStyle = `trade-strategy-content-button-icon ${selectedStyle}`;

    return (
      <div className={contentStyle}>
        <div className="trade-strategy-element-data-set">
          <span className="trade-strategy-element">
            <span
              className={`trade-strategy-element-value ${
                isCopied && copiedField.key === 'amount' ? 'copied' : ''
              }`}
              onClick={() => onCopy(id, 'amount', amount)}
            >
              {u.uniNumberFormatter(amount)}
            </span>
          </span>
          <span className="trade-strategy-element">
            <span
              className={`trade-strategy-element-value ${
                isCopied && copiedField.key === 'invested' ? 'copied' : ''
              }`}
              onClick={() => onCopy(id, 'invested', invested)}
            >
              {u.uniNumberFormatter(invested)}
            </span>
          </span>
          <span className="trade-strategy-element">
            <span
              className={`trade-strategy-element-value ${
                isCopied && copiedField.key === 'total' ? 'copied' : ''
              }`}
              onClick={() => onCopy(id, 'total', total)}
            >
              {u.uniNumberFormatter(total)}
              {/* {uniNumberFormatter(8000000)} */}
            </span>
          </span>
        </div>

        <div className="trade-strategy-element-button-box">
          <Button
            className="section-trade-strategy-list-item-content-button"
            clickContent={() => onToggleSelect(id.toString())}
          >
            <span className={buttonIconStyle} />
          </Button>
        </div>
      </div>
    );
  };

  const OrderList = ({ token, orderSet }: ListProps) => {
    const singleItemStyle = orderSet.length < 2 ? 'single-element' : '';
    const itemStyle = `section-trade-strategy-list-item ${singleItemStyle}`;

    return (
      <>
        <div className="section-trade-strategy-list-heading">
          <div className="section-trade-strategy-list-heading-content">
            <div className="trade-strategy-calculating-set">
              <div className="trade-strategy-calculating-element-block">
                <span className="trade-strategy-calculating-element">
                  <span className="trade-strategy-calculating-element-title">
                    {'amount'}
                  </span>
                  <span className="trade-strategy-calculating-element-value">
                    {u.uniNumberFormatter(totalSelectedAmount)}
                    {/* {u.uniNumberFormatter(800000000)} */}
                  </span>
                </span>
                <span className="trade-strategy-calculating-element">
                  <span className="trade-strategy-calculating-element-title">
                    {'AVG'}
                  </span>
                  <span className="trade-strategy-calculating-element-value">
                    {u.uniNumberFormatter(avgSelectedBuyPrice)}
                    {/* {u.uniNumberFormatter(800000000)} */}
                  </span>
                </span>
              </div>
              <div className="trade-strategy-calculating-element-block">
                <span className="trade-strategy-calculating-element">
                  <span className="trade-strategy-calculating-element-title">
                    {'invested'}
                  </span>
                  <span className="trade-strategy-calculating-element-value">
                    {u.uniNumberFormatter(totalSelectedInvested)}
                    {/* {u.uniNumberFormatter(80000)} */}
                  </span>
                </span>
                <span className="trade-strategy-calculating-element">
                  <span className="trade-strategy-calculating-element-title">
                    {'unrealized'}
                  </span>
                  <span className="trade-strategy-calculating-element-value">
                    {u.uniNumberFormatter(totalSelectedUnrealized)}
                    {/* {u.uniNumberFormatter(80000)} */}
                  </span>
                </span>
              </div>
              <div className="trade-strategy-calculating-element-block">
                <span className="trade-strategy-calculating-element">
                  <span className="trade-strategy-calculating-element-title">
                    {'profit'}
                  </span>
                  <span className="trade-strategy-calculating-element-value">
                    {u.uniNumberFormatter(totalSelectedProfit)}
                    {/* {u.uniNumberFormatter(80000)} */}
                  </span>
                </span>
                <span className="trade-strategy-calculating-element">
                  {/* <span className="trade-strategy-calculating-element-title">
                    {'strategy'}
                  </span> */}
                  <span className="trade-strategy-calculating-element-button-block">
                    <Button className="trade-strategy-calculating-element-button">
                      <GoClock
                        className="trade-strategy-calculating-element-button-icon"
                        size={20}
                      />
                    </Button>
                    <Button className="trade-strategy-calculating-element-button">
                      <GoGear
                        className="trade-strategy-calculating-element-button-icon"
                        size={20}
                      />
                    </Button>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <ul className="section-trade-strategy-list">
          {orderSet.map((order) => {
            const { id, amount, price, fiat } = order;

            const currentPrice = token.price;
            const total = amount * currentPrice;
            const percent = ((currentPrice - price) / price) * 100;

            return percent > 0 ? (
              <li key={id} className={itemStyle}>
                <OrderContent
                  id={id}
                  amount={amount}
                  invested={fiat}
                  total={total}
                  percent={percent}
                  isSelected={selectedOrders.has(id.toString())}
                  onToggleSelect={handleToggleSelect}
                  onCopy={handleCopyValue}
                  copiedField={copiedField}
                />
              </li>
            ) : null;
          })}
        </ul>
      </>
    );
  };

  return orders && orders.length ? (
    <>
      <MainDividerSection
        className="order-list-devider"
        title={c.dividerTitle}
        isSwitchButton
        isDisabled={!isSelectedAllOrders}
        setIsDisabled={handleSelectAllOrders}
        /*
        subTitle={calculateStrategyPercent()}
        */
      />
      <section className="section trade-strategy">
        <div className="section-content trade-strategy">
          <OrderList token={token} orderSet={orders} />
        </div>
      </section>
    </>
  ) : null;
};

export default TradeStrategySection;
