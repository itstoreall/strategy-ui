import { useEffect, useState } from 'react';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { ChartSymbolEnum as Symbol, ChartIntervalEnum } from '@/src/enums';
import TradingViewWidget from '@/src/components/TradingViewWidget';
import SelectMulti from '@/src/components/Form/SelectMulti';

const symbolOptions = [
  { label: Symbol.BitcoinDominance, value: Symbol.BitcoinDominance },
  { label: Symbol.TetherDominance, value: Symbol.TetherDominance },
  { label: Symbol.BitcoinEther, value: Symbol.BitcoinEther },
  { label: Symbol.EtherBitcoin, value: Symbol.EtherBitcoin },
  { label: Symbol.OthersBitcoin, value: Symbol.OthersBitcoin },
  { label: Symbol.Total, value: Symbol.Total },
  { label: Symbol.Total2, value: Symbol.Total2 },
  { label: Symbol.Total3, value: Symbol.Total3 },
  { label: Symbol.M2LiquidityFRED, value: Symbol.M2LiquidityFRED },
  { label: Symbol.SPX500, value: Symbol.SPX500 },
];

const intervalOptions = [
  { label: 'Hour', value: ChartIntervalEnum.Hour },
  { label: 'Day', value: ChartIntervalEnum.Day },
  { label: 'Week', value: ChartIntervalEnum.Week },
  { label: 'Month', value: ChartIntervalEnum.Month },
];

const ChartSection = () => {
  const [chartSymbol, setChartSymbol] = useState(symbolOptions[0].value);
  const [chartInterval, setChartInterval] = useState(intervalOptions[1].value);

  const { openDropdownId, toggleDropdown } = useSelectMulti();

  const isM2 = chartSymbol === Symbol.M2LiquidityFRED;

  useEffect(() => {
    if (isM2) {
      setChartInterval(ChartIntervalEnum.Month);
    }
  }, [isM2]);

  // ---

  const handleInterval = (label: ChartIntervalEnum) => {
    const selectedOption = intervalOptions.find((opt) => opt.label === label);
    if (selectedOption) setChartInterval(selectedOption.value);
  };

  return (
    <section className="section chart">
      <div className="chart-section-content">
        <div className="chart-section-select-wrapper">
          <SelectMulti
            options={symbolOptions
              .filter((opt) => opt.value !== chartSymbol)
              .map((opt) => opt.label)}
            initialOption={
              symbolOptions.find((opt) => opt.value === chartSymbol)?.label
            }
            placeholder="Symbol"
            onSelect={(label) => {
              const selectedOption = symbolOptions.find(
                (opt) => opt.label === label
              );
              if (selectedOption) setChartSymbol(selectedOption.value);
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
            onSelect={(label) => handleInterval(label as ChartIntervalEnum)}
            isOpen={openDropdownId === chartInterval}
            onToggle={() => toggleDropdown(chartInterval)}
            isDisable={isM2}
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
