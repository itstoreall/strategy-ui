import { useState } from 'react';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { ChartSymbolEnum, ChartIntervalEnum } from '@/src/enums';
import TradingViewWidget from '@/src/components/TradingViewWidget';
import SelectMulti from '@/src/components/Form/SelectMulti';

const symbolOptions: ChartSymbolEnum[] = [
  ChartSymbolEnum.BitcoinDominance,
  ChartSymbolEnum.TetherDominance,
  ChartSymbolEnum.Total1,
  ChartSymbolEnum.Total2,
  ChartSymbolEnum.Total3,
];

const intervalOptions = [
  { label: 'Hour', value: ChartIntervalEnum.Hour },
  { label: 'Day', value: ChartIntervalEnum.Day },
];

const ChartSection = () => {
  const [chartSymbol, setChartSymbol] = useState(symbolOptions[0]);
  const [chartInterval, setChartInterval] = useState(intervalOptions[1].value);

  const { openDropdownId, toggleDropdown } = useSelectMulti();

  return (
    <section className="section chart">
      <div className="chart-section-content">
        <div className="chart-section-select-wrapper">
          <SelectMulti
            options={symbolOptions.filter((opt) => opt !== chartSymbol)}
            initialOption={chartSymbol}
            placeholder="Symbol"
            onSelect={(value: string) => {
              setChartSymbol(value as ChartSymbolEnum);
            }}
            isOpen={openDropdownId === chartSymbol}
            onToggle={() => toggleDropdown(chartSymbol)}
          />

          <SelectMulti
            options={intervalOptions
              .filter((opt) => opt.value !== chartInterval)
              .map((opt) => opt.label)}
            initialOption={
              intervalOptions.find((opt) => opt.value === chartInterval)?.label
            }
            placeholder="Interval"
            onSelect={(label) => {
              const selectedOption = intervalOptions.find(
                (opt) => opt.label === label
              );
              if (selectedOption) setChartInterval(selectedOption.value);
            }}
            isOpen={openDropdownId === chartInterval}
            onToggle={() => toggleDropdown(chartInterval)}
          />
        </div>

        <TradingViewWidget
          chartSymbol={chartSymbol}
          chartInterval={chartInterval}
        />
      </div>
    </section>
  );
};

export default ChartSection;
