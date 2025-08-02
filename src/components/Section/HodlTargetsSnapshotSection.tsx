import useGlobalState from '@/src/hooks/useGlobalState';
import { formatMillionAmount } from '@/src/utils';
import * as msg from '@/src/messages/alert';
import DotsLoader from '@/src/components/DotsLoader';

type Props = {
  tokenAmount: number;
  assetAmount: number;
  depositAmount: number;
  currentDeposit: number;
  profitAmount: number | null;
  isProcess: boolean;
};

const c = {
  assets: 'Assets',
  orders: 'Orders',
  deposit: 'Deposit',
  profit: 'Profit',
};

const HodlTargetsSnapshotSection = (props: Props) => {
  const {
    tokenAmount,
    assetAmount,
    depositAmount,
    currentDeposit,
    profitAmount,
    isProcess,
  } = props;

  const { unrealized } = useGlobalState();

  const handleClickDeposit = () => {
    const isFullyProfitable = currentDeposit < depositAmount;
    const deposit = isFullyProfitable ? currentDeposit : depositAmount;
    const losses = depositAmount - currentDeposit;
    alert(msg.dashboardSnapshopDeposit(deposit.toFixed(), losses.toFixed()));
  };

  const handleClickProfit = () => {
    alert(msg.dashboardSnapshopUnrelized(unrealized));
  };

  return (
    <section className="section hodl-targets-snapshot">
      <ul className="section-content snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">{c.assets}</span>
            <span className="content-value">{tokenAmount}</span>
          </div>
        </li>

        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">{c.orders}</span>
            <span className="content-value">{assetAmount}</span>
          </div>
        </li>

        <li className="snapshot-item">
          <div
            className="item-content available-click"
            onClick={handleClickDeposit}
          >
            <span className="content-name">{c.deposit}</span>
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
            <span className="content-name">{c.profit}</span>
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

export default HodlTargetsSnapshotSection;
