import { numberCutter, uniNumberFormatter } from '@/src/utils';
import DotsLoader from '@/src/components/DotsLoader';
// import { Order } from '@/src/types';

type Props = {
  /*
  sortedOrders: Order[] | null;
  */
  isBTC?: boolean;
  orderNumber: number;
  totalAmount: number;
  positiveOrders: number;
  successOrders: number | null;
  depositAmount: number;
  total: number | null;
};

const c = {
  total: 'Total',
  unrealized: 'Unrealized',
};

const StrategySnapshotSection = (props: Props) => {
  const {
    /*
    sortedOrders,
    */
    isBTC,
    orderNumber,
    totalAmount,
    positiveOrders,
    successOrders,
    depositAmount,
    total,
  } = props;

  const isOrders = orderNumber > 0;
  const isPositive = !!successOrders && successOrders > 0;
  const isProfit = !!total && total > 0;
  const isAllNegative = isOrders && !isProfit && !isPositive;

  const successValue = isProfit && successOrders ? successOrders : 0;
  const orderValue = `${successValue}/${positiveOrders}`;
  const loaderValue = isProfit ? orderValue : <DotsLoader />;

  const positiveValue = isPositive
    ? orderValue
    : isAllNegative
    ? 0
    : loaderValue;

  const totalValue = isProfit ? total : isAllNegative ? 0 : <DotsLoader />;
  const currentProfit = numberCutter(Number(totalValue) - depositAmount, 1);

  return (
    <section className="section order-list-snapshot">
      <ul className="section-content snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Amount</span>
            <span className="content-value" title={totalAmount.toString()}>
              {uniNumberFormatter(totalAmount)}
            </span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            {isBTC ? (
              <>
                <span className="content-name">Deposit</span>
                <span
                  className="content-value"
                  // title={`$${depositAmount.toFixed(2)}`}
                >
                  {numberCutter(depositAmount)}
                  {/* {formatMillionAmount(depositAmount.toFixed(1))} */}
                </span>
              </>
            ) : (
              <>
                <span className="content-name">Success</span>
                <span className="content-value">{positiveValue}</span>
              </>
            )}
            {/* <span className="content-value">{positiveValue}</span> */}
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            {isBTC ? (
              <>
                <span className="content-name">
                  {currentProfit.includes('-') ? 'Losses' : 'Profit'}
                </span>
                <span className="content-value">
                  {numberCutter(currentProfit)}
                </span>
              </>
            ) : (
              <>
                <span className="content-name">Deposit</span>
                <span className="content-value">
                  {numberCutter(depositAmount)}
                  {/* {formatMillionAmount(depositAmount.toFixed(1))} */}
                </span>
              </>
            )}
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">
              {isBTC ? c.total : c.unrealized}
            </span>
            <span className="content-value">
              {totalValue ? numberCutter(+totalValue) : 0}
            </span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default StrategySnapshotSection;
