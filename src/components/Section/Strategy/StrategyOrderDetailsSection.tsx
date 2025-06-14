import { Order } from '@/src/types';
import * as u from '@/src/utils';

type Props = {
  order: Order;
  currentPrice: number;
  c: { [key: string]: string | number };
};

// const c = {
//   eightPercent: 8,
//   fourPercent: 4,
//   sevenPercent: 7,
//   tenPercent: 10,
//   id: 'ID',
//   amount: 'Amount',
//   price: 'Price',
//   total: 'Total',
//   profit: 'Profit',
//   losses: 'Losses',
//   created: 'Created',
//   buy: 'Buy',
//   sell: 'Sell',
// };

const StrategyOrderDetailsSection = ({ order, currentPrice, c }: Props) => {
  console.log('order:', order);

  const calculatedProfit = currentPrice * order.amount - order.fiat;
  const isProfit = calculatedProfit > 0;
  const profitLabel = isProfit ? c.profit : c.losses;
  const profitValue = isProfit
    ? `$${calculatedProfit.toFixed(2)}`
    : `${calculatedProfit.toFixed(2)} ($)`;

  // --- Plus Percent

  const plusSevenPercentPrice = u.plusPercent(order.price, 0.07);
  const plusSevenFormatted = u.numberCutter(plusSevenPercentPrice, 3);
  const plusSevenPercent = `${c.sevenPercent}: ${plusSevenFormatted}`;

  const plusTenPercentPrice = u.plusPercent(order.price, 0.1);
  const pluseTenFormatted = u.numberCutter(plusTenPercentPrice, 3);
  const plusTenPercent = `${c.tenPercent}: ${pluseTenFormatted}`;

  // --- Minus Percent

  const minusFourPercentPrice = u.minusPercent(order.price, 0.04);
  const minusFourFormatted = u.numberCutter(minusFourPercentPrice, 3);
  const minusFourPercent = `${c.fourPercent}: ${minusFourFormatted}`;

  /*
  const minusEightPercentPrice = u.minusPercent(order.price, 0.08);
  const minusEightFormatted = u.numberCutter(minusEightPercentPrice, 3);
  const minusEightPercent = `${c.eightPercent}: ${minusEightFormatted}`;
  */

  const minusTenPercentPrice = u.minusPercent(order.price, 0.1);
  const minusTenFormatted = u.numberCutter(minusTenPercentPrice, 3);
  const minusTenPercent = `${c.tenPercent}: ${minusTenFormatted}`;

  alert(`
  ${c.id}: ${order.id} - ${order.exchange}
  ${c.amount}: ${order.amount} ${order.symbol}
  ${c.price}: $${order.price}
  ${c.total}: $${order.fiat} ~ ${profitLabel}: ${profitValue}
  ${c.created}: ${u.normalizeISODate(order.createdAt, 'DD-MM-YY HH:mm')}

  ${c.buy}: [-${minusFourPercent}] [-${minusTenPercent}]
  ${c.sell}: [+${plusSevenPercent}] [+${plusTenPercent}]
  `);

  return (
    <section className="">
      <ul>
        <li>
          <span>{`${c.id}: ${order.id} - ${order.exchange}`}</span>
          <span>{`${c.amount}: ${order.amount} ${order.symbol}`}</span>
        </li>
      </ul>
    </section>
  );
};

export default StrategyOrderDetailsSection;
