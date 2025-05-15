import { useEffect, useState } from 'react';
import { Token } from '@/src/types';
import { uniNumberFormatter } from '@/src/utils';
import DefaultInput from '@/src/components/Form/DefaultInput';

type Props = {
  tokens: Token[] | null;
};

const set1 = [{ symbols: ['BTC', 'ETH'] }, { symbols: ['SOL', 'DOGE'] }];
const set2 = [{ symbols: ['XRP', 'SUI'] }, { symbols: ['ONDO', 'ENA'] }];
const set3 = [{ symbols: ['ALGO', 'ORDI'] }, { symbols: ['TON', 'W'] }];
const set4 = [{ symbols: ['APT', 'OP'] }, { symbols: ['STRK', 'ARB'] }];
const set5 = [{ symbols: ['UNI', 'JUP'] }, { symbols: ['CRV', 'custom'] }];
// const set6 = [{ symbols: ['NEAR', 'LINK'] }, { symbols: ['DOT', 'WLD'] }];

const PricesSection = ({ tokens }: Props) => {
  const ItemContent = ({ symbol }: { symbol: string }) => {
    const [customSymbol, setCustomSymbol] = useState('');
    const [customPrice, setCustomPrice] = useState<number | null>(null);

    useEffect(() => {
      if (customSymbol) {
        const token = tokens?.find(
          (token) => token.symbol === customSymbol.toUpperCase()
        );
        setCustomPrice(token ? token.price : null);
      }
    }, [customSymbol]);

    const handleInputValue = (val: string) => {
      setCustomSymbol(val.toUpperCase());
    };

    const handleFocus = () => {
      setCustomPrice(null);
      setCustomSymbol('');
    };

    const handlePriceDisplay = (symbol: string, price: number | null) => {
      console.log('price:', symbol);
      const isFixedZero = symbol === 'BTC' || symbol === 'ETH';
      const tokenPriceValue = price
        ? isFixedZero
          ? Number(price).toFixed()
          : uniNumberFormatter(price)
        : price;
      return tokenPriceValue;
    };

    const tokenPrice = tokens
      ? tokens.find((token) => token.symbol === symbol)?.price ?? 0
      : 0;

    return symbol !== 'custom' ? (
      <span className="section-token-price-list-item-content">
        <span>{`${symbol}:`}</span>
        <span>{handlePriceDisplay(symbol, tokenPrice)}</span>
        {/* <span>{tokenPriceValue}</span> */}
      </span>
    ) : (
      <span className="section-token-price-list-item-content">
        <span className="custom-price-input-wrapper">
          <DefaultInput
            className="custom-token-price-input"
            placeholder="..."
            value={customSymbol}
            handleChange={handleInputValue}
            handleFocus={handleFocus}
          />
        </span>
        <span>{handlePriceDisplay(customSymbol, customPrice)}</span>
      </span>
    );
  };

  const PriceList = ({ tokenSet }: { tokenSet: { symbols: string[] }[] }) => (
    <ul className="section-token-price-list">
      {tokenSet.map((el, idx) => {
        return (
          <li key={idx} className="section-token-price-list-item">
            <ItemContent symbol={el.symbols[0]} />
            <ItemContent symbol={el.symbols[1]} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="section token-prices">
      <div className="section-content token-prices">
        <PriceList tokenSet={set1} />
        <PriceList tokenSet={set2} />
        <PriceList tokenSet={set3} />
        <PriceList tokenSet={set4} />
        <PriceList tokenSet={set5} />
        {/* <PriceList tokenSet={set6} /> */}
      </div>
    </section>
  );
};

export default PricesSection;
