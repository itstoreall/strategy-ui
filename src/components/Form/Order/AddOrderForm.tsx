/* eslint-disable react-hooks/exhaustive-deps */
// import { FieldError } from 'react-hook-form';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';
import useCreateOrderForm from '@/src/hooks/order/useCreateOrderForm';
import { OrderTypeEnum } from '@/src/enums';

const config = {
  formTitle: 'New Order',
  typeRequired: 'Type is required',
  symbolRequired: 'Symbol is required',
  amountRequired: 'Amount is required',
  priceRequired: 'Price is required',
  symbolValidation: 'Symbol can only contain letters and numbers',
  amountValidation: 'Amount must be a valid number',
  priceValidation: 'Price must be a valid number',
  add: 'Add',
  creating: 'Creating...',
};

const AddOrderForm = () => {
  const { register, onSubmit, errors, isSubmitting, creationError } =
    useCreateOrderForm();

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      e.target.value = value.slice(0, -1); // Remove invalid character
    }
  };

  const handleSymbolInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.target.value = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  };

  return (
    <FormWrapper className="auth-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={config.formTitle} />

        <Form handleSubmit={onSubmit}>
          <FormContentContainer>
            <TextInput
              type="text"
              // placeholder={OrderTypeEnum.Buy}
              disabled={true}
              value={OrderTypeEnum.Buy}
              // error={errors.type}
              {...register('type')}
            />

            <TextInput
              type="text"
              placeholder="Symbol (BTC)"
              disabled={isSubmitting}
              error={errors.symbol}
              {...register('symbol', {
                required: config.symbolRequired,
                validate: (value) =>
                  /^[A-Za-z0-9]+$/.test(value) || config.symbolValidation,
              })}
              onInput={handleSymbolInput}
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
