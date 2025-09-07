// import useModal from '@/src/hooks/useModal';
import { Token } from '@/src/types';
import * as u from '@/src/utils';

type Props = {
  tokens: Token[] | null;
};

const set1 = [{ symbols: ['BTC', 'ETH'] }, { symbols: ['SUI', 'SEI'] }];
const set2 = [{ symbols: ['ENA', 'ONDO'] }, { symbols: ['ZRO', 'ZK'] }];
const set3 = [{ symbols: ['EIGEN', 'LDO'] }, { symbols: ['PENDLE', 'IOTA'] }];
const set4 = [{ symbols: ['PYTH', 'WLFI'] }, { symbols: ['STRK', 'TON'] }];

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
        <PriceList tokenSet={set4} />
      </div>
    </section>
  );
};

export default PricesSection;
