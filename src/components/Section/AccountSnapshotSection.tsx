// import { Token } from '@/src/types';

type Props = {
  tokenAmount: number;
  assetAmount: number;
  depositAmount: number;
};

const AccountSnapshotSection = (props: Props) => {
  const { tokenAmount, assetAmount, depositAmount } = props;

  // console.log('tokenAmount:', tokenAmount);
  // console.log('assetAmount:', assetAmount);
  // console.log('depositAmount:', depositAmount);

  const formatDepositAmount = (amount: string): string => {
    if (Number(amount) < 1_000_000) return amount;
    return `${(Number(amount) / 1_000_000).toFixed(3)}M`;
  };

  return (
    <section className="section account-snapshot">
      <ul className="section-content snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Tokens</span>
            <span className="content-value">{tokenAmount}</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Assets</span>
            <span className="content-value">{assetAmount}</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Deposit</span>
            <span className="content-value" title={depositAmount.toFixed(2)}>
              {formatDepositAmount(depositAmount.toFixed())}
            </span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Profit</span>
            <span className="content-value">3985</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default AccountSnapshotSection;
