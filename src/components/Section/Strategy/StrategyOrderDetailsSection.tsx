import { Order } from '@/src/types';
import * as u from '@/src/utils';

type Props = {
  order: Order;
  currentPrice: number;
  c: { [key: string]: string | number };
};

const StrategyOrderDetailsSection = ({ order, currentPrice, c }: Props) => {
  // console.log('order:', order);

  const calculatedProfit = currentPrice * order.amount - order.fiat;
  const isProfit = calculatedProfit > 0;
  const profitLabel = isProfit ? c.profit : c.losses;
  const profitValue = isProfit
    ? `${calculatedProfit.toFixed(2)}`
    : `${calculatedProfit.toFixed(2)}`;
  /* 
  const profitValue = isProfit
    ? `$${calculatedProfit.toFixed(2)}`
    : `${calculatedProfit.toFixed(2)} ($)`;
  */

  // --- Plus Percent

  const plusSevenPercentPrice = u.plusPercent(order.price, 0.07);
  const plusSevenFormatted = u.numberCutter(plusSevenPercentPrice, 3);
  // const plusSevenPercent = `${c.sevenPercent}: ${plusSevenFormatted}`;

  const plusTenPercentPrice = u.plusPercent(order.price, 0.1);
  const pluseTenFormatted = u.numberCutter(plusTenPercentPrice, 3);
  // const plusTenPercent = `${c.tenPercent}: ${pluseTenFormatted}`;

  // --- Minus Percent

  const minusFourPercentPrice = u.minusPercent(order.price, 0.04);
  const minusFourFormatted = u.numberCutter(minusFourPercentPrice, 3);
  // const minusFourPercent = `${c.fourPercent}: ${minusFourFormatted}`;

  /*
  const minusEightPercentPrice = u.minusPercent(order.price, 0.08);
  const minusEightFormatted = u.numberCutter(minusEightPercentPrice, 3);
  const minusEightPercent = `${c.eightPercent}: ${minusEightFormatted}`;
  */

  const minusTenPercentPrice = u.minusPercent(order.price, 0.1);
  const minusTenFormatted = u.numberCutter(minusTenPercentPrice, 3);
  // const minusTenPercent = `${c.tenPercent}: ${minusTenFormatted}`;

  const dateParts = u
    .normalizeISODate(order.createdAt, 'DD-MM-YY HH:mm')
    .split(' ');

  return (
    <section className="section strategy-order-details">
      <div className={'section-content strategy-order-details'}>
        <div className="strategy-order-details-heading">
          <span className={`details-heading-exchange ${order.exchange}`}>
            <span>{order.exchange}</span>
            {/* {'BINANCE'} */}
            {/* {'MEXC'} */}
            {/* {'BYBIT'} */}
            {/* {'OKX'} */}
          </span>
          <span className="details-heading-info-box">
            <span className="heading-info-date">{`${dateParts[0]} (${dateParts[1]})`}</span>
            <span className="heading-info-id">{`${c.id}: ${order.id}`}</span>
          </span>
        </div>

        <div className="strategy-order-details-info">
          <span>
            <span className="details-info-key">{`${c.price} ($):`}</span>
            <span className="details-info-price">
              {/* <span>{`${203000.567}`}</span> */}
              <span>{`${order.price}`}</span>
            </span>
          </span>
          <span>
            <span className="details-info-key">{`${c.amount} (${order.symbol}):`}</span>
            <span className="details-info-amount">
              {/* <span>{0.0000521}</span> */}
              <span>{order.amount}</span>
            </span>
          </span>
        </div>

        <div className="strategy-order-details-results">
          <span className="details-results-invested">
            <span>{`${c.invested} ($):`}</span>
            <span>{`${order.fiat}`}</span>
          </span>
          <span
            className={`details-results-profit ${
              isProfit ? 'profit-color' : 'losses-color'
            }`}
          >
            <span>{`${profitLabel} ($):`}</span>
            <span>{`${profitValue}`}</span>
          </span>
        </div>

        <ul className="strategy-order-details-prices-list">
          <li className="strategy-order-details-prices-list-item">
            <span>
              <span>{`-${c.fourPercent}%:`}</span>
              <span>{`$${minusFourFormatted}`}</span>
            </span>
            <span>
              <span>{`-${c.tenPercent}%:`}</span>
              <span>{`$${minusTenFormatted}`}</span>
            </span>
          </li>

          <li className="strategy-order-details-prices-list-item">
            <span>
              <span>{`+${c.sevenPercent}%:`}</span>
              <span>{`$${plusSevenFormatted}`}</span>
            </span>
            <span>
              <span>{`+${c.tenPercent}%:`}</span>
              <span>{`$${pluseTenFormatted}`}</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StrategyOrderDetailsSection;
