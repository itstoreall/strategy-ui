/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ExchangeEnum } from '@/src/enums';
import { Order, OrderStrategyData, Token } from '@/src/types';
import { copyToClipboard, uniNumberFormatter } from '@/src/utils';
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
  const [totalSelectedAmount, setTotalSelectedAmount] = useState<number>(0);
  // const [totalProfit, setTotalProfit] = useState<number>(0);

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

  // Calculate the total amount of selected orders
  useEffect(() => {
    if (orders) {
      const totalAmount = orders.reduce((total, order) => {
        if (selectedOrders.has(order.id.toString())) {
          return total + order.amount;
        }
        return total;
      }, 0);
      setTotalSelectedAmount(totalAmount);
    }
  }, [selectedOrders, orders]);

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
    copyToClipboard(val.toString());
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
              {uniNumberFormatter(amount)}
            </span>
          </span>
          <span className="trade-strategy-element">
            <span
              className={`trade-strategy-element-value ${
                isCopied && copiedField.key === 'invested' ? 'copied' : ''
              }`}
              onClick={() => onCopy(id, 'invested', invested)}
            >
              {uniNumberFormatter(invested)}
            </span>
          </span>
          <span className="trade-strategy-element">
            <span
              className={`trade-strategy-element-value ${
                isCopied && copiedField.key === 'total' ? 'copied' : ''
              }`}
              onClick={() => onCopy(id, 'total', total)}
            >
              {uniNumberFormatter(total)}
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

  const OrderList = ({ token, orderSet }: ListProps) => (
    <>
      <div className="section-trade-strategy-list-heading">
        <div className="section-trade-strategy-list-heading-content">
          <div className="trade-strategy-calculating-set">
            <span className="trade-strategy-calculating-element">
              {uniNumberFormatter(totalSelectedAmount)}
              {/* {uniNumberFormatter(80000)} */}
            </span>
            <span className="trade-strategy-calculating-element">
              {/* {uniNumberFormatter(totalProfit)} */}
              {uniNumberFormatter(80000)}
            </span>
            <span className="trade-strategy-calculating-element">
              {uniNumberFormatter(80000)}
            </span>
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
            <li key={id} className="section-trade-strategy-list-item">
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
