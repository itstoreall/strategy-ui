/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { deleteOrder } from '@/src/lib/api/deleteOrderServerAction';
// import useFilterAndSortOrderList from '@/src/hooks/order/useFilterAndSortOrderList';
// import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
// import useGlobalState from '@/src/hooks/useGlobalState';
// import { OrderTypeEnum, QueryKeyEnum } from '@/src/enums';
// import * as msg from '@/src/messages/confirm';
// import * as u from '@/src/utils';
import * as t from '@/src/types';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import { sortBySymbol } from '@/src/utils';

type Props = {
  // dataDCAP?: t.Order[];
  data: t.HodlTargetsData[];
  // hodlTargetsData?: t.HodlTargetsData[];
  tokens: t.Token[] | null;
  // userId: string | null;
  // isCustom?: boolean;
  handleEditTargets: (args: t.HodlTargetsData) => void;
};

// type ListItemProps = {
//   el: t.HodlTargetsData;
//   // token: t.Token;
// };

type ExpandedData = {
  currentPrice: number;
  // symbol: string;
  // hodlTargets: t.HodlTargets;
} & t.HodlTargetsData;

const c = {
  // lsOrderLimitKey: 'orderListLimited',
  // lsBuyTargetLimitKey: 'buyTargetListLimited',
  lsHodlTargetsLimitKey: 'hodlTargetListLimited',
  // confirmDeletion: 'Buy Target will be deleted!',
  customTitle: 'Targets',
  itemLimit: 8,
  // fourPercent: 4,
  // sevenPercent: 7,
  // buy: 'Buy',
  // wait: 'Wait',
  // sell: 'Sell',
};

const HodlTargetListSection = (props: Props) => {
  // const isBull = props.data[0].type === OrderTypeEnum.Buy;
  const currentLsKey = c.lsHodlTargetsLimitKey;

  // const [BTCButtonStatus, setBTCButtonStatus] = useState<string>('');
  // const [ETHButtonStatus, setETHButtonStatus] = useState<string>('');
  const [hodlTargets, setHodlTargets] = useState<ExpandedData[] | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const savedState = localStorage.getItem(currentLsKey);
    return savedState ? JSON.parse(savedState) : false;
  });

  const { data, tokens, handleEditTargets } = props;

  // const { updateData } = useInvalidateQueries();
  // const { handleUnrealized } = useGlobalState();

  useEffect(() => {
    if (data && tokens) {
      const limitedData = isExpanded
        ? extandData(data, tokens)
        : sortBySymbol(data).slice(0, c.itemLimit);
      setHodlTargets(sortBySymbol(limitedData) as ExpandedData[]);
    }
  }, [data, tokens]);

  /*
  useEffect(() => {
    if (dataDCAP) {
      const BTCOrder = dataDCAP.find((order) => order.symbol === 'BTC');
      if (BTCOrder) {
        // console.log('BTCOrder 1:', isBull);
        if (isBull) {
          // console.log('BTCOrder 2:', isBull);
          setBTCButtonStatus('active');
        }
      } else {
        // console.log('BTCOrder 3:', isBull);
        setBTCButtonStatus('disable');
      }

      const ETHOrder = dataDCAP.find((order) => order.symbol === 'ETH');
      if (ETHOrder) {
        // console.log('ETHOrder 1:', isBull);
        if (isBull) {
          // console.log('ETHOrder 2:', isBull);
          setETHButtonStatus('active');
        }
      } else {
        // console.log('ETHOrder 3:', isBull);
        setETHButtonStatus('disable');
      }
    }
  }, [data]);
  */
  // const itemLimit = 5;
  // const isAdmin = data[0].userId === userId;
  const isToggle = new Set([...data.map((el) => el.symbol)]).size > c.itemLimit;

  useEffect(() => {
    if (!hodlTargets || !tokens) return;
    localStorage.setItem(currentLsKey, JSON.stringify(isExpanded));
    const limitedData = isExpanded
      ? extandData(data, tokens)
      : hodlTargets.slice(0, c.itemLimit);
    setHodlTargets(sortBySymbol(limitedData) as ExpandedData[]);
  }, [isExpanded]);

  // const strategy = isBull ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;

  // const aggregatedData = Object.values(
  //   data.reduce((acc, order: t.Order) => {
  //     if (!tokens) return acc;
  //     const token = tokens.find((token) => token.symbol === order.symbol);
  //     if (!token) return acc;

  //     const isProfitable = token.price > order.price;
  //     const profit = isBull && isProfitable ? token.price * order.amount : null;
  //     const percent = isBull
  //       ? ((token.price - order.price) / order.price) * 100
  //       : ((order.price - token.price) / token.price) * 100;

  //     if (!acc[order.symbol]) {
  //       acc[order.symbol] = {
  //         id: order.id,
  //         symbol: order.symbol,
  //         price: order.price,
  //         totalAmount: order.amount,
  //         totalFiat: order.fiat,
  //         orders: 1,
  //         percent: percent,
  //         unrealized: profit,
  //         orderDate: order.updatedAt.toString(),
  //       };
  //     } else {
  //       const orderDate = u.normalizeISODate(order.updatedAt, 'DD-MM-YY');

  //       const higherPercent =
  //         percent > acc[order.symbol].percent
  //           ? percent
  //           : acc[order.symbol].percent;

  //       const unrealized =
  //         profit || acc[order.symbol].unrealized
  //           ? ((acc[order.symbol].unrealized as number) += profit as number)
  //           : null;

  //       acc[order.symbol].id += order.id;
  //       acc[order.symbol].price += order.price;
  //       acc[order.symbol].totalAmount += order.amount;
  //       acc[order.symbol].totalFiat += order.fiat;
  //       acc[order.symbol].orders += 1;
  //       // acc[order.symbol].percent = +higherPercent.toFixed();
  //       acc[order.symbol].percent = higherPercent;
  //       acc[order.symbol].unrealized = unrealized;
  //       acc[order.symbol].orderDate = orderDate as string;
  //     }
  //     return acc;
  //   }, {} as Record<string, t.AggregatedOrderListAcc>)
  // );

  // const {
  //   displayedData,
  //   filterSymbol,
  //   sortField,
  //   handleFilterChange,
  //   handleSortToggle,
  //   resetFilter,
  // } = useFilterAndSortOrderList({
  //   label: isBull ? OrderTypeEnum.Buy : OrderTypeEnum.Sell,
  //   aggregatedData,
  //   isCustom,
  //   isExpanded,
  //   itemLimit,
  // });

  // useEffect(() => {
  //   if (aggregatedData && aggregatedData.length > 0) {
  //     let unrealizedValue: number = 0;
  //     aggregatedData.forEach((item) => {
  //       // if (!isCustom && item.symbol === 'BTC') {
  //       //   console.log('item:', item);
  //       //   setIsBTCButton(true);
  //       // }
  //       if (item.unrealized) {
  //         unrealizedValue += item.unrealized;
  //       }
  //     });
  //     if (unrealizedValue) {
  //       handleUnrealized(+unrealizedValue.toFixed());
  //     }
  //   }
  // }, [aggregatedData]);

  // ---

  const extandData = (data: t.HodlTargetsData[], tokens: t.Token[]) =>
    data.reduce((acc: ExpandedData[], el) => {
      const currentToken = tokens.find(
        (t) => t.symbol === el.symbol
      ) as t.Token;
      const newEntry = { ...el, currentPrice: currentToken.price };
      acc = [...acc, newEntry];
      return acc;
    }, []);

  const toggleList = () => setIsExpanded((prev) => !prev);

  /*
  const removeBuyTarget = async (symbol: string, id: number) => {
    if (isBull) return;
    if (!confirm(msg.deleteBuyTarget(symbol))) return;
    const isDeleted = await deleteOrder(id);
    if (isDeleted) {
      updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
    }
  };
  */

  // ---

  const HodlTargetListItem = ({ el }: { el: ExpandedData }) => {
    const { symbol, hodlTargets: targets, currentPrice } = el;

    // const strategyPath = `/strategy/${strategy}-${symbol}`;
    // const percentValue = percent < 0 && percent > -0.09 ? 0 : percent;

    // const handleDisplayPercentValue = () => {
    //   const _percentValue = percentValue.toFixed();
    //   const percentValueToDisplay = _percentValue.includes('-')
    //     ? _percentValue.split('-')[1]
    //     : _percentValue;
    //   const isZeroRange = percentValue > 0 && percentValue < 0.1;
    //   const isZero = isZeroRange || percentValue === 0;
    //   const isBig = percentValueToDisplay.length > 2;
    //   const fixNumber = isZero || isBig ? 0 : 1;
    //   const signPlus = percent.toString().includes('-')
    //     ? ''
    //     : percent >= 0.1
    //     ? '+'
    //     : '';
    //   return `${signPlus}${percentValue.toFixed(fixNumber)}%`;
    // };

    // --- Uni Value (BuyTarget)

    // const isReachedTarget = percentValue > 0;
    // const currentBuyTargetValue = isReachedTarget ? c.buy : c.wait;
    // const currentTargetPrice = tokens?.find(
    //   (token) => token.symbol === symbol
    // )?.price;

    // const isDisplaySOP =
    //   currentTargetPrice &&
    //   currentTargetPrice > u.plusPercent(order.price, 0.04);

    // // --- Styles

    // const customStatus =
    //   isCustom && order.percent >= c.sevenPercent
    //     ? 'custom-sell'
    //     : isCustom && order.percent <= -c.fourPercent
    //     ? 'custom-buy'
    //     : isCustom && isDisplaySOP
    //     ? 'stabilizing-order-price'
    //     : '';

    // const tokenPriceStyle = `row-list-item-token-price ${customStatus}`;
    // const bullColor = order.percent > 0 ? 'color-green' : 'color-blue';
    // const bearColor = order.percent > 0 ? 'color-green' : 'color-yellow';
    // const percentColor = isBull ? bullColor : bearColor;
    // const percentStyle = `row-list-item order-percent ${percentColor}`;
    // const reachedTarget = isReachedTarget ? 'color-green' : '';
    // const uniValueStyle = `uni-value ${!isBull ? reachedTarget : ''}`;

    // const isTarget =
    //   hodlTargets.v25 > 0 ||
    //   hodlTargets.v50 > 0 ||
    //   hodlTargets.v75 > 0 ||
    //   hodlTargets.v100 > 0;

    const editHodlTargets = (symbol: string) => {
      // console.log('editHodlTargets:', symbol, hodlTargets);
      handleEditTargets({ symbol, hodlTargets: targets });
    };

    const is25 = targets.v25 > 0;
    const is50 = targets.v50 > 0;
    const is75 = targets.v75 > 0;
    const is100 = targets.v100 > 0;

    const isMore25 = is50 || is75 || is100;
    const isMore50 = is75 || is100;
    const isMore75 = is100;

    const isAchvd25 = is25 && currentPrice >= targets.v25;
    const isAchvd50 = is50 && currentPrice >= targets.v50;
    const isAchvd75 = is75 && currentPrice >= targets.v75;
    const isAchvd100 = is100 && currentPrice >= targets.v100;

    const isGreen25 =
      (isMore25 && isAchvd50) ||
      (isMore25 && isAchvd75) ||
      (isMore25 && isAchvd100) ||
      isAchvd25;

    const isGreen50 =
      (isMore50 && isAchvd75) || (isMore50 && isAchvd100) || isAchvd50;

    const isGreen75 = (isMore75 && isAchvd100) || isAchvd75;
    // const isGreen100 = is100 && currentPrice >= hodlTargets.v100;

    // const isClosed00 = hodlTargets.v100 > 0 && currentPrice >= hodlTargets.v100;

    const isClosed25 = targets.c25;
    const isClosed50 = targets.c50;
    const isClosed75 = targets.c75;
    const isClosed100 = targets.c100;

    // console.log('hodlTargets:', hodlTargets);

    const isBlue25 = isClosed25 || isClosed50 || isClosed75 || isClosed100;
    const isBlue50 = isClosed50 || isClosed75 || isClosed100;
    const isBlue75 = isClosed75 || isClosed100;
    const isBlue100 = isClosed100;

    // console.log('isBlue25 50 75:', isBlue25, isBlue50, isBlue75);

    const v25Style = isBlue25
      ? 'closed'
      : isGreen25
      ? 'achieved'
      : is25 || isMore25
      ? 'active'
      : '';

    const v50Style = isBlue50
      ? 'closed'
      : isGreen50
      ? 'achieved'
      : is50 || isMore50
      ? 'active'
      : '';

    const v75Style = isBlue75
      ? 'closed'
      : isGreen75
      ? 'achieved'
      : is75 || isMore75
      ? 'active'
      : '';

    const v100Style = isBlue100
      ? 'closed'
      : isAchvd100
      ? 'achieved'
      : is100
      ? 'active'
      : '';

    /*
    if (symbol === 'ETH') {
      // if (symbol === 'DOGE') {
      console.log('hodlTargets:', hodlTargets);
      console.log('||:', isMore75, isAchvd75, isGreen75);
      console.log('isGreen25-->:', symbol, isGreen25, v75Style);
    }
    // */

    /*

    console.log('25-->:', symbol, isAchvd25, hodlTargets.v25, currentPrice);
    console.log('50--->:', symbol, isAchvd50, hodlTargets.v50, currentPrice);
    console.log('75---->:', symbol, isAchvd75, hodlTargets.v75, currentPrice);
    console.log('75---->:', symbol, isAchvd100, hodlTargets.v100, currentPrice);
    // */

    const isSingleItem = hodlTargets?.length === 1 ? 'single-item' : '';

    const listItemStyle = `section-hodl-target-list-item ${isSingleItem}`;

    return (
      <li className={listItemStyle}>
        <div
          className="section-hodl-target-list-item-content"
          onClick={() => editHodlTargets(symbol)}
        >
          {/* <span className="hodl-target-values-symbol">{'VIRTUAL'}</span> */}
          <span className={`hodl-target-values-symbol ${v25Style}`}>
            {/* {'VIRTUAL'} */}
            {symbol}
          </span>

          <div className="hodl-target-values-block">
            <span className={`hodl-target-part ${v25Style}`}>
              {!!targets.v25 && <span>{'25%'}</span>}
            </span>

            <span className={`hodl-target-part ${v50Style}`}>
              {!!targets.v50 && <span>{'50%'}</span>}
            </span>

            <span className={`hodl-target-part ${v75Style}`}>
              {!!targets.v75 && <span>{'75%'}</span>}
            </span>

            <span className={`hodl-target-part ${v100Style}`}>
              {!!targets.v100 && <span>{'100%'}</span>}
            </span>
          </div>
        </div>
      </li>
    );
  };

  const handleSortToggle = () => {
    console.log('click sort!');
  };

  return (
    <>
      <MainDividerSection
        className="order-list-devider"
        title={c.customTitle}
        // filterSymbol={!isCustom ? filterSymbol : ''}
        // handleFilterChange={isBull && !isCustom ? handleFilterChange : null}
        // resetFilter={resetFilter}
        // sortField={sortField}
        handleSortToggle={handleSortToggle}
        // ordersDCAP={dataDCAP}
        // orders={data}
        // BTCButtonStatus={BTCButtonStatus}
        // ETHButtonStatus={ETHButtonStatus}
        isSwitchButton={isToggle}
        isDisabled={!isExpanded}
        setIsDisabled={toggleList}
      />

      <section className={'section hodl-target-list'}>
        <div className="section-content hodl-target-list">
          {hodlTargets && tokens && (
            <ul className="section-hodl-target-list">
              {hodlTargets.map((el: ExpandedData, idx) => (
                <HodlTargetListItem
                  key={idx}
                  el={el}
                  // token={tokens.find((t) => t.symbol === el.symbol) as t.Token}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default HodlTargetListSection;
