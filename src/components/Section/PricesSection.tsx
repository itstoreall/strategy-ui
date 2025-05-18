// import useModal from '@/src/hooks/useModal';
import { Token } from '@/src/types';
import { uniNumberFormatter } from '@/src/utils';

type Props = {
  tokens: Token[] | null;
};

const set1 = [{ symbols: ['BTC', 'ETH'] }, { symbols: ['SOL', 'DOGE'] }];
const set2 = [{ symbols: ['XRP', 'SUI'] }, { symbols: ['ONDO', 'ALGO'] }];
const set3 = [{ symbols: ['ENA', 'IOTA'] }, { symbols: ['TON', 'W'] }];
const set4 = [{ symbols: ['APT', 'OP'] }, { symbols: ['ARB', 'STRK'] }];
const set5 = [{ symbols: ['UNI', 'FIL'] }, { symbols: ['ORDI', 'VIRTUAL'] }];
// const set6 = [{ symbols: ['NEAR', 'LINK'] }, { symbols: ['DOT', 'WLD'] }];

const PricesSection = ({ tokens }: Props) => {
  const handlePriceDisplay = (symbol: string, price: number | null) => {
    const isFixedZero = symbol === 'BTC' || symbol === 'ETH';
    const tokenPriceValue = price
      ? isFixedZero
        ? Number(price).toFixed()
        : uniNumberFormatter(price)
      : price;
    return tokenPriceValue;
  };

  // ---

  const ItemContent = ({ symbol }: { symbol: string }) => {
    const tokenPrice = tokens
      ? tokens.find((token) => token.symbol === symbol)?.price ?? 0
      : 0;

    return (
      <span className="section-token-price-list-item-content">
        <span>{`${symbol}:`}</span>
        <span>{handlePriceDisplay(symbol, tokenPrice)}</span>
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
