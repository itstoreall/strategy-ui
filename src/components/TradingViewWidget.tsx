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
    | ChartSymbolEnum.SPX500;
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

  // const isM2 = chartSymbol === ChartSymbolEnum.M2LiquidityFRED;

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      container.current.innerHTML = '';

      const script = document.createElement('script');

      const configCrypto = `
        {
          "width": "100%",
          "symbol": "CRYPTOCAP:${chartSymbol}",
          "interval": "${chartInterval}",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "calendar": false,
          "hide_top_toolbar": true,
          "support_host": "https://www.tradingview.com"
        }`;

      const configM2 = `
        {
          "width": "100%",
          "symbol": "FRED:M2SL",
          "interval": "1M",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "calendar": false,
          "hide_top_toolbar": true,
          "support_host": "https://www.tradingview.com"
        }`;

      const configSPX500 = `
        {
          "width": "100%",
          "symbol": "OANDA:SPX500USD",
          "interval": "${chartInterval}",
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
      script.innerHTML =
        chartSymbol === ChartSymbolEnum.M2LiquidityFRED
          ? configM2
          : chartSymbol === ChartSymbolEnum.SPX500
          ? configSPX500
          : configCrypto;

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
