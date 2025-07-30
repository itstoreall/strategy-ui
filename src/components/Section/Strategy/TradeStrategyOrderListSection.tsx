import { GoClock } from 'react-icons/go';
import { GoGear } from 'react-icons/go';
import * as u from '@/src/utils';
import { Order } from '@/src/types';
import * as t from '@/src/components/Section/Strategy/TradeStrategySection';
import Button from '@/src/components/Button/Button';

type TradeStrategyOrderListProps = Pick<t.TradeStrategyProps, 'token'> & {
  orderSet: Order[];
  totalSelectedAmount: number;
  avgSelectedBuyPrice: number;
  totalSelectedInvested: number;
  totalSelectedUnrealized: number;
  totalSelectedProfit: number;
  selectedOrders: Set<string>;
  storedStrategy: t.Strategy;
  copiedField: t.CopiedField | null;
  handleTemporaryStorage: () => void;
  handleUpdateStrategy: () => void;
  handleToggleSelect: (id: string) => void;
  handleCopyValue: (id: number, key: string, val: number) => void;
};

type OrderContentProps = {
  id: number;
  amount: number;
  invested: number;
  total: number;
  percent: number;
  copiedField: t.CopiedField | null;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onCopy: (id: number, key: string, val: number) => void;
};

const c = {
  keyAmount: 'amount',
  keyAVG: 'AVG',
  keyInvested: 'invested',
  keyTotal: 'total',
  keyProfit: 'profit',
};

const OrderContent = (props: OrderContentProps) => {
  const {
    id,
    amount,
    invested,
    total,
    // percent,
    copiedField,
    isSelected,
    onToggleSelect,
    onCopy,
  } = props;

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
              isCopied && copiedField.key === c.keyAmount ? 'copied' : ''
            }`}
            onClick={() => onCopy(id, c.keyAmount, amount)}
          >
            {u.numberCutter(amount, 3)}
          </span>
        </span>
        <span className="trade-strategy-element">
          <span
            className={`trade-strategy-element-value ${
              isCopied && copiedField.key === c.keyInvested ? 'copied' : ''
            }`}
            onClick={() => onCopy(id, c.keyInvested, invested)}
          >
            {u.numberCutter(invested)}
          </span>
        </span>
        <span className="trade-strategy-element">
          <span
            className={`trade-strategy-element-value ${
              isCopied && copiedField.key === c.keyTotal ? 'copied' : ''
            }`}
            onClick={() => onCopy(id, c.keyTotal, total)}
          >
            {u.numberCutter(total)}
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

const TradeStrategyOrderListSection = (props: TradeStrategyOrderListProps) => {
  const {
    token,
    orderSet,
    totalSelectedAmount,
    avgSelectedBuyPrice,
    totalSelectedInvested,
    totalSelectedUnrealized,
    totalSelectedProfit,
    selectedOrders,
    storedStrategy,
    copiedField,
    handleTemporaryStorage,
    handleUpdateStrategy,
    handleToggleSelect,
    handleCopyValue,
  } = props;

  // const isBTC = token.symbol === 'BTC';
  // const isETH = token.symbol === 'ETH';

  const isDCAP = u.checkDCAP(token.symbol);

  const singleItemStyle = orderSet.length < 2 ? 'single-element' : '';
  const itemStyle = `section-trade-strategy-list-item ${singleItemStyle}`;
  const isStoredStrategy = storedStrategy ? 'is-stored-strategy' : '';
  const calcBtnStyle = `trade-strategy-calculating-element-button ${isStoredStrategy}`;

  return (
    <>
      <div className="section-trade-strategy-list-heading">
        <div className="section-trade-strategy-list-heading-content">
          <div className="trade-strategy-calculating-set">
            <div className="trade-strategy-calculating-element-block">
              <span className="trade-strategy-calculating-element">
                <span className="trade-strategy-calculating-element-title">
                  {c.keyAmount}
                </span>
                <span className="trade-strategy-calculating-element-value">
                  {u.numberCutter(totalSelectedAmount, 3)}
                  {/* {u.uniNumberFormatter(800000000)} */}
                </span>
              </span>
              <span className="trade-strategy-calculating-element">
                <span className="trade-strategy-calculating-element-title">
                  {c.keyAVG}
                </span>
                <span className="trade-strategy-calculating-element-value">
                  {u.numberCutter(avgSelectedBuyPrice, isDCAP ? 0 : 3)}
                  {/* {u.uniNumberFormatter(800000000)} */}
                </span>
              </span>
            </div>
            <div className="trade-strategy-calculating-element-block">
              <span className="trade-strategy-calculating-element">
                <span className="trade-strategy-calculating-element-title">
                  {c.keyInvested}
                </span>
                <span className="trade-strategy-calculating-element-value">
                  {u.numberCutter(totalSelectedInvested)}
                  {/* {u.uniNumberFormatter(80000)} */}
                </span>
              </span>
              <span className="trade-strategy-calculating-element">
                <span className="trade-strategy-calculating-element-title">
                  {c.keyTotal}
                </span>
                <span className="trade-strategy-calculating-element-value">
                  {u.numberCutter(totalSelectedUnrealized)}
                  {/* {u.uniNumberFormatter(80000)} */}
                </span>
              </span>
            </div>
            <div className="trade-strategy-calculating-element-block">
              <span className="trade-strategy-calculating-element">
                <span className="trade-strategy-calculating-element-title">
                  {c.keyProfit}
                </span>
                <span className="trade-strategy-calculating-element-value">
                  {u.numberCutter(totalSelectedProfit)}
                  {/* {u.uniNumberFormatter(80000)} */}
                </span>
              </span>
              <span className="trade-strategy-calculating-element">
                <span className="trade-strategy-calculating-element-button-block">
                  <Button
                    className={calcBtnStyle}
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

export default TradeStrategyOrderListSection;
