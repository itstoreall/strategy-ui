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

const c = {
  others: 'OTHERS',
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
const gold = { label: c.gold, value: Symbol.Gold };
const spx500 = { label: c.spx500, value: Symbol.SPX500 };
const nasdaq = { label: c.nasdaq, value: Symbol.Nasdaq };
const m2 = { label: c.m2, value: Symbol.M2LiquidityFRED };
const dxy = { label: c.dxy, value: Symbol.DXY };
const btcEth = { label: Symbol.BitcoinEther, value: Symbol.BitcoinEther };
const ethBtc = { label: Symbol.EtherBitcoin, value: Symbol.EtherBitcoin };
const others = { label: c.others, value: Symbol.OthersBitcoin };
const total = { label: Symbol.Total, value: Symbol.Total };
const total2 = { label: Symbol.Total2, value: Symbol.Total2 };
const total3 = { label: Symbol.Total3, value: Symbol.Total3 };
const yena = { label: c.yena, value: Symbol.Yena };
const yuan = { label: c.yuan, value: Symbol.Yuan };
const wti = { label: c.wti, value: Symbol.OilWTI };
const brent = { label: c.brent, value: Symbol.OilBrent };

// Intervals:
const hour = { label: c.hour, value: ChartIntervalEnum.Hour };
const day = { label: c.day, value: ChartIntervalEnum.Day };
const week = { label: c.week, value: ChartIntervalEnum.Week };
const month = { label: c.month, value: ChartIntervalEnum.Month };

const symbols = [
  btcD,
  dxy,
  total3,
  others,
  spx500,
  gold,
  m2,
  brent,
  btcEth,
  ethBtc,
  usdtD,
  total,
  total2,
  yena,
  yuan,
  wti,
  nasdaq,
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
            placeholder={c.symbolPlaceholder}
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
            placeholder={c.symbolInterval}
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
