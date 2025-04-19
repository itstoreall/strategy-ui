import { formatMillionAmount, uniNumberFormatter } from '@/src/utils';
import DotsLoader from '@/src/components/DotsLoader';
// import { Order } from '@/src/types';

type Props = {
  /*
  sortedOrders: Order[] | null;
  */
  orderNumber: number;
  totalAmount: number;
  positiveOrders: number;
  successOrders: number | null;
  depositAmount: number;
  profitAmount: number | null;
};

const StrategySnapshotSection = (props: Props) => {
  const {
    /*
    sortedOrders,
    */
    orderNumber,
    totalAmount,
    positiveOrders,
    successOrders,
    depositAmount,
    profitAmount,
  } = props;

  // console.log('totalAmount:', totalAmount);
  // console.log('assetAmount:', assetAmount);
  // console.log('depositAmount:', depositAmount);
  // console.log('profitAmount:', profitAmount);

  const isOrders = orderNumber > 0;
  const isPositive = !!successOrders && successOrders > 0;
  const isProfit = !!profitAmount && profitAmount > 0;
  const isAllNegative = isOrders && !isProfit && !isPositive;

  const successValue = isProfit && successOrders ? successOrders : 0;
  const orderValue = `${successValue}/${positiveOrders}`;
  const loaderValue = isProfit ? orderValue : <DotsLoader />;

  const positiveValue = isPositive
    ? orderValue
    : isAllNegative
    ? 0
    : loaderValue;

  const profitValue = isProfit ? (
    profitAmount.toFixed()
  ) : isAllNegative ? (
    0
  ) : (
    <DotsLoader />
  );

  return (
    <section className="section order-list-snapshot">
      <ul className="section-content snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Amount</span>
            <span className="content-value">
              {uniNumberFormatter(totalAmount)}
            </span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Success</span>
            <span className="content-value">{positiveValue}</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Deposit</span>
            <span
              className="content-value"
              title={`$${depositAmount?.toFixed(2)}`}
            >
              {formatMillionAmount(depositAmount.toFixed())}
            </span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Unrealized</span>
            <span
              className="content-value"
              title={`$${(+profitValue).toFixed(2)}`}
            >
              {profitValue}
            </span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default StrategySnapshotSection;
