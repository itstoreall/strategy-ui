/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
// import useCreateOrderForm from '@/src/hooks/order/useAddOrderForm';
import useAddHodlTargetForm from '@/src/hooks/hodlTargets/useAddHodlTargetForm';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import useModal from '@/src/hooks/useModal';
import * as t from '@/src/types';
import { OrderTypeEnum } from '@/src/enums';
import { updateHodlTargets } from '@/src/messages/confirm';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import FormWrapper from '@/src/components/Container/FormWrapper';
import SelectMulti from '@/src/components/Form/SelectMulti';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';

type Props = {
  userId: string;
  tokens: t.Token[];
  initialTargets: t.HodlTargetsData | null;
  // orders: Order[];
  // initType?: OrderTypeEnum | string;
  // initSymbol: string;
  // buyTargets?: Order[];
};

const c = {
  // create: 'Create',
  formTitle: 'Add Hodl Target',
  v25: '25%',
  v50: '50%',
  v75: '75%',
  v100: '100%',
  submit: 'Submit',
};

type FormState = t.HodlTargetsEntry & { symbol: string };

const initForm: FormState = {
  symbol: '',
  volume25: 0,
  volume50: 0,
  volume75: 0,
  volume100: 0,
};

const hodlTargetInputBlockStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'space-between',
};

const hodlTargetInputWrapStyle: React.CSSProperties = {
  width: '100%',
};

const hodlTargetCloseButtonStyle: React.CSSProperties = {
  width: '50px',
};

const AddHodlTargetsForm = (props: Props) => {
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
  const [isProcess, setIsProcess] = useState(false);

  const { userId, tokens, initialTargets } = props;

  const [isPending, startTransition] = useTransition();
  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const hodlTargetForm = useAddHodlTargetForm({ ...initForm, userId }); // , tokens
  const { closeModal } = useModal();
  const path = usePathname();

  const { errors, creationError } = hodlTargetForm;
  const { register, onSubmit, setValue, watch } = hodlTargetForm;

  const formValues = watch();
  const { symbol } = formValues; // volume25...

  /*
  useEffect(() => {
    console.log('formValues:', formValues);
  }, [formValues]);
  // */

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
    }
  }, [initialTargets]);

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

  const handleSubmit = async (e: t.FormEvent) => {
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
    setValue('symbol', args.symbol, validateParams);
    setValue('volume25', args.volume25, validateParams);
    setValue('volume50', args.volume50, validateParams);
    setValue('volume75', args.volume75, validateParams);
    setValue('volume100', args.volume100, validateParams);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleCloseTarget = (label: string) => {
    console.log('label:', label);
  };

  // console.log('!!initialTargets:', initialTargets, !!initialTargets);

  return (
    <FormWrapper className="general-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={c.formTitle} />

        {!isProcess && (
          <Form handleSubmit={(e) => handleSubmit(e)}>
            <FormContentContainer>
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
                isDisable={
                  !symbolOptions.length ||
                  !isHodlTargetsPage ||
                  !!initialTargets
                }
              />

              <div style={hodlTargetInputBlockStyle}>
                <div style={hodlTargetInputWrapStyle}>
                  <TextInput
                    type="text"
                    placeholder={c.v25}
                    disabled={isPending}
                    error={errors.volume25}
                    {...register('volume25', {
                      /*
                      required: c.priceRequired,
                      validate: (value) =>
                        /^\d*\.?\d*$/.test(value.toString()) ||
                        c.priceValidation,
                      */
                    })}
                    onInput={handleNumericInput}
                  />
                </div>
                <Button
                  style={hodlTargetCloseButtonStyle}
                  type="button"
                  clickContent={() => handleCloseTarget(c.v25)}
                  disabled={!formValues.volume25}
                >
                  {null}
                </Button>
              </div>

              <div style={hodlTargetInputBlockStyle}>
                <div style={hodlTargetInputWrapStyle}>
                  <TextInput
                    type="text"
                    placeholder={c.v50}
                    disabled={isPending}
                    error={errors.volume50}
                    {...register('volume50', {})}
                    onInput={handleNumericInput}
                  />
                </div>
                <Button
                  style={hodlTargetCloseButtonStyle}
                  type="button"
                  clickContent={() => handleCloseTarget(c.v50)}
                  disabled={!formValues.volume50}
                >
                  {null}
                </Button>
              </div>

              <div style={hodlTargetInputBlockStyle}>
                <div style={hodlTargetInputWrapStyle}>
                  <TextInput
                    type="text"
                    placeholder={c.v75}
                    disabled={isPending}
                    error={errors.volume75}
                    {...register('volume75', {})}
                    onInput={handleNumericInput}
                  />
                </div>
                <Button
                  style={hodlTargetCloseButtonStyle}
                  type="button"
                  clickContent={() => handleCloseTarget(c.v75)}
                  disabled={!formValues.volume75}
                >
                  {null}
                </Button>
              </div>

              <div style={hodlTargetInputBlockStyle}>
                <div style={hodlTargetInputWrapStyle}>
                  <TextInput
                    type="text"
                    placeholder={c.v100}
                    disabled={isPending}
                    error={errors.volume100}
                    {...register('volume100', {})}
                    onInput={handleNumericInput}
                  />
                </div>
                <Button
                  style={hodlTargetCloseButtonStyle}
                  type="button"
                  clickContent={() => handleCloseTarget(c.v100)}
                  disabled={!formValues.volume100}
                >
                  {null}
                </Button>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button disabled={isPending} type="submit">
                  {c.submit}
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
