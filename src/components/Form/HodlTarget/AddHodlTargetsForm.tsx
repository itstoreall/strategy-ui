/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from 'react';
// import { usePathname } from 'next/navigation';
// import useCreateOrderForm from '@/src/hooks/order/useAddOrderForm';
// import useSelectMulti from '@/src/hooks/useSelectMulti';
import useModal from '@/src/hooks/useModal';
// import {
// ExchangeEnum,
// OrderTypeDisplayEnum,
//   OrderTypeEnum,
//   QueryKeyEnum,
// } from '@/src/enums';
// import { numberCutter } from '@/src/utils';
import { FormEvent, Token } from '@/src/types';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
// import SelectMulti from '@/src/components/Form/SelectMulti';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';
import useAddHodlTargetForm from '@/src/hooks/hodlTargets/useAddHodlTargetForm';
import { QueryKeyEnum } from '@/src/enums';

type Props = {
  tokens: Token[];
  // initType?: OrderTypeEnum | string;
  // initSymbol?: string;
  invalidateQuery: QueryKeyEnum[];
  // buyTargets?: Order[];
};

const c = {
  create: 'Create',
  newHodlTarget: 'Add Hodl Target',
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

// const typeOptions = [
//   OrderTypeDisplayEnum.Asset,
//   OrderTypeDisplayEnum.BuyTarget,
// ];

// const exchangeOptions = [
//   ExchangeEnum.Binance,
//   ExchangeEnum.Mexc,
//   ExchangeEnum.Bybit,
//   ExchangeEnum.Bingx,
//   ExchangeEnum.Bitget,
//   ExchangeEnum.Okx,
// ];

const initForm = {
  volume25: '0.0',
  volume50: '0.0',
  volume75: '0.0',
  volume100: '0.0',
};

// initType,
// initSymbol,
// buyTargets,

const AddHodlTargetsForm = ({ tokens, invalidateQuery }: Props) => {
  // const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
  const [isProcess, setIsProcess] = useState(false);

  const [isPending, startTransition] = useTransition();
  // const { openDropdownId, toggleDropdown } = useSelectMulti();
  const hodlTargetForm = useAddHodlTargetForm(initForm, invalidateQuery);
  const { closeModal } = useModal();
  // const path = usePathname();

  const { errors, creationError } = hodlTargetForm;
  const { register, onSubmit } = hodlTargetForm; // setValue, watch

  console.log('tokens:', tokens.length);

  // const formValues = watch();
  // const { volume25, volume50, volume75, volume100 } = formValues;

  // const isAsset = type === OrderTypeDisplayEnum.Asset;
  // const isBuyTarget = type === OrderTypeDisplayEnum.BuyTarget;
  // const isInit = !isAsset && !isBuyTarget;
  // const isStrategyPage = path.includes('/strategy/');

  // useEffect(() => {
  //   if (tokens) {
  //     const options = tokens.map((token) => token.symbol).sort();
  //     setSymbolOptions(options);
  //     if (initType) setValue('type', initType, { shouldValidate: true });
  //     if (initSymbol) setValue('symbol', initSymbol, { shouldValidate: true });
  //   }
  // }, [tokens]);

  /*
  useEffect(() => {
    console.log('formValues:', formValues);
  }, [type]);
  */

  useEffect(() => {
    if (creationError) alert(creationError);
  }, [creationError]);

  // ---

  // const handleSelectChange = (
  //   field: keyof typeof formValues,
  //   value: string | OrderTypeEnum
  // ) => {
  //   setValue(field, value, { shouldValidate: true });
  // };

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
    console.log('submit!');
    // const confirmMessage = isAsset
    //   ? `
    //   ${type || '--'}: ${symbol || '--'}
    //   Exchange: ${exchange || '--'}
    //   Price: ${price || '--'}
    //   Amount: ${amount || '--'}
    //   Invested: $${price && amount ? numberCutter(price * amount, 3) : '--'}
    // `
    //   : `
    //   ${type || '--'}: ${symbol || '--'} - ${price || '--'}
    // `;

    // if (confirmMessage.includes('--')) {
    //   alert(config.emptyField);
    //   return;
    // }

    // const isBuyTargetExists = !!buyTargets?.find(
    //   (target) => target.symbol === symbol
    // );

    // if (isBuyTarget && isBuyTargetExists) {
    //   alert(`${symbol} ${config.targetExists}`);
    //   return;
    // }

    // if (confirm(confirmMessage)) {
    // /*
    setIsProcess(true);
    // const currentType = isAsset ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;
    // setValue('type', currentType, { shouldValidate: true });
    startTransition(async () => {
      onSubmit();
    });
    // */
    // }
  };

  // const handleTitle = () => {
  //   switch (true) {
  //     case isAsset:
  //       return config.newAsset;
  //     case isBuyTarget:
  //       return config.newBuyTarget;
  //     case isProcess:
  //       return config.inProgress;
  //     default:
  //       return config.create;
  //   }
  // };

  return (
    <FormWrapper className="create-order-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={c.newHodlTarget} />

        {!isProcess && (
          <Form handleSubmit={(e) => handleSubmit(e)}>
            <FormContentContainer>
              {/* <SelectMulti
                options={typeOptions.filter((opt) => opt !== type)}
                initialOption={type}
                placeholder="Type"
                onSelect={(value) => handleSelectChange('type', value)}
                isOpen={openDropdownId === 'type'}
                onToggle={() =>
                  toggleDropdown(openDropdownId === 'type' ? '' : 'type')
                }
                isDisable={isStrategyPage}
              /> */}

              {/* <SelectMulti
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
              /> */}

              {/* {(isAsset || isInit) && (
                <SelectMulti
                  options={exchangeOptions.filter((opt) => opt !== exchange)}
                  placeholder={'Exchange'}
                  onSelect={(value) => handleSelectChange('exchange', value)}
                  isOpen={openDropdownId === exchange}
                  onToggle={() => toggleDropdown(exchange)}
                  // isDisable={isBuyTarget}
                />
              )} */}

              <TextInput
                type="text"
                placeholder="25%"
                disabled={isPending}
                error={errors.volume25}
                {...register('volume25', {
                  // required: c.priceRequired,
                  validate: (value) =>
                    /^\d*\.?\d*$/.test(value.toString()) || c.priceValidation,
                })}
                onInput={handleNumericInput}
              />

              <TextInput
                type="text"
                placeholder="50%"
                disabled={isPending}
                error={errors.volume50}
                {...register('volume50', {
                  // required: c.priceRequired,
                  validate: (value) =>
                    /^\d*\.?\d*$/.test(value.toString()) || c.priceValidation,
                })}
                onInput={handleNumericInput}
              />

              <TextInput
                type="text"
                placeholder="75%"
                disabled={isPending}
                error={errors.volume75}
                {...register('volume75', {
                  // required: c.priceRequired,
                  validate: (value) =>
                    /^\d*\.?\d*$/.test(value.toString()) || c.priceValidation,
                })}
                onInput={handleNumericInput}
              />

              <TextInput
                type="text"
                placeholder="100%"
                disabled={isPending}
                error={errors.volume100}
                {...register('volume100', {
                  // required: c.priceRequired,
                  validate: (value) =>
                    /^\d*\.?\d*$/.test(value.toString()) || c.priceValidation,
                })}
                onInput={handleNumericInput}
              />

              {/* {(isAsset || isInit) && (
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
              )} */}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button
                  disabled={
                    isPending
                    // || !!creationError
                  }
                  type="submit"
                >
                  {isPending ? c.creating : c.submit}
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

export default AddHodlTargetsForm;
