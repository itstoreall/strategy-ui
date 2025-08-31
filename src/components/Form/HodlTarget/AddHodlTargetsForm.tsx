/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { IoMdTrash } from 'react-icons/io';
// import useCreateOrderForm from '@/src/hooks/order/useAddOrderForm';
import useAddHodlTargetForm from '@/src/hooks/hodlTargets/useAddHodlTargetForm';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import useModal from '@/src/hooks/useModal';
import * as t from '@/src/types';
import { OrderTypeEnum } from '@/src/enums';
import * as confirmMsg from '@/src/messages/confirm';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import FormWrapper from '@/src/components/Container/FormWrapper';
import SelectMulti from '@/src/components/Form/SelectMulti';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';

type CSS = React.CSSProperties;

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
  c25: 'c25',
  c50: 'c50',
  c75: 'c75',
  c100: 'c100',
  submit: 'Submit',
};

type Label = 'c25' | 'c50' | 'c75' | 'c100';

type FormState = t.HodlTargets & t.ClosedHodlTargets & { symbol: string };

const initForm: FormState = {
  symbol: '',
  v25: 0,
  v50: 0,
  v75: 0,
  v100: 0,
  c25: false,
  c50: false,
  c75: false,
  c100: false,
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

  // const { errors, creationError } = hodlTargetForm;
  const { register, onSubmit, setValue, watch } = hodlTargetForm;

  const formValues = watch();
  const { symbol } = formValues;

  /*
  useEffect(() => {
    console.log('formValues:', formValues);
  }, [formValues]);
  // */

  const isHodlTargetsPage = path.includes('/hodl-targets');
  const validateParams = { shouldValidate: true };

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
        v25: initialTargets.hodlTargets.v25,
        v50: initialTargets.hodlTargets.v50,
        v75: initialTargets.hodlTargets.v75,
        v100: initialTargets.hodlTargets.v100,
        c25: initialTargets.hodlTargets.c25,
        c50: initialTargets.hodlTargets.c50,
        c75: initialTargets.hodlTargets.c75,
        c100: initialTargets.hodlTargets.c100,
      });
    }
  }, [initialTargets]);

  /*
  useEffect(() => {
    if (creationError) alert(creationError);
  }, [creationError]);
  */

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

  const updateFormStates = (args: FormState) => {
    setValue('symbol', args.symbol, validateParams);
    setValue('v25', args.v25, validateParams);
    setValue('v50', args.v50, validateParams);
    setValue('v75', args.v75, validateParams);
    setValue('v100', args.v100, validateParams);
    setValue('c25', args.c25, validateParams);
    setValue('c50', args.c50, validateParams);
    setValue('c75', args.c75, validateParams);
    setValue('c100', args.c100, validateParams);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleCloseTarget = (label: Label) => {
    setValue(label, !formValues[label], validateParams);

    const updBefore = (label: Label) => {
      const newValue = !formValues[label];
      const val =
        newValue === true
          ? true
          : !!initialTargets?.hodlTargets[label]
          ? initialTargets.hodlTargets[label]
          : formValues[label];
      setValue(label, val, validateParams);
    };

    const updAfter = (label: Label) => {
      setValue(label, false, validateParams);
    };

    switch (label) {
      case c.c25:
        if (!!formValues.v50) updAfter('c50');
        if (!!formValues.v75) updAfter('c75');
        if (!!formValues.v100) updAfter('c100');
        break;
      case c.c50:
        if (!!formValues.v25) updBefore('c25');
        if (!!formValues.v75) updAfter('c75');
        if (!!formValues.v100) updAfter('c100');
        break;
      case c.c75:
        if (!!formValues.v25) updBefore('c25');
        if (!!formValues.v50) updBefore('c50');
        if (!!formValues.v100) updAfter('c100');
        break;
      case c.c100:
        if (!!formValues.v25) updBefore('c25');
        if (!!formValues.v50) updBefore('c50');
        if (!!formValues.v75) updBefore('c75');
        break;
    }
  };

  const deleteHodlTargets = () => {
    if (!confirm(confirmMsg.deleteHodlTargets(symbol))) return;
    updateFormStates({
      symbol,
      v25: initForm.v25,
      v50: initForm.v50,
      v75: initForm.v75,
      v100: initForm.v100,
      c25: initForm.c25,
      c50: initForm.c50,
      c75: initForm.c75,
      c100: initForm.c100,
    });
  };

  const handleSubmit = async (e: t.FormEvent) => {
    e.preventDefault();
    if (!symbol) {
      alert('Symbol is required!');
      return;
    }
    console.log(`${symbol} submit!`);
    if (!confirm(confirmMsg.updateHodlTargets(symbol))) return;
    // /*
    setIsProcess(true);
    startTransition(async () => {
      onSubmit();
    });
    // */
  };

  const blue = '#225695';
  const greyLight = '#c2c4c5';
  const greyDeepDark = '#1d2228';

  const closeStyle: CSS = {
    color: greyLight,
    backgroundColor: blue,
    borderColor: blue,
  };

  const { v25, v50, v75, v100, c25, c50, c75, c100 } = formValues;

  const isClosed25 = v25 && c25;
  const isClosed50 = v50 && c50;
  const isClosed75 = v75 && c75;
  const isClosed100 = v100 && c100;

  // const isBlue25 =
  //   isClosed25 || (isClosed25 && (isClosed50 || isClosed75 || isClosed100));

  // const isClosed50isBlue50 =
  //   isClosed50 || (isClosed50 && (isClosed75 || isClosed100));

  const v25InputStyle: CSS = isClosed25 ? closeStyle : {};
  const v50InputStyle: CSS = isClosed50 ? closeStyle : {};
  const v75InputStyle: CSS = isClosed75 ? closeStyle : {};
  const v100InputStyle: CSS = isClosed100 ? closeStyle : {};

  const c25ButtonStyle: CSS = {
    ...hodlTargetCloseButtonStyle,
    backgroundColor: !v25 ? greyDeepDark : '',
  };

  const c50ButtonStyle: CSS = {
    ...hodlTargetCloseButtonStyle,
    backgroundColor: !v50 ? greyDeepDark : '',
  };

  const c75ButtonStyle: CSS = {
    ...hodlTargetCloseButtonStyle,
    backgroundColor: !v75 ? greyDeepDark : '',
  };

  const c100ButtonStyle: CSS = {
    ...hodlTargetCloseButtonStyle,
    backgroundColor: !v100 ? greyDeepDark : '',
  };

  // console.log('formValues:', formValues);

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
                    style={v25InputStyle}
                    type="text"
                    placeholder={c.v25}
                    disabled={isPending}
                    // error={errors.v25}
                    {...register('v25', {
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
                  style={c25ButtonStyle}
                  type="button"
                  clickContent={() => handleCloseTarget('c25')}
                  disabled={!formValues.v25}
                >
                  {null}
                </Button>
              </div>

              <div style={hodlTargetInputBlockStyle}>
                <div style={hodlTargetInputWrapStyle}>
                  <TextInput
                    style={v50InputStyle}
                    type="text"
                    placeholder={c.v50}
                    disabled={isPending}
                    {...register('v50', {})}
                    onInput={handleNumericInput}
                  />
                </div>
                <Button
                  style={c50ButtonStyle}
                  type="button"
                  clickContent={() => handleCloseTarget('c50')}
                  disabled={!formValues.v50}
                >
                  {null}
                </Button>
              </div>

              <div style={hodlTargetInputBlockStyle}>
                <div style={hodlTargetInputWrapStyle}>
                  <TextInput
                    style={v75InputStyle}
                    type="text"
                    placeholder={c.v75}
                    disabled={isPending}
                    {...register('v75', {})}
                    onInput={handleNumericInput}
                  />
                </div>
                <Button
                  style={c75ButtonStyle}
                  type="button"
                  clickContent={() => handleCloseTarget('c75')}
                  disabled={!formValues.v75}
                >
                  {null}
                </Button>
              </div>

              <div style={hodlTargetInputBlockStyle}>
                <div style={hodlTargetInputWrapStyle}>
                  <TextInput
                    style={v100InputStyle}
                    type="text"
                    placeholder={c.v100}
                    disabled={isPending}
                    {...register('v100', {})}
                    onInput={handleNumericInput}
                  />
                </div>
                <Button
                  style={c100ButtonStyle}
                  type="button"
                  clickContent={() => handleCloseTarget('c100')}
                  disabled={!formValues.v100}
                >
                  {null}
                </Button>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: '0 0 47px',
                    padding: 0,
                  }}
                  className="yellow-button"
                  clickContent={deleteHodlTargets}
                  type="button"
                >
                  <IoMdTrash size={28} fill="#151a1e" />
                </Button>

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
