/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useModal from '@/src/hooks/useModal';
import { Token } from '@/src/types';
import { uniNumberFormatter } from '@/src/utils';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import DefaultInput from '@/src/components/Form/DefaultInput';
import Title from '@/src/components/Layout/Title';

type Props = {
  tokens: Token[] | null;
};

const c = {
  usd: '$',
  inputPlaceholder: 'Symbol',
};

const set1 = [{ symbols: ['BTC', 'ETH'] }, { symbols: ['SOL', 'DOGE'] }];
const set2 = [{ symbols: ['XRP', 'SUI'] }, { symbols: ['ONDO', 'ALGO'] }];
const set3 = [{ symbols: ['ENA', 'IOTA'] }, { symbols: ['TON', 'W'] }];
const set4 = [{ symbols: ['APT', 'OP'] }, { symbols: ['ARB', 'STRK'] }];
const set5 = [{ symbols: ['UNI', 'FIL'] }, { symbols: ['ORDI', 'VIRTUAL'] }];
// const set6 = [{ symbols: ['NEAR', 'LINK'] }, { symbols: ['DOT', 'WLD'] }];

const PricesSection = ({ tokens }: Props) => {
  const [customSymbol, setCustomSymbol] = useState('');
  const [customPrice, setCustomPrice] = useState<number>(0);

  const m = useModal();

  // ---

  const handleModal = () => m.openModal(m.ModalContentEnum.CustomPrice);

  const handleInputValue = (val: string) => {
    setCustomSymbol(val.toUpperCase());
    if (!val) {
      setCustomPrice(0);
    }
  };

  const handleFocus = () => {
    setCustomPrice(0);
    setCustomSymbol('');
  };

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
    useEffect(() => {
      if (customSymbol) {
        const token = tokens?.find(
          (token) => token.symbol === customSymbol.toUpperCase()
        );
        setCustomPrice(token ? token.price : 0);
      }
    }, [customSymbol]);

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
      <div className="section-content token-prices" onClick={handleModal}>
        <PriceList tokenSet={set1} />
        <PriceList tokenSet={set2} />
        <PriceList tokenSet={set3} />
        <PriceList tokenSet={set4} />
        <PriceList tokenSet={set5} />
        {/* <PriceList tokenSet={set6} /> */}
      </div>

      {m.isCustomPriceModal && (
        <m.RenderModal>
          <FormWrapper className="custom-price-form-wrapper">
            <FormBackdropContainer className="custom-price-form-backdrop-container">
              <Title tag={'h3'} className="form-title" text={'Price'} />

              <div className="custom-price-calculation-block">
                <span className="custom-price-modal-price-value">
                  <span>{c.usd}</span>
                  {customPrice}
                </span>

                <DefaultInput
                  className="custom-token-price-input"
                  placeholder={c.inputPlaceholder}
                  value={customSymbol}
                  handleChange={handleInputValue}
                  handleFocus={handleFocus}
                />
              </div>
            </FormBackdropContainer>
          </FormWrapper>
        </m.RenderModal>
      )}
    </section>
  );
};

export default PricesSection;
