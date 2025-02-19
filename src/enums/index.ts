export enum QueryKey {
  UserOrders = 'userOrders',
  UserStrategyOrders = 'userStrategyOrders',
}

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
  EtherBitcoin = 'ETH/BTC',
  BitcoinEther = 'BTC/ETH',
  Total = 'TOTAL',
  Total2 = 'TOTAL2',
  Total3 = 'TOTAL3',
  OthersBitcoin = 'OTHERS/BTC',
}

export enum ChartIntervalEnum {
  Hour = '60',
  Day = 'D',
  Week = 'W',
  Month = 'M',
}

// ------ Modal:

export enum ModalContentEnum {
  Form = 'FORM',
}
