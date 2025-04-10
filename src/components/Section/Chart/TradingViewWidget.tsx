import React, { useEffect, useRef, memo } from 'react';
import { ChartSymbolEnum, ChartIntervalEnum } from '@/src/enums';

type Props = {
  chartSymbol:
    | ChartSymbolEnum.TetherDominance
    | ChartSymbolEnum.BitcoinDominance
    | ChartSymbolEnum.BitcoinEther
    | ChartSymbolEnum.EtherBitcoin
    | ChartSymbolEnum.OthersBitcoin
    | ChartSymbolEnum.Total
    | ChartSymbolEnum.Total2
    | ChartSymbolEnum.Total3
    | ChartSymbolEnum.M2LiquidityFRED
    | ChartSymbolEnum.SPX500
    | ChartSymbolEnum.Gold
    | ChartSymbolEnum.Yena
    | ChartSymbolEnum.Yuan
    | ChartSymbolEnum.OilWTI
    | ChartSymbolEnum.OilBrent
    | ChartSymbolEnum.Nasdaq
    | ChartSymbolEnum.DXY;
  chartInterval:
    | ChartIntervalEnum.Hour
    | ChartIntervalEnum.Day
    | ChartIntervalEnum.Week
    | ChartIntervalEnum.Month;
};

const chartUrl =
  'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';

function TradingViewWidget({ chartSymbol, chartInterval }: Props) {
  const container = useRef<HTMLDivElement | null>(null);

  const getTradingViewSymbol = (symbol: ChartSymbolEnum) => {
    switch (symbol) {
      case ChartSymbolEnum.BitcoinDominance:
      case ChartSymbolEnum.TetherDominance:
      case ChartSymbolEnum.BitcoinEther:
      case ChartSymbolEnum.EtherBitcoin:
      case ChartSymbolEnum.OthersBitcoin:
      case ChartSymbolEnum.Total:
      case ChartSymbolEnum.Total2:
      case ChartSymbolEnum.Total3:
        return `CRYPTOCAP:${symbol}`;

      // M2
      case ChartSymbolEnum.M2LiquidityFRED:
        return ChartSymbolEnum.M2LiquidityFRED;

      // S&P500
      case ChartSymbolEnum.SPX500:
        return ChartSymbolEnum.SPX500;

      // Gold
      case ChartSymbolEnum.Gold:
        return ChartSymbolEnum.Gold;

      // Yena
      case ChartSymbolEnum.Yena:
        return ChartSymbolEnum.Yena;

      // Yuan
      case ChartSymbolEnum.Yuan:
        return ChartSymbolEnum.Yuan;

      // Oil (WTI - West Texas Intermediate)
      case ChartSymbolEnum.OilWTI:
        return ChartSymbolEnum.OilWTI;

      // Oil (Brent)
      case ChartSymbolEnum.OilBrent:
        return ChartSymbolEnum.OilBrent;

      // Nasdaq (National Association of Securities Dealers Automated Quotations - mode 3300 companies)
      case ChartSymbolEnum.Nasdaq:
        return ChartSymbolEnum.Nasdaq;

      // DXY ($) - U.S. Dollar Index
      case ChartSymbolEnum.DXY:
        return ChartSymbolEnum.DXY;
    }
  };

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      container.current.innerHTML = '';

      const isM2 = chartSymbol === ChartSymbolEnum.M2LiquidityFRED;
      const script = document.createElement('script');
      const tradingViewSymbol = getTradingViewSymbol(chartSymbol);
      const tradingViewInterval = isM2 ? '1M' : chartInterval;

      const config = `
        {
          "width": "100%",
          "symbol": "${tradingViewSymbol}",
          "interval": "${tradingViewInterval}",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "calendar": false,
          "hide_top_toolbar": true,
          "support_host": "https://www.tradingview.com"
        }`;

      script.src = chartUrl;
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = config;

      container.current.appendChild(script);
    }
  }, [chartSymbol, chartInterval]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      // style={{ minHeight: '400px', width: '100%' }}
    />
  );
}

export default memo(TradingViewWidget);

/*
"symbol": "COINBASE:BTCUSD",

https://www.tradingview.com/widget/advanced-chart/

========

const minHeight = 390; // px
const viewportHeight = Math.max(window.innerHeight, minHeight);

script.innerHTML = `
  {
    "width": "100%",
    "height": "${viewportHeight - 117}",
    "symbol": "CRYPTOCAP:${chartSymbol}",
    "interval": "${chartInterval}",
    "timezone": "Etc/UTC",
    "theme": "dark",
    "style": "1",
    "locale": "en",
    "allow_symbol_change": true,
    "hide_top_toolbar": true,
    "calendar": false,
    "support_host": "https://www.tradingview.com"
  }`;
*/
