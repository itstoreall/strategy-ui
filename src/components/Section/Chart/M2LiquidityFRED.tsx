import React, { useEffect, useRef, memo } from 'react';

const chartUrl =
  'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';

function M2LiquidityFRED() {
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

      container.current.appendChild(script);
    }
  }, []);

  return <div className="tradingview-widget-container" ref={container} />;
}

export default memo(M2LiquidityFRED);
