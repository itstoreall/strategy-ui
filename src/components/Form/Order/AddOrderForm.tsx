/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useCreateOrderForm from '@/src/hooks/order/useCreateOrderForm';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { ExchangeEnum, OrderTypeEnum } from '@/src/enums';
import { FormEvent, Token } from '@/src/types';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import SelectMulti from '@/src/components/Form/SelectMulti';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';

type Props = {
  tokens: Token[];
  initSymbol?: string;
};

const config = {
  formTitle: 'New Order',
  typeRequired: 'Type is required',
  symbolRequired: 'Symbol is required',
  amountRequired: 'Amount is required',
  priceRequired: 'Price is required',
  symbolValidation: 'Symbol can only contain letters and numbers',
  amountValidation: 'Amount must be a valid number',
  priceValidation: 'Price must be a valid number',
  confirmSubmit: 'Please confirm your order details:',
  add: 'Add',
  creating: 'Creating...',
};

const typeOptions = [OrderTypeEnum.Buy, OrderTypeEnum.Sell];

const exchangeOptions = [
  ExchangeEnum.Binance,
  ExchangeEnum.Mexc,
  ExchangeEnum.Bybit,
  ExchangeEnum.Bingx,
  ExchangeEnum.Bitget,
  ExchangeEnum.Okx,
];

const initForm = {
  type: OrderTypeEnum.Buy,
  symbol: '',
  amount: 0.0,
  price: 0.0,
  exchange: '',
};

const AddOrderForm = ({ tokens, initSymbol = 'BTC' }: Props) => {
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);

  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const orderForm = useCreateOrderForm(initForm);

  const { errors, isSubmitting, creationError } = orderForm;
  const { register, onSubmit, setValue, watch } = orderForm;

  const formValues = watch();
  const { symbol, type, exchange, amount, price } = formValues;

  useEffect(() => {
    if (tokens) {
      const options = tokens.map((token) => token.symbol);
      setSymbolOptions(options);
      setValue('symbol', initSymbol, { shouldValidate: true });
    }
  }, [tokens]);

  useEffect(() => {
    if (creationError) alert(creationError);
  }, [creationError]);

  // ---

  const handleSelectChange = (
    field: keyof typeof formValues,
    value: string
  ) => {
    setValue(field, value, { shouldValidate: true });
  };

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '.');
    if (/^\d*\.?\d*$/.test(value)) {
      e.target.value = value;
    } else {
      e.target.value = value.slice(0, -1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const confirmMessage = `
      ${config.confirmSubmit}
      
      ${type || '-'}
      ${symbol || '-'}
      ${exchange || '-'}
      ${amount || '-'}
      ${price || '-'}
    `;
    if (confirm(confirmMessage)) onSubmit();
  };

  return (
    <FormWrapper className="create-order-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={config.formTitle} />

        <Form handleSubmit={(e) => handleSubmit(e)}>
          <FormContentContainer>
            <SelectMulti
              options={typeOptions.filter((opt) => opt !== type)}
              initialOption={type}
              placeholder="Type"
              onSelect={(value) => handleSelectChange('type', value)}
              isOpen={openDropdownId === type}
              onToggle={() => toggleDropdown(type)}
            />

            <SelectMulti
              options={symbolOptions.filter((opt) => opt !== symbol)}
              initialOption={symbol}
              placeholder="Symbol"
              onSelect={(value) => handleSelectChange('symbol', value)}
              isOpen={openDropdownId === symbol}
              onToggle={() => toggleDropdown(symbol)}
            />

            <SelectMulti
              options={exchangeOptions.filter((opt) => opt !== exchange)}
              placeholder="Exchange"
              onSelect={(value) => handleSelectChange('exchange', value)}
              isOpen={openDropdownId === exchange}
              onToggle={() => toggleDropdown(exchange)}
            />

            <TextInput
              type="text"
              placeholder="Amount"
              disabled={isSubmitting}
              error={errors.amount}
              {...register('amount', {
                required: config.amountRequired,
                validate: (value) =>
                  /^\d*\.?\d*$/.test(value.toString()) ||
                  config.amountValidation,
              })}
              onInput={handleNumericInput}
            />

            <TextInput
              type="text"
              placeholder="Price"
              disabled={isSubmitting}
              error={errors.price}
              {...register('price', {
                required: config.priceRequired,
                validate: (value) =>
                  /^\d*\.?\d*$/.test(value.toString()) ||
                  config.priceValidation,
              })}
              onInput={handleNumericInput}
            />

            <Button disabled={isSubmitting || !!creationError} type="submit">
              {isSubmitting ? config.creating : config.add}
            </Button>
          </FormContentContainer>
        </Form>
      </FormBackdropContainer>
    </FormWrapper>
  );
};

export default AddOrderForm;
