/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import useCreateOrderForm from '@/src/hooks/order/useAddOrderForm';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import useModal from '@/src/hooks/useModal';
import { FormEvent, Order, Token } from '@/src/types';
import {
  ExchangeEnum,
  OrderTypeDisplayEnum,
  OrderTypeEnum,
  QueryKeyEnum,
} from '@/src/enums';
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
  initType?: OrderTypeEnum | string;
  initSymbol?: string;
  invalidateQuery: QueryKeyEnum[];
  buyTargets?: Order[];
};

const config = {
  create: 'Create',
  newAsset: 'New Asset',
  newBuyTarget: 'New Buy Target',
  typeRequired: 'Type is required',
  symbolRequired: 'Symbol is required',
  amountRequired: 'Amount is required',
  priceRequired: 'Price is required',
  symbolValidation: 'Symbol can only contain letters and numbers',
  amountValidation: 'Amount must be a valid number',
  priceValidation: 'Price must be a valid number',
  confirmOrderSubmit: 'Please confirm your order details:',
  confirmBuyTargetSubmit: 'Please confirm your Buy Target details:',
  emptyField: 'Please fill in all the fields!',
  targetExists: 'Buy Target already exists!',
  submit: 'Submit',
  creating: 'Creating...',
  inProgress: 'In progress...',
};

const typeOptions = [
  OrderTypeDisplayEnum.Asset,
  OrderTypeDisplayEnum.BuyTarget,
];

const exchangeOptions = [
  ExchangeEnum.Binance,
  ExchangeEnum.Mexc,
  ExchangeEnum.Bybit,
  ExchangeEnum.Bingx,
  ExchangeEnum.Bitget,
  ExchangeEnum.Okx,
];

const initForm = {
  type: '',
  symbol: '',
  exchange: '',
  amount: 0.0,
  price: 0.0,
};

const AddOrderForm = ({
  tokens,
  initType,
  initSymbol,
  invalidateQuery,
  buyTargets,
}: Props) => {
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
  const [isProcess, setIsProcess] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const orderForm = useCreateOrderForm(initForm, invalidateQuery);
  const { closeModal } = useModal();
  const path = usePathname();

  const { errors, creationError } = orderForm;
  const { register, onSubmit, setValue, watch } = orderForm;

  const formValues = watch();
  const { symbol, type, exchange, amount, price } = formValues;

  const isAsset = type === OrderTypeDisplayEnum.Asset;
  const isBuyTarget = type === OrderTypeDisplayEnum.BuyTarget;
  const isStrategyPage = path.includes('/strategy/');

  useEffect(() => {
    if (tokens) {
      const options = tokens.map((token) => token.symbol).sort();
      setSymbolOptions(options);
      if (initType) setValue('type', initType, { shouldValidate: true });
      if (initSymbol) setValue('symbol', initSymbol, { shouldValidate: true });
    }
  }, [tokens]);

  useEffect(() => {
    if (creationError) alert(creationError);
  }, [creationError]);

  // ---

  const handleSelectChange = (
    field: keyof typeof formValues,
    value: string | OrderTypeEnum
  ) => {
    setValue(field, value, { shouldValidate: true });
  };

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/,/g, '.');
    if (/^\d*\.?\d*$/.test(value)) {
      if (value.startsWith('.')) {
        value = `0${value}`;
      }
      e.target.value = value;
    } else {
      e.target.value = value.slice(0, -1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const confirmMessage = isAsset
      ? `
      ${config.confirmOrderSubmit}
      
      ${type || '--'}
      ${symbol || '--'}
      ${exchange || '--'}
      ${amount || '--'}
      ${price || '--'}
    `
      : `
      ${config.confirmBuyTargetSubmit}
      
      ${type || '--'}
      ${symbol || '--'}
      ${price || '--'}
    `;

    if (confirmMessage.includes('--')) {
      alert(config.emptyField);
      return;
    }

    const isBuyTargetExists = !!buyTargets?.find(
      (target) => target.symbol === symbol
    );

    if (isBuyTarget && isBuyTargetExists) {
      alert(`${symbol} ${config.targetExists}`);
      return;
    }

    // /*
    if (confirm(confirmMessage)) {
      setIsProcess(true);
      const currentType = isAsset ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;
      setValue('type', currentType, { shouldValidate: true });
      startTransition(async () => {
        onSubmit();
      });
    }
    // */
  };

  return (
    <FormWrapper className="create-order-form-wrapper">
      <FormBackdropContainer>
        <Title
          tag={'h3'}
          className="form-title"
          text={
            isAsset
              ? config.newAsset
              : isBuyTarget
              ? config.newBuyTarget
              : config.inProgress
          }
        />

        {!isProcess && (
          <Form handleSubmit={(e) => handleSubmit(e)}>
            <FormContentContainer>
              <SelectMulti
                options={typeOptions.filter((opt) => opt !== type)}
                initialOption={type}
                placeholder="Type"
                onSelect={(value) => handleSelectChange('type', value)}
                isOpen={openDropdownId === 'type'}
                onToggle={() =>
                  toggleDropdown(openDropdownId === 'type' ? '' : 'type')
                }
                isDisable={isStrategyPage}
              />

              <SelectMulti
                options={symbolOptions.filter((opt) => opt !== symbol)}
                initialOption={symbol}
                placeholder={symbolOptions.length ? 'Symbol' : 'No tokens'}
                onSelect={(value) => handleSelectChange('symbol', value)}
                isOpen={openDropdownId === 'symbol'}
                onToggle={() =>
                  toggleDropdown(openDropdownId === 'symbol' ? '' : 'symbol')
                }
                searchEnabled={true}
                isDisable={!symbolOptions.length || isStrategyPage}
              />

              {isAsset && (
                <SelectMulti
                  options={exchangeOptions.filter((opt) => opt !== exchange)}
                  placeholder={'Exchange'}
                  onSelect={(value) => handleSelectChange('exchange', value)}
                  isOpen={openDropdownId === exchange}
                  onToggle={() => toggleDropdown(exchange)}
                  // isDisable={isBuyTarget}
                />
              )}

              {isAsset && (
                <TextInput
                  type="text"
                  placeholder="Amount"
                  // placeholder={isAsset ? 'Amount' : '-'}
                  disabled={isPending}
                  error={errors.amount}
                  {...register('amount', {
                    required: config.amountRequired,
                    validate: (value) =>
                      /^\d*\.?\d*$/.test(value.toString()) ||
                      config.amountValidation,
                  })}
                  onInput={handleNumericInput}
                  // disabled={isPending || isBuyTarget}
                />
              )}

              <TextInput
                type="text"
                placeholder="Price"
                disabled={isPending}
                error={errors.price}
                {...register('price', {
                  required: config.priceRequired,
                  validate: (value) =>
                    /^\d*\.?\d*$/.test(value.toString()) ||
                    config.priceValidation,
                })}
                onInput={handleNumericInput}
              />

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button disabled={isPending || !!creationError} type="submit">
                  {isPending ? config.creating : config.submit}
                </Button>

                <Button
                  style={{ flex: '0 0 47px', backgroundColor: '#f25c5e' }}
                  clickContent={closeModal}
                  type="button"
                >
                  {null}
                </Button>
              </div>
            </FormContentContainer>
          </Form>
        )}
      </FormBackdropContainer>
    </FormWrapper>
  );
};

export default AddOrderForm;
