/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
// import useCreateOrderForm from '@/src/hooks/order/useAddOrderForm';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import useModal from '@/src/hooks/useModal';
import useAddHodlTargetForm from '@/src/hooks/hodlTargets/useAddHodlTargetForm';
import {
  // ExchangeEnum,
  // OrderTypeDisplayEnum,
  OrderTypeEnum,
  // QueryKeyEnum,
} from '@/src/enums';
// import { numberCutter } from '@/src/utils';
import {
  FormEvent,
  HodlTargetsData,
  HodlTargetsEntry,
  Token,
} from '@/src/types';
import { updateHodlTargets } from '@/src/messages/confirm';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import SelectMulti from '@/src/components/Form/SelectMulti';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';

type Props = {
  userId: string;
  tokens: Token[];
  initialTargets: HodlTargetsData | null;
  handleEditTargets: (args: null) => void;
  // orders: Order[];
  // initType?: OrderTypeEnum | string;
  // initSymbol: string;
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

type FormState = HodlTargetsEntry & { symbol: string };

const initForm: FormState = {
  symbol: '',
  volume25: 0,
  volume50: 0,
  volume75: 0,
  volume100: 0,
};

// initType,
// initSymbol,
// buyTargets,

const AddHodlTargetsForm = (props: Props) => {
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
  const [isProcess, setIsProcess] = useState(false);

  const { userId, tokens, initialTargets, handleEditTargets } = props;

  const [isPending, startTransition] = useTransition();
  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const hodlTargetForm = useAddHodlTargetForm({ ...initForm, userId }); // , tokens
  const { closeModal } = useModal();
  const path = usePathname();

  const { errors, creationError } = hodlTargetForm;
  const { register, onSubmit, setValue, watch } = hodlTargetForm;

  // console.log('tokens:', tokens.length);

  const formValues = watch();
  const {
    symbol,
    // volume25, volume50, volume75, volume100
  } = formValues;

  /*
  useEffect(() => {
    console.log('formValues:', formValues);
  }, [formValues]);
  // */

  // const isAsset = type === OrderTypeDisplayEnum.Asset;
  // const isBuyTarget = type === OrderTypeDisplayEnum.BuyTarget;
  // const isInit = !isAsset && !isBuyTarget;
  const isHodlTargetsPage = path.includes('/hodl-targets');

  useEffect(() => {
    if (tokens) {
      const options = tokens.map((token) => token.symbol).sort();
      setSymbolOptions(options);
      // if (initType) setValue('type', initType, { shouldValidate: true });
      // if (initSymbol) setValue('symbol', initSymbol, { shouldValidate: true });
    }
  }, [tokens]);

  useEffect(() => {
    if (initialTargets) {
      // console.log('initialTargets:', initialTargets);
      updateFormStates({
        symbol: initialTargets.symbol,
        volume25: initialTargets.hodlTargets.v25,
        volume50: initialTargets.hodlTargets.v50,
        volume75: initialTargets.hodlTargets.v75,
        volume100: initialTargets.hodlTargets.v100,
      });
      // setValue('symbol', initialTargets.symbol, { shouldValidate: true });
      // setValue('volume25', initialTargets.hodlTargets.v25);
      // setValue('volume50', initialTargets.hodlTargets.v50);
      // setValue('volume75', initialTargets.hodlTargets.v75);
      // setValue('volume100', initialTargets.hodlTargets.v100);
    }
  }, [initialTargets]);

  /*
  useEffect(() => {
    console.log('formValues:', formValues);
  }, [type]);
  // */

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

    if (!confirm(updateHodlTargets(symbol))) return;
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

  const updateFormStates = (args: FormState) => {
    const validateParams = { shouldValidate: true };
    // console.log('args:', args);
    setValue('symbol', args.symbol, validateParams);
    setValue('volume25', args.volume25, validateParams);
    setValue('volume50', args.volume50, validateParams);
    setValue('volume75', args.volume75, validateParams);
    setValue('volume100', args.volume100, validateParams);
  };

  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      updateFormStates(initForm);
      handleEditTargets(null);
    }, 500);
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
                isDisable={!symbolOptions.length || !isHodlTargetsPage}
              />

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
                  clickContent={handleCloseModal}
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
