import useGlobalState from '@/src/hooks/useGlobalState';
import { Token } from '@/src/types';

type Props = {
  tokens: Token[] | null;
};

const firstSet = [{ symbols: ['BTC', 'DOGE'] }, { symbols: ['ETH', 'NEAR'] }];
const secondSet = [{ symbols: ['SOL', 'ALGO'] }, { symbols: ['XRP', 'HBAR'] }];
const thirdSet = [{ symbols: ['TON', 'LINK'] }, { symbols: ['SUI', 'ORDI'] }];
const fourthSet = [{ symbols: ['XLM', 'WLD'] }, { symbols: ['OP', 'STRK'] }];
const fifthSet = [{ symbols: ['ARB', 'UNI'] }, { symbols: ['APT', 'CRV'] }];
const sixthSet = [{ symbols: ['DOT', 'RAY'] }, { symbols: ['ENA', 'JUP'] }];

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
        <PriceList tokenSet={firstSet} />
        <PriceList tokenSet={secondSet} />
        <PriceList tokenSet={thirdSet} />
        <PriceList tokenSet={fourthSet} />
        <PriceList tokenSet={fifthSet} />
        <PriceList tokenSet={sixthSet} />
      </div>
    </section>
  );
};

export default PricesSection;
