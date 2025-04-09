type TrimAddress = (address: string, start: number, end: number) => string;

type Format = 'DD-MM-YY' | 'MM-YY' | 'YY' | 'MM' | 'DD;' | 'DD-MM-YY HH:mm:ss';

export const normalizeISODate = (date: Date, format?: Format) => {
  if (!date) return date;
  const newDate = new Date(date);
  const isoString = newDate.toISOString();
  const splitDate = isoString.split('T')[0];
  const [year, month, day] = splitDate.split('-');
  const time = isoString.split('T')[1].split('.')[0];

  return format === 'DD-MM-YY'
    ? `${day}-${month}-${year}`
    : format === 'MM-YY'
    ? `${month}-${year}`
    : format === 'DD-MM-YY HH:mm:ss'
    ? `${day}-${month}-${year} ${time}`
    : newDate.toISOString();
};

export const normalizeKyivDate = (date: Date, format?: Format) => {
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

export const copyToClipboard = async (value: string = '') => {
  await navigator.clipboard.writeText(value);
};

export const trimString: TrimAddress = (str, start, end) => {
  if (!str || start < 0 || end < 0) return str;
  return Math.min(start + end, str.length) < str.length
    ? `${str.slice(0, start)}...${str.slice(-end)}`
    : str;
};

export const formatMillionAmount = (amount: string): string => {
  if (Number(amount) < 1_000_000) return amount;
  return `${(Number(amount) / 1_000_000).toFixed(3)}M`;
};

export const uniNumberFormatter = (value: number): string => {
  if (value >= 1 || value <= -1) {
    // --- Handle non-small numbers normally:
    const _value = value.toString().split('.')[0];
    if (_value.length >= 7) {
      return formatMillionAmount(value.toFixed(2));
    } else return value.toFixed(2);
  }
  const strValue = value.toString();
  const match = strValue.match(/^0\.(0+)(\d+)$/);
  if (match) {
    const leadingZeros = match[1].length;
    const significantDigits = match[2];
    return `0.0{${leadingZeros}}${significantDigits}`;
  }
  return value.toString();
};
