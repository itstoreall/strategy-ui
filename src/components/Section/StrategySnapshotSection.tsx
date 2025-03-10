import { formatMillionAmount } from '@/src/utils';
import DotsLoader from '@/src/components/DotsLoader';

type Props = {
  orderNumber: number;
  positiveOrders: number;
  successOrders: number | null;
  depositAmount: number;
  profitAmount: number | null;
};

const StrategySnapshotSection = (props: Props) => {
  const {
    orderNumber,
    positiveOrders,
    successOrders,
    depositAmount,
    profitAmount,
  } = props;

  // console.log('tokenAmount:', tokenAmount);
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
            <span className="content-name">Orders</span>
            <span className="content-value">{orderNumber}</span>
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
            <span className="content-value" title={depositAmount.toFixed(2)}>
              {formatMillionAmount(depositAmount.toFixed())}
            </span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Unrealized</span>
            <span className="content-value">{profitValue}</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default StrategySnapshotSection;
