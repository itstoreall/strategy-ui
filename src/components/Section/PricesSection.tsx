// import useModal from '@/src/hooks/useModal';
import { Token } from '@/src/types';
import * as u from '@/src/utils';

type Props = {
  tokens: Token[] | null;
};

const set1 = [{ symbols: ['BTC', 'ETH'] }, { symbols: ['SUI', 'CETUS'] }];
const set2 = [{ symbols: ['ENA', 'ONDO'] }, { symbols: ['TON', 'SEI'] }];
const set3 = [{ symbols: ['W', 'SAHARA'] }, { symbols: ['STRK', 'PEPE'] }];

const PricesSection = ({ tokens }: Props) => {
  const ItemContent = ({ symbol }: { symbol: string }) => {
    const tokenPrice = tokens
      ? tokens.find((token) => token.symbol === symbol)?.price ?? 0
      : 0;

    return (
      <span className="section-token-price-list-item-content">
        <span>{`${symbol}:`}</span>
        <span>{u.handlePriceDisplay(symbol, tokenPrice)}</span>
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
      </div>
    </section>
  );
};

export default PricesSection;
