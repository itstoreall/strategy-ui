import { useEffect, useState } from 'react';
import { AggregatedOrderListAcc, InputEvent } from '@/src/types';
import { OrderTypeEnum, SortEnum } from '@/src/enums';

type Props = {
  label: OrderTypeEnum;
  aggregatedData: AggregatedOrderListAcc[];
  isExpanded: boolean;
  isCustom?: boolean;
  itemLimit: number;
};

const lsCustomListSortKey = 'customOrders';
const lsOrderListSortKey = 'sortOrders';
const lsBuyTargetListSortKey = 'sortBuyTargets';

const initCustom = () => {
  const savedCustomListSort = localStorage.getItem(lsCustomListSortKey);
  return savedCustomListSort
    ? (JSON.parse(savedCustomListSort) as SortEnum)
    : SortEnum.Percent;
};

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
  const { label, aggregatedData, isExpanded, isCustom, itemLimit } = props;

  const [customListSort, setCustomListSort] = useState(initCustom);
  const [orderListSort, setOrderListSort] = useState(initOrder);
  const [buyTargetListSort, setBuyTargetListSort] = useState(initTarget);
  const [filterSymbol, setFilterSymbol] = useState('');

  const isBull = label === OrderTypeEnum.Buy;
  const sortField =
    isBull && isCustom
      ? customListSort
      : isBull && !isCustom
      ? orderListSort
      : buyTargetListSort;
  const isSortByPercent = sortField === SortEnum.Percent;
  const isSortBySymbol = sortField === SortEnum.Symbol;
  const isSortByDate = sortField === SortEnum.Date;

  useEffect(() => {
    localStorage.setItem(lsCustomListSortKey, JSON.stringify(customListSort));
  }, [customListSort]);

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
      if (isCustom) {
        setCustomListSort(newSortField);
      } else {
        setOrderListSort(newSortField);
      }
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
    .slice(0, isExpanded || isCustom ? filteredData.length : itemLimit);

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
