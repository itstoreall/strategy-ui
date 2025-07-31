import useGlobalState from '@/src/hooks/useGlobalState';
import * as u from '@/src/utils';
import * as t from '@/src/types';

const useDCAPStatus = () => {
  const { updatedTokens } = useGlobalState();

  const getSpecStatus = (symbol: string, orders: t.Order[]) => {
    let status = '';
    if (!symbol || !orders) return '';
    const token = updatedTokens?.find((el) => el?.symbol === symbol);
    const _orders = orders.filter((order) => order.symbol === symbol);
    if (token && _orders.length) {
      const avg = u.calculateAVGPrice(_orders);
      const totalAmount = _orders.reduce((acc: number, order: t.Order) => {
        acc += order.amount;
        return acc;
      }, 0);
      const curValues = u.getCurrentValues(token.price, avg);
      const buyValues = u.getBuyValues(orders);
      const sellValues = u.getSellValues(totalAmount, avg);
      if (!token || !curValues || !buyValues || !sellValues) return '';
      status = u.handleDCAPStatus(
        token.price,
        +curValues.stopLoss,
        token.price <= buyValues.buyPrice,
        token.price >= sellValues.sellPrice
      );
    }
    return status;
  };

  return { getSpecStatus };
};

export default useDCAPStatus;
