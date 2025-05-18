// ------ User:

export enum AuthRoleEnum {
  User = 'USER',
  Admin = 'ADMIN',
}

// ------ :

export enum QueryKeyEnum {
  Users = 'users',
  Tokens = 'tokens',
  Orders = 'orders',
  UserOrders = 'userOrders',
  UserStrategyOrders = 'userStrategyOrders',
}

export enum MutationKeyEnum {
  AddToken = 'addToken',
  DeleteToken = 'deleteToken',
  AddOrder = 'addOrder',
  UpdatePrices = 'updatePrices',
  UpdateStrategy = 'updateStrategy',
}

// ------ Token:

export enum TokenStatusEnum {
  All = 'ALL',
  Init = 'INIT',
  Active = 'ACTIVE',
  Pending = 'PENDING',
}

// ------ Order:

export enum OrderTypeDisplayEnum {
  Asset = 'Asset',
  BuyTarget = 'Buy Target',
}

export enum OrderTypeEnum {
  Buy = 'BUY',
  Sell = 'SELL',
}

export enum OrderStatusEnum {
  Active = 'ACTIVE',
  Close = 'CLOSE',
}

export enum ExchangeEnum {
  All = 'ALL', //EXCHANGES
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
  OthersBitcoin = 'OTHERS/BTC',
  Total = 'TOTAL',
  Total2 = 'TOTAL2',
  Total3 = 'TOTAL3',
  M2LiquidityFRED = 'FRED:M2SL',
  SPX500 = 'OANDA:SPX500USD',
  Gold = 'XAUUSD',
  Yena = 'FX:USDJPY',
  Yuan = 'FX:USDCNH',
  OilWTI = 'TVC:USOIL',
  OilBrent = 'TVC:UKOIL',
  Nasdaq = 'NASDAQ:NDX',
  DXY = 'INDEX:DXY',
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
  Strategy = 'STRATEGY',
}

// ------ :

export enum SortEnum {
  Percent = 'PERCENT',
  Symbol = 'SYMBOL',
  Date = 'DATE',
}
