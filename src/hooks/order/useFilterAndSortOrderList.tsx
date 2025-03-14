import { useState } from 'react';
import { AggregatedOrderListAcc, InputEvent } from '@/src/types';
import { SortEnum } from '@/src/enums';

type Props = {
  aggregatedData: AggregatedOrderListAcc[];
  isExpanded: boolean;
  itemLimit: number;
};

const useFilterAndSortOrderList = (props: Props) => {
  const { aggregatedData, isExpanded, itemLimit } = props;

  const [sortField, setSortField] = useState<SortEnum>(SortEnum.Percent);
  const [filterSymbol, setFilterSymbol] = useState('');

  const handleSortToggle = () => {
    if (sortField === SortEnum.Percent) {
      setSortField(SortEnum.Symbol);
    } else {
      setSortField(SortEnum.Percent);
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
      if (sortField === SortEnum.Symbol) {
        return a.symbol.localeCompare(b.symbol);
      }
      return b.percent - a.percent;
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
