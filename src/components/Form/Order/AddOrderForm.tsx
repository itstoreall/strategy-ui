/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useCreateOrderForm from '@/src/hooks/order/useCreateOrderForm';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { OrderTypeEnum } from '@/src/enums';
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
  symbol?: string;
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

const initTypeOptions = [OrderTypeEnum.Buy, OrderTypeEnum.Sell];

const initForm = {
  type: OrderTypeEnum.Buy,
  symbol: '',
  amount: 0.0,
  price: 0.0,
};

const AddOrderForm = ({ tokens, symbol = 'BTC' }: Props) => {
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
  const [typeOptions] = useState<string[]>(initTypeOptions);

  const {
    register,
    onSubmit,
    errors,
    isSubmitting,
    creationError,
    setValue,
    watch,
  } = useCreateOrderForm(initForm);

  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const formValues = watch();

  useEffect(() => {
    if (tokens) {
      const options = tokens.map((token) => token.symbol);
      setSymbolOptions(options);
      setValue('symbol', symbol, { shouldValidate: true });
    }
  }, [tokens]);

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
      - Type:   ${formValues.type}
      - Symbol: ${formValues.symbol}
      - Amount: ${formValues.amount}
      - Price:  ${formValues.price}
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
              options={typeOptions.filter((opt) => opt !== formValues.type)}
              initialOption={formValues.type}
              onSelect={(value) => handleSelectChange('type', value)}
              isOpen={openDropdownId === formValues.type}
              onToggle={() => toggleDropdown(formValues.type)}
            />

            <SelectMulti
              options={symbolOptions.filter((opt) => opt !== formValues.symbol)}
              initialOption={formValues.symbol}
              onSelect={(value) => handleSelectChange('symbol', value)}
              isOpen={openDropdownId === formValues.symbol}
              onToggle={() => toggleDropdown(formValues.symbol)}
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
