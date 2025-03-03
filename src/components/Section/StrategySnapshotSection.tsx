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

  const isProfit = profitAmount !== null;
  const isPositive = successOrders !== null;

  const orderValue = `${successOrders}/${positiveOrders}`;
  const profitValue = isProfit ? profitAmount.toFixed() : <DotsLoader />;
  const positiveValue = isPositive ? orderValue : <DotsLoader />;

  return (
    <section className="section account-snapshot">
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
            <span className="content-value">
              {/* {profitAmount.toFixed()} */}
              {profitValue}
            </span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default StrategySnapshotSection;
