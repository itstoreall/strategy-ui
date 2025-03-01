// import { Token } from '@/src/types';

// import { Order } from '@/src/types';
import { formatMillionAmount } from '@/src/utils';

type Props = {
  orderNumber: number;
  positiveOrders: number;
  successOrders: number;
  depositAmount: number;
  profitAmount: number;
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
  console.log('profitAmount:', profitAmount);

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
            <span className="content-value">{`${successOrders}/${positiveOrders}`}</span>
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
            <span className="content-value">{profitAmount.toFixed()}</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default StrategySnapshotSection;
