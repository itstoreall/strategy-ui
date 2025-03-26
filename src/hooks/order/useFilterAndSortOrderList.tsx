import { useEffect, useState } from 'react';
import { AggregatedOrderListAcc, InputEvent } from '@/src/types';
import { OrderTypeEnum, SortEnum } from '@/src/enums';

type Props = {
  label: OrderTypeEnum;
  aggregatedData: AggregatedOrderListAcc[];
  isExpanded: boolean;
  itemLimit: number;
};

const lsSortKey = 'listSortConfig';

const useFilterAndSortOrderList = (props: Props) => {
  const { label, aggregatedData, isExpanded, itemLimit } = props;

  const isBull = label === OrderTypeEnum.Buy;

  console.log('label:', label, isBull);

  // Initialize state with localStorage or default values
  const [sortConfig, setSortConfig] = useState<Record<string, SortEnum>>(() => {
    const savedConfig = localStorage.getItem(lsSortKey);
    return savedConfig
      ? JSON.parse(savedConfig)
      : {
          orderListSort: SortEnum.Percent,
          buyTargetListSort: SortEnum.Percent,
        };
  });

  const [filterSymbol, setFilterSymbol] = useState('');

  useEffect(() => {
    localStorage.setItem(lsSortKey, JSON.stringify(sortConfig));
  }, [sortConfig]);

  const sortField = isBull
    ? sortConfig.orderListSort
    : sortConfig.buyTargetListSort;

  const handleSortToggle = () => {
    const newSortField =
      sortField === SortEnum.Percent
        ? SortEnum.Date
        : sortField === SortEnum.Date
        ? SortEnum.Symbol
        : SortEnum.Percent;

    // const newValue = isBull
    //   ? { orderListSort: newSortField }
    //   : { buyTargetListSort: newSortField };

    // setSortConfig((prev) => ({ ...prev, ...newValue }));

    setSortConfig((prev) => ({
      ...prev,
      ...(isBull
        ? { orderListSort: newSortField }
        : { buyTargetListSort: newSortField }),
    }));
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

/*
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

  const [filterSymbol, setFilterSymbol] = useState('');
  const [sortField, setSortField] = useState<SortEnum>(() => {
    const savedSortField = localStorage.getItem(lsSortKey);
    return savedSortField ? (savedSortField as SortEnum) : SortEnum.Percent;
  });

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
*/
