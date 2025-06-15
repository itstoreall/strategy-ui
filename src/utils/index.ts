import { Order, TradeStrategy } from '@/src/types';

type TrimAddress = (address: string, start: number, end: number) => string;

type Format =
  | 'DD-MM-YY'
  | 'MM-YY'
  | 'YY'
  | 'MM'
  | 'DD;'
  | 'DD-MM-YY HH:mm'
  | 'DD-MM-YY HH:mm:ss';

export const c = {
  tradeStrategyKey: 'tradeStrategy',
};

export const normalizeISODate = (date: number | Date, format?: Format) => {
  if (!date) return date;
  const newDate = new Date(date);
  const isoString = newDate.toISOString();
  const splitDate = isoString.split('T')[0];
  const [year, month, day] = splitDate.split('-');
  const time = isoString.split('T')[1].split('.')[0];
  const timeParts = time.split(':');

  return format === 'DD-MM-YY'
    ? `${day}-${month}-${year}`
    : format === 'MM-YY'
    ? `${month}-${year}`
    : format === 'DD-MM-YY HH:mm'
    ? `${day}-${month}-${year} (${timeParts[0]}:${timeParts[1]})`
    : format === 'DD-MM-YY HH:mm:ss'
    ? `${day}-${month}-${year} (${time})`
    : newDate.toISOString();
};

export const normalizeKyivDate = (date: number | Date, format?: Format) => {
  if (!date) return date;

  const kyivFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const [fullDate, time] = kyivFormatter.formatToParts(new Date(date)).reduce(
    (acc, part) => {
      if (part.type === 'literal') return acc;
      if (
        part.type === 'year' ||
        part.type === 'month' ||
        part.type === 'day'
      ) {
        acc[0].push(part.value);
      } else if (
        part.type === 'hour' ||
        part.type === 'minute' ||
        part.type === 'second'
      ) {
        acc[1].push(part.value);
      }
      return acc;
    },
    [[], []] as [string[], string[]]
  );

  const [day, month, year] = fullDate;
  const [hour, minute, second] = time;

  switch (format) {
    case 'DD-MM-YY':
      return `${day}-${month}-${year}`;
    case 'MM-YY':
      return `${month}-${year}`;
    case 'YY':
      return year;
    case 'MM':
      return month;
    case 'DD;':
      return day;
    case 'DD-MM-YY HH:mm:ss':
      return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    default:
      return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }
};

export const formatBillionAmount = (amount: string): string => {
  if (Number(amount) < 1_000_000_000) return amount;
  // return `${(Number(amount) / 1_000_000).toFixed(3)}M`;
  return `${(Number(amount) / 1_000_000_000).toFixed(3)}B`;
};

export const formatMillionAmount = (amount: string): string => {
  if (Number(amount) < 1_000_000) return amount;
  return `${(Number(amount) / 1_000_000).toFixed(3)}M`;
};

export const formatOneHundredThousandAmount = (amount: string): string => {
  if (Number(amount) < 1_00_000) return amount;
  return `${(Number(amount) / 1_000).toFixed()}K`;
};

export const uniNumberFormatter = (_value: number): string => {
  const value = typeof _value === 'string' ? +_value : _value;
  if (Number.isNaN(value)) return 'ERROR';
  if (value >= 1 || value <= -1) {
    // --- Handle non-small numbers normally:
    const _value = value.toString().split('.')[0];
    if (_value.length >= 10) {
      // return `${(value / 1_000_000_000).toFixed(3)}B`;
      return formatBillionAmount(value.toFixed());
    } else if (_value.length >= 7) {
      return formatMillionAmount(value.toFixed());
    } else if (_value.length >= 4) {
      return formatOneHundredThousandAmount(value.toFixed());
    } else return value.toFixed(2);
  }
  const strValue = value.toString();
  const match = strValue.match(/^0\.(0+)(\d+)$/);
  if (match) {
    const leadingZeros = match[1].length;
    if (leadingZeros <= 2) {
      const fixValue = leadingZeros === 1 ? 3 : 4;
      return Number(strValue).toFixed(fixValue);
    }
    const significantDigits = match[2];
    return `0.0{${leadingZeros}}${significantDigits.slice(0, 2)}`;
  }
  return value.toFixed(2);
};

export const numberCutter = (val: string | number, cut: number = 2) => {
  const str = typeof val === 'string' ? val : val.toString();
  const parts = str.split('.');
  if (parts.length === 2) {
    const match = str.match(/\.(0+)(\d+)$/);
    if (match?.length === 3) {
      const number = `${parts[0]}.${match[1]}${match[2].slice(0, cut)}`;
      const leadingZeros = match[1].length;
      if (leadingZeros <= 2) {
        return number;
      } else {
        const significantDigits = match[2].slice(0, cut);
        return `${parts[0]}.0{${leadingZeros}}${significantDigits}`;
      }
    } else {
      const parts = str.split('.');
      const convertedNumber =
        parts[1].length === 1
          ? `${parts[1]}0`
          : parts[1].length === 2
          ? `${parts[1]}`
          : `${parts[1].slice(0, cut)}`;
      const value = `${parts[0]}.${convertedNumber}`;
      return value;
    }
  } else {
    return `${str}.00`;
  }
};

// ---

export const handlePriceDisplay = (symbol: string, price: number | string) => {
  const isFixedZero = symbol === 'BTC' || symbol === 'ETH';
  const numericPrice = typeof price === 'number' ? price : Number(price);
  const tokenPriceValue = price
    ? isFixedZero
      ? numericPrice.toFixed()
      : numberCutter(numericPrice, 3)
    : numericPrice;
  return tokenPriceValue;
};

export const copyToClipboard = async (value: string = '') => {
  await navigator.clipboard.writeText(value);
};

export const trimString: TrimAddress = (str, start, end) => {
  if (!str || start < 0 || end < 0) return str;
  return Math.min(start + end, str.length) < str.length
    ? `${str.slice(0, start)}...${str.slice(-end)}`
    : str;
};

export const calculateAVGPrice = (orders: Order[]) => {
  if (!orders?.length) return 0;
  const totalPrice = orders.reduce((acc, order) => {
    return acc + order.price * order.amount;
  }, 0);
  const totalAmount = orders.reduce((acc, order) => {
    return acc + order.amount;
  }, 0);
  return totalAmount ? totalPrice / totalAmount : 0;
};

// --- %

type Percent = 1 | 0.1 | 0.04 | 0.07 | 0.08;

export const plusPercent = (val: number, percent: Percent = 1) => {
  return val * (1 + percent);
};

export const minusPercent = (val: number, percent: Percent = 1) => {
  return val * (1 - percent);
};

// --- TradeStrategyData (localStorage)

export const getLSTradeStrategyData = () => {
  const storedTradeStrategyData = localStorage.getItem(c.tradeStrategyKey);
  if (storedTradeStrategyData) {
    return JSON.parse(storedTradeStrategyData) as TradeStrategy[];
  } else return null;
};

export const updateLSTradeStrategyData = (data: TradeStrategy[]) => {
  localStorage.setItem(c.tradeStrategyKey, JSON.stringify(data));
};

export const deleteLSTradeStrategyData = () => {
  localStorage.removeItem(c.tradeStrategyKey);
};
