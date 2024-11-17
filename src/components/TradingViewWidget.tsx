import React, { useEffect, useRef, memo } from 'react';

const chartUrl =
  'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement('script');

      script.src = chartUrl;
      script.type = 'text/javascript';
      script.async = true;

      const minHeight = 390; // px
      const viewportHeight = Math.max(window.innerHeight, minHeight);

      script.innerHTML = `
        {
          "width": "100%",
          "height": "${viewportHeight - 48}",
          "symbol": "CRYPTOCAP:USDT.D",
          "interval": "60",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

      container.current.appendChild(script);
    }
  }, []);

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
*/
