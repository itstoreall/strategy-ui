import useGlobalState from '@/src/hooks/useGlobalState';
import { Token } from '@/src/types';

type Props = {
  tokens: Token[] | null;
};

const set1 = [{ symbols: ['BTC', 'ETH'] }, { symbols: ['SOL', 'DOGE'] }];
const set2 = [{ symbols: ['XRP', 'SUI'] }, { symbols: ['OP', 'TON'] }];
const set3 = [{ symbols: ['UNI', 'ORDI'] }, { symbols: ['APT', 'STRK'] }];
const set4 = [{ symbols: ['ALGO', 'HBAR'] }, { symbols: ['XLM', 'ENA'] }];
const set5 = [{ symbols: ['ARB', 'JUP'] }, { symbols: ['CRV', 'RAY'] }];
// const set6 = [{ symbols: ['NEAR', 'LINK'] }, { symbols: ['DOT', 'WLD'] }];

const PricesSection = ({ tokens }: Props) => {
  const { fetchTokens } = useGlobalState();

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
    <section
      className="section token-prices"
      onClick={fetchTokens}
      title="Click to update"
    >
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
