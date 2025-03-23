import { Token } from '@/src/types';

type Props = {
  tokens: Token[] | null;
};

const firstSet = [{ symbols: ['BTC', 'ETH'] }, { symbols: ['SOL', 'DOGE'] }];
const secondSet = [{ symbols: ['XRP', 'SUI'] }, { symbols: ['OP', 'TON'] }];

const PricesSection = ({ tokens }: Props) => {
  const ItemContent = ({ symbol }: { symbol: string }) => (
    <span className="section-token-price-list-item-content">
      <span>{`${symbol}:`}</span>
      <span>
        {tokens ? tokens.find((token) => token.symbol === symbol)?.price : 0}
      </span>
    </span>
  );

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
        <PriceList tokenSet={firstSet} />
        <PriceList tokenSet={secondSet} />
      </div>
    </section>
  );
};

export default PricesSection;
