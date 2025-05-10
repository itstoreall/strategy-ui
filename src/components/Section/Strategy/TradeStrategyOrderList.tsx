import { GoClock } from 'react-icons/go';
import { GoGear } from 'react-icons/go';
import * as u from '@/src/utils';
import { Order } from '@/src/types';
import * as t from '@/src/components/Section/Strategy/TradeStrategySection';
import Button from '@/src/components/Button/Button';

type OrderContentProps = {
  id: number;
  amount: number;
  invested: number;
  total: number;
  percent: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onCopy: (id: number, key: string, val: number) => void;
  copiedField: t.CopiedField | null;
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

type ListProps = Pick<t.TradeStrategyProps, 'token'> & {
  orderSet: Order[];
  totalSelectedAmount: number;
  avgSelectedBuyPrice: number;
  totalSelectedInvested: number;
  totalSelectedUnrealized: number;
  totalSelectedProfit: number;
  selectedOrders: Set<string>;
  copiedField: t.CopiedField | null;
  handleTemporaryStorage: () => void;
  handleUpdateStrategy: () => void;
  handleToggleSelect: (id: string) => void;
  handleCopyValue: (id: number, key: string, val: number) => void;
};

const TradeStrategyOrderList = ({
  token,
  orderSet,
  totalSelectedAmount,
  avgSelectedBuyPrice,
  totalSelectedInvested,
  totalSelectedUnrealized,
  totalSelectedProfit,
  selectedOrders,
  copiedField,
  handleTemporaryStorage,
  handleUpdateStrategy,
  handleToggleSelect,
  handleCopyValue,
}: ListProps) => {
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
                  <Button
                    className="trade-strategy-calculating-element-button"
                    clickContent={handleTemporaryStorage}
                  >
                    <GoClock
                      className="trade-strategy-calculating-element-button-icon"
                      size={20}
                    />
                  </Button>
                  <Button
                    className="trade-strategy-calculating-element-button"
                    clickContent={handleUpdateStrategy}
                  >
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

export default TradeStrategyOrderList;
