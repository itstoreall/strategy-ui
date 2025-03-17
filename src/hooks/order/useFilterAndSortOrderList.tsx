import { useEffect, useState } from 'react';
import { AggregatedOrderListAcc, InputEvent } from '@/src/types';
import { SortEnum } from '@/src/enums';

type Props = {
  aggregatedData: AggregatedOrderListAcc[];
  isExpanded: boolean;
  itemLimit: number;
};

const lsSortKey = 'orderListSort';

const useFilterAndSortOrderList = (props: Props) => {
  const { aggregatedData, isExpanded, itemLimit } = props;

  const [sortField, setSortField] = useState<SortEnum>(() => {
    const savedSortField = localStorage.getItem(lsSortKey);
    return savedSortField ? (savedSortField as SortEnum) : SortEnum.Percent;
  });

  const [filterSymbol, setFilterSymbol] = useState('');

  useEffect(() => {
    localStorage.setItem(lsSortKey, sortField);
  }, [sortField]);

  const handleSortToggle = () => {
    const newSortField =
      sortField === SortEnum.Percent
        ? SortEnum.Date
        : sortField === SortEnum.Date
        ? SortEnum.Symbol
        : SortEnum.Percent;

    setSortField(newSortField);
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
      if (sortField === SortEnum.Symbol) {
        return a.symbol.localeCompare(b.symbol);
      } else if (sortField === SortEnum.Date) {
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
