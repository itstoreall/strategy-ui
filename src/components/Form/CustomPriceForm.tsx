/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react';
import { Token } from '@/src/types';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import DefaultInput from '@/src/components/Form/DefaultInput';
import Title from '@/src/components/Layout/Title';

type Props = {
  tokens: Token[];
};

const c = {
  formTitle: 'Price',
  usd: '$',
  inputPlaceholder: 'Symbol',
};

const CustomPriceForm = ({ tokens }: Props) => {
  // const [customSymbol, setCustomSymbol] = useState('');
  // const [customPrice, setCustomPrice] = useState<number>(0);

  // useEffect(() => {
  //   if (customSymbol) {
  //     const token = tokens?.find(
  //       (token) => token.symbol === customSymbol.toUpperCase()
  //     );
  //     setCustomPrice(token ? token.price : 0);
  //   }
  // }, [customSymbol]);

  // ---

  // const handleInputValue = (val: string) => {
  //   setCustomSymbol(val.toUpperCase());
  //   if (!val) {
  //     setCustomPrice(0);
  //   }
  // };

  // const handleFocus = () => {
  //   setCustomPrice(0);
  //   setCustomSymbol('');
  // };

  return (
    <FormWrapper className="edit-username-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={c.formTitle} />

        {tokens && (
          <FormContentContainer>
            <span className="custom-price-modal-price-value">
              <span>{c.usd}</span>
              {'customPrice'}
            </span>
            <DefaultInput value={'username'} handleChange={() => 'v'} />
            {/* <Button clickContent={update}>{config.buttonText}</Button> */}
          </FormContentContainer>
        )}
      </FormBackdropContainer>
    </FormWrapper>
  );

  /*
  return (
    <FormWrapper className="custom-price-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={c.formTitle} />

        <FormContentContainer>
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
        </FormContentContainer>
      </FormBackdropContainer>
    </FormWrapper>
  );
  */
};

export default CustomPriceForm;
