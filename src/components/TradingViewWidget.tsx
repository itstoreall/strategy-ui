import React, { useEffect, useRef, memo } from 'react';
import { ChartSymbolEnum, ChartIntervalEnum } from '@/src/enums';

type Props = {
  chartSymbol:
    | ChartSymbolEnum.TetherDominance
    | ChartSymbolEnum.BitcoinDominance
    | ChartSymbolEnum.Total1
    | ChartSymbolEnum.Total2
    | ChartSymbolEnum.Total3;
  chartInterval: ChartIntervalEnum.Hour | ChartIntervalEnum.Day;
};

const chartUrl =
  'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';

function TradingViewWidget({ chartSymbol, chartInterval }: Props) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      container.current.innerHTML = '';

      const script = document.createElement('script');

      script.src = chartUrl;
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
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
