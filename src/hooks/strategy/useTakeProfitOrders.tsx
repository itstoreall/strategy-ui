import { useState } from 'react';
import { Order } from '@/src/types';

type Props = { orders: Order[] | null };

const useTakeProfitOrders = (props: Props) => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [isSelectedAllOrders, setIsSelectedAllOrders] = useState(false);
  const [totalSelectedAmount, setTotalSelectedAmount] = useState(0);
  const [avgSelectedBuyPrice, setAvgSelectedBuyPrice] = useState(0);
  const [totalSelectedInvested, setTotalSelectedInvested] = useState(0);
  const [totalSelectedUnrealized, setTotalSelectedUnrealized] = useState(0);
  const [totalSelectedProfit, setTotalSelectedProfit] = useState(0);

  const { orders } = props;

  // const handleAllOrders = (is: boolean) => setIsSelectedAllOrders(is);
  const handleSelectedOrders = (set: Set<string>) => setSelectedOrders(set);
  const handleAmount = (val: number) => setTotalSelectedAmount(val);
  const handleBuyPrice = (val: number) => setAvgSelectedBuyPrice(val);
  const handleInvested = (val: number) => setTotalSelectedInvested(val);
  const handleUnrealized = (val: number) => setTotalSelectedUnrealized(val);
  const handleProfit = (val: number) => setTotalSelectedProfit(val);

  // ---

  const handleToggleSelect = (id: string) => {
    setSelectedOrders((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(id)) {
        updatedSelected.delete(id);
      } else {
        updatedSelected.add(id);
      }
      return updatedSelected;
    });
  };

  const handleSelectAllOrders = () => {
    setIsSelectedAllOrders((prev: boolean) => {
      const newState = !prev;
      if (newState && orders) {
        const allOrderIds = orders.map((order) => order.id.toString());
        handleSelectedOrders(new Set(allOrderIds));
      } else {
        handleSelectedOrders(new Set());
      }
      return newState;
    });
  };

  return {
    selectedOrders,
    isSelectedAllOrders,
    totalSelectedAmount,
    avgSelectedBuyPrice,
    totalSelectedInvested,
    totalSelectedUnrealized,
    totalSelectedProfit,
    setIsSelectedAllOrders,
    handleAmount,
    handleBuyPrice,
    handleInvested,
    handleUnrealized,
    handleProfit,
    handleToggleSelect,
    handleSelectAllOrders,
  };
};

export default useTakeProfitOrders;
