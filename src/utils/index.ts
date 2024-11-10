type TrimAddress = (address: string, start: number, end: number) => string;

export const copyToClipboard = async (value: string = '') => {
  await navigator.clipboard.writeText(value);
};

export const trimString: TrimAddress = (str, start, end) => {
  if (!str || start < 0 || end < 0) return str;
  return Math.min(start + end, str.length) < str.length
    ? `${str.slice(0, start)}...${str.slice(-end)}`
    : str;
};
