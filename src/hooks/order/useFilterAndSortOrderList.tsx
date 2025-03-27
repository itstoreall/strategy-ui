import { useEffect, useState } from 'react';
import { AggregatedOrderListAcc, InputEvent } from '@/src/types';
import { OrderTypeEnum, SortEnum } from '@/src/enums';

type Props = {
  label: OrderTypeEnum;
  aggregatedData: AggregatedOrderListAcc[];
  isExpanded: boolean;
  itemLimit: number;
};

const lsOrderListSortKey = 'sortOrders';
const lsBuyTargetListSortKey = 'sortBuyTargets';

const initOrder = () => {
  const savedOrderListSort = localStorage.getItem(lsOrderListSortKey);
  return savedOrderListSort
    ? (JSON.parse(savedOrderListSort) as SortEnum)
    : SortEnum.Percent;
};

const initTarget = () => {
  const savedBuyTargetListSort = localStorage.getItem(lsBuyTargetListSortKey);
  return savedBuyTargetListSort
    ? (JSON.parse(savedBuyTargetListSort) as SortEnum)
    : SortEnum.Percent;
};

const useFilterAndSortOrderList = (props: Props) => {
  const { label, aggregatedData, isExpanded, itemLimit } = props;

  const [orderListSort, setOrderListSort] = useState(initOrder);
  const [buyTargetListSort, setBuyTargetListSort] = useState(initTarget);
  const [filterSymbol, setFilterSymbol] = useState('');

  const isBull = label === OrderTypeEnum.Buy;
  const sortField = isBull ? orderListSort : buyTargetListSort;
  const isSortByPercent = sortField === SortEnum.Percent;
  const isSortBySymbol = sortField === SortEnum.Symbol;
  const isSortByDate = sortField === SortEnum.Date;

  useEffect(() => {
    localStorage.setItem(lsOrderListSortKey, JSON.stringify(orderListSort));
  }, [orderListSort]);

  useEffect(() => {
    localStorage.setItem(
      lsBuyTargetListSortKey,
      JSON.stringify(buyTargetListSort)
    );
  }, [buyTargetListSort]);

  const handleSortToggle = () => {
    const newSortField = isSortByPercent
      ? SortEnum.Date
      : isSortByDate
      ? SortEnum.Symbol
      : SortEnum.Percent;

    if (isBull) {
      setOrderListSort(newSortField);
    } else {
      setBuyTargetListSort(newSortField);
    }
  };

  const handleFilterChange = (e: InputEvent) => {
    setFilterSymbol(e.target.value);
  };

  const resetFilter = () => {
    setFilterSymbol('');
  };

  const filteredData = aggregatedData.filter((order) =>
    order.symbol.toLowerCase().startsWith(filterSymbol.toLowerCase())
  );

  const displayedData = filteredData
    .sort((a, b) => {
      if (isSortBySymbol) {
        return a.symbol.localeCompare(b.symbol);
      } else if (isSortByDate) {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return dateB - dateA;
      } else {
        return b.percent - a.percent;
      }
    })
    .slice(0, isExpanded ? filteredData.length : itemLimit);

  return {
    displayedData,
    filterSymbol,
    sortField,
    handleSortToggle,
    handleFilterChange,
    resetFilter,
  };
};

export default useFilterAndSortOrderList;
