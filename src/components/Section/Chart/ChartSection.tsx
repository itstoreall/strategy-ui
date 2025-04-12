/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { ChartSymbolEnum as Symbol, ChartIntervalEnum } from '@/src/enums';
import TradingViewWidget from '@/src/components/Section/Chart/TradingViewWidget';
import SelectMulti from '@/src/components/Form/SelectMulti';

type Interval = {
  label: string;
  value: ChartIntervalEnum;
};

const config = {
  gold: 'GOLD',
  spx500: 'S&P500',
  nasdaq: 'Nasdaq',
  m2: 'M2',
  dxy: 'DXY',
  yena: 'Yena',
  yuan: 'Yuan',
  wti: 'Oil WTI',
  brent: 'Oil Brent',
  hour: 'Hour',
  day: 'Day',
  week: 'Week',
  month: 'Month',
  symbolPlaceholder: 'Symbol',
  symbolInterval: 'Interval',
};

// Symbols:
const btcD = { label: Symbol.BitcoinDominance, value: Symbol.BitcoinDominance };
const usdtD = { label: Symbol.TetherDominance, value: Symbol.TetherDominance };
const gold = { label: config.gold, value: Symbol.Gold };
const spx500 = { label: config.spx500, value: Symbol.SPX500 };
const nasdaq = { label: config.nasdaq, value: Symbol.Nasdaq };
const m2 = { label: config.m2, value: Symbol.M2LiquidityFRED };
const dxy = { label: config.dxy, value: Symbol.DXY };
const btcEth = { label: Symbol.BitcoinEther, value: Symbol.BitcoinEther };
const ethBtc = { label: Symbol.EtherBitcoin, value: Symbol.EtherBitcoin };
const others = { label: Symbol.OthersBitcoin, value: Symbol.OthersBitcoin };
const total = { label: Symbol.Total, value: Symbol.Total };
const total2 = { label: Symbol.Total2, value: Symbol.Total2 };
const total3 = { label: Symbol.Total3, value: Symbol.Total3 };
const yena = { label: config.yena, value: Symbol.Yena };
const yuan = { label: config.yuan, value: Symbol.Yuan };
const wti = { label: config.wti, value: Symbol.OilWTI };
const brent = { label: config.brent, value: Symbol.OilBrent };

// Intervals:
const hour = { label: config.hour, value: ChartIntervalEnum.Hour };
const day = { label: config.day, value: ChartIntervalEnum.Day };
const week = { label: config.week, value: ChartIntervalEnum.Week };
const month = { label: config.month, value: ChartIntervalEnum.Month };

const symbols = [
  btcD,
  usdtD,
  gold,
  spx500,
  nasdaq,
  m2,
  dxy,
  btcEth,
  ethBtc,
  others,
  total,
  total2,
  total3,
  yena,
  yuan,
  wti,
  brent,
];

const initIntervals: Interval[] = [hour, day, week, month];

const ChartSection = () => {
  const [symbol, setSymbol] = useState(btcD.value);
  const [intervals, setIntervals] = useState<Interval[]>(initIntervals);
  const [interval, setInterval] = useState(day.value);

  const { openDropdownId, toggleDropdown } = useSelectMulti();

  const isM2 = symbol === m2.value;
  const isDXY = symbol === dxy.value;

  useEffect(() => {
    switch (true) {
      case isM2:
        setInterval(month.value);
        setIntervals([month]);
        break;

      case isDXY:
        setIntervals([day, week, month]);
        break;

      default:
        setIntervals(initIntervals);
        break;
    }
  }, [symbol]);

  // ---

  const handleInterval = (label: ChartIntervalEnum) => {
    const selectedOption = intervals.find((opt) => opt.label === label);
    if (selectedOption) setInterval(selectedOption.value);
  };

  return (
    <section className="section chart">
      <div className="chart-section-content">
        <div className="chart-section-select-wrapper">
          <SelectMulti
            options={symbols
              .filter((opt) => opt.value !== symbol)
              .map((opt) => opt.label)}
            initialOption={symbols.find((opt) => opt.value === symbol)?.label}
            placeholder={config.symbolPlaceholder}
            onSelect={(label) => {
              const selectedOption = symbols.find((opt) => opt.label === label);
              if (selectedOption) setSymbol(selectedOption.value);
            }}
            isOpen={openDropdownId === symbol}
            onToggle={() => toggleDropdown(symbol)}
          />

          <SelectMulti
            options={intervals
              .filter((opt: Interval) => opt.value !== interval)
              .map((opt: Interval) => opt.label)}
            initialOption={
              intervals.find((opt: Interval) => opt.value === interval)?.label
            }
            placeholder={config.symbolInterval}
            onSelect={(label) => handleInterval(label as ChartIntervalEnum)}
            isOpen={openDropdownId === interval}
            onToggle={() => toggleDropdown(interval)}
            isDisable={isM2}
          />
        </div>

        <TradingViewWidget chartSymbol={symbol} chartInterval={interval} />
      </div>
    </section>
  );
};

export default ChartSection;

/*
import { useEffect, useState } from 'react';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { ChartSymbolEnum as Symbol, ChartIntervalEnum } from '@/src/enums';
import TradingViewWidget from '@/src/components/Section/Chart/TradingViewWidget';
import SelectMulti from '@/src/components/Form/SelectMulti';

const symbolOptions = [
  { label: Symbol.BitcoinDominance, value: Symbol.BitcoinDominance },
  { label: Symbol.TetherDominance, value: Symbol.TetherDominance },
  { label: 'GOLD', value: Symbol.Gold },
  { label: 'S&P500', value: Symbol.SPX500 },
  { label: 'Nasdaq', value: Symbol.Nasdaq },
  { label: 'M2', value: Symbol.M2LiquidityFRED },
  { label: Symbol.BitcoinEther, value: Symbol.BitcoinEther },
  { label: Symbol.EtherBitcoin, value: Symbol.EtherBitcoin },
  { label: Symbol.OthersBitcoin, value: Symbol.OthersBitcoin },
  { label: Symbol.Total, value: Symbol.Total },
  { label: Symbol.Total2, value: Symbol.Total2 },
  { label: Symbol.Total3, value: Symbol.Total3 },
  { label: 'Yena', value: Symbol.Yena },
  { label: 'Yuan', value: Symbol.Yuan },
  { label: 'Oil WTI', value: Symbol.OilWTI },
  { label: 'Oil Brent', value: Symbol.OilBrent },
  { label: 'DXY', value: Symbol.DXY },
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
*/
