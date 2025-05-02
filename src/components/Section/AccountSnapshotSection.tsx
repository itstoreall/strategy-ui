import useGlobalState from '@/src/hooks/useGlobalState';
import { formatMillionAmount } from '@/src/utils';
import DotsLoader from '@/src/components/DotsLoader';

type Props = {
  tokenAmount: number;
  assetAmount: number;
  depositAmount: number;
  profitAmount: number | null;
  isProcess: boolean;
};

const config = {
  assets: 'Assets',
  orders: 'Orders',
  deposit: 'Deposit',
  profit: 'Profit',
};

const AccountSnapshotSection = (props: Props) => {
  const { tokenAmount, assetAmount, depositAmount, profitAmount, isProcess } =
    props;

  const { unrealized } = useGlobalState();

  // console.log('tokenAmount:', tokenAmount);
  // console.log('assetAmount:', assetAmount);
  // console.log('depositAmount:', depositAmount);
  // console.log('profitAmount:', profitAmount);

  const handleClickProfit = () => {
    alert(`Unrealized: $${unrealized}`);
  };

  return (
    <section className="section account-snapshot">
      <ul className="section-content snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">{config.assets}</span>
            <span className="content-value">{tokenAmount}</span>
          </div>
        </li>

        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">{config.orders}</span>
            <span className="content-value">{assetAmount}</span>
          </div>
        </li>

        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">{config.deposit}</span>
            <span
              className="content-value"
              title={`$${depositAmount.toFixed(2)}`}
            >
              {formatMillionAmount(depositAmount.toFixed())}
            </span>
          </div>
        </li>

        <li className="snapshot-item">
          <div
            className="item-content available-click"
            onClick={handleClickProfit}
          >
            <span className="content-name">{config.profit}</span>
            <span
              className="content-value"
              title={`$${profitAmount?.toFixed(2)}`}
            >
              {!isProcess ? (
                profitAmount
              ) : (
                <>{assetAmount ? <DotsLoader /> : 0}</>
              )}
            </span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default AccountSnapshotSection;
