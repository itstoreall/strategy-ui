// import useGlobalState from '@/src/hooks/useGlobalState';
// import { formatMillionAmount } from '@/src/utils';
// import * as msg from '@/src/messages/alert';
// import DotsLoader from '@/src/components/DotsLoader';

import { HodlTargetsData } from '@/src/types';

type Props = {
  assets: HodlTargetsData[];
  value2: number;
  value3: number;
  value4: number;
};

const c = {
  assets: 'Assets',
  empty2: 'Empty 2',
  empty3: 'Empty 3',
  empty4: 'Empty 4',
};

const HodlTargetsSnapshotSection = (props: Props) => {
  const { assets, value2, value3, value4 } = props;

  const assetsNumber = assets ? assets.length : 0;

  // const { updatedTokens } = useGlobalState();

  // console.log('updatedTokens:', updatedTokens);

  // const handleClickDeposit = () => {
  //   const isFullyProfitable = currentDeposit < depositAmount;
  //   const deposit = isFullyProfitable ? currentDeposit : depositAmount;
  //   const losses = depositAmount - currentDeposit;
  //   alert(msg.dashboardSnapshopDeposit(deposit.toFixed(), losses.toFixed()));
  // };

  // const handleClickProfit = () => {
  //   alert(msg.dashboardSnapshopUnrelized(unrealized));
  // };

  return (
    <section className="section hodl-targets-snapshot">
      <ul className="section-content snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">{c.assets}</span>
            <span className="content-value">{assetsNumber}</span>
          </div>
        </li>

        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">{c.empty2}</span>
            <span className="content-value">{value2}</span>
          </div>
        </li>

        <li className="snapshot-item">
          <div className="item-content available-click">
            <span className="content-name">{c.empty3}</span>
            <span className="content-value">{value3}</span>
          </div>
        </li>

        <li className="snapshot-item">
          <div className="item-content available-click">
            <span className="content-name">{c.empty4}</span>
            <span className="content-value">{value4}</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default HodlTargetsSnapshotSection;
