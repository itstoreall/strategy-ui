// ------ Token:

export enum TokenStatusEnum {
  All = 'ALL',
  Init = 'INIT',
  Active = 'ACTIVE',
  Pending = 'PENDING',
}

// ------ Order:

export enum OrderTypeEnum {
  Buy = 'BUY',
  Sell = 'SELL',
}

export enum OrderStatusEnum {
  Active = 'ACTIVE',
  Close = 'CLOSE',
}

export enum ExchangeEnum {
  Binance = 'BINANCE',
  Bybit = 'BYBIT',
  Mexc = 'MEXC',
  Bitget = 'BITGET',
  Bingx = 'BINGX',
  Okx = 'OKX',
}

// ------ Chart:

export enum ChartSymbolEnum {
  BitcoinDominance = 'BTC.D',
  TetherDominance = 'USDT.D',
  Total1 = 'TOTAL1',
  Total2 = 'TOTAL2',
  Total3 = 'TOTAL3',
}

export enum ChartIntervalEnum {
  Hour = '60',
  Day = '1440',
}
