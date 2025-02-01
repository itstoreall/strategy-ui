/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useCreateOrderForm from '@/src/hooks/order/useCreateOrderForm';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { OrderTypeEnum } from '@/src/enums';
import { Token } from '@/src/types';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import SelectMulti from '@/src/components/Form/SelectMulti';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';

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

const AddOrderForm = ({ tokens }: { tokens: Token[] }) => {
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
  const [typeOptions] = useState<string[]>([
    OrderTypeEnum.Buy,
    OrderTypeEnum.Sell,
  ]);

  const {
    register,
    onSubmit,
    errors,
    isSubmitting,
    creationError,
    setValue,
    watch,
  } = useCreateOrderForm({
    type: OrderTypeEnum.Buy,
    symbol: 'BTC',
    amount: 0.0,
    price: 0.0,
  });

  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const formValues = watch();

  useEffect(() => {
    if (tokens) {
      const options = tokens.map((token) => token.symbol);
      setSymbolOptions(options);
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

  return (
    <FormWrapper className="create-order-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={config.formTitle} />

        <Form handleSubmit={onSubmit}>
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
              type="tel"
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
              type="tel"
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

// /* eslint-disable react-hooks/exhaustive-deps */
// // import { FieldError } from 'react-hook-form';
// import { useEffect, useState } from 'react';
// import useCreateOrderForm from '@/src/hooks/order/useCreateOrderForm';
// import useSelectMulti from '@/src/hooks/useSelectMulti';
// import { OrderTypeEnum } from '@/src/enums';
// import { Token, InputEvent } from '@/src/types';
// import FormWrapper from '@/src/components/Container/FormWrapper';
// import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
// import FormContentContainer from '@/src/components/Container/FormContent';
// import SelectMulti from '@/src/components/Form/SelectMulti';
// import TextInput from '@/src/components/Form/TextInput';
// import Button from '@/src/components/Button/Button';
// import Title from '@/src/components/Layout/Title';
// import Form from '@/src/components/Form/Form';

// const config = {
//   formTitle: 'New Order',
//   typeRequired: 'Type is required',
//   symbolRequired: 'Symbol is required',
//   amountRequired: 'Amount is required',
//   priceRequired: 'Price is required',
//   symbolValidation: 'Symbol can only contain letters and numbers',
//   amountValidation: 'Amount must be a valid number',
//   priceValidation: 'Price must be a valid number',
//   add: 'Add',
//   creating: 'Creating...',
// };

// const initState = {
//   type: OrderTypeEnum.Buy,
//   symbol: 'BTC',
//   amount: 0.0,
//   price: 0.0,
// };

// const AddOrderForm = ({ tokens }: { tokens: Token[] }) => {
//   const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
//   const [typeOptions, setTypeOptions] = useState<string[]>([]);
//   const [selectedType, setSelectedType] = useState(OrderTypeEnum.Buy);
//   const [selectedSymbol, setSelectedSymbol] = useState(initState.symbol);
//   const [isSelectError, setIsSelectError] = useState(false);
//   const [form, setForm] = useState(initState);
//   // const [isPending, setPending] = useState(false);

//   console.log('form:', form);

//   // console.log('selectedSymbol:', selectedSymbol);

//   const { register, onSubmit, errors, isSubmitting, creationError } =
//     useCreateOrderForm(form);

//   const { openDropdownId, handleOpenDropdown, toggleDropdown } =
//     useSelectMulti();

//   useEffect(() => {
//     if (!tokens) return;
//     const options = tokens.map((token) => token.symbol);
//     setTypeOptions([OrderTypeEnum.Buy, OrderTypeEnum.Sell]);
//     setSymbolOptions(options);
//   }, [tokens]);

//   // ---

//   // const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const value = e.target.value;
//   //   if (!/^\d*\.?\d*$/.test(value)) {
//   //     e.target.value = value.slice(0, -1); // Remove invalid character
//   //   }
//   // };

//   // const handleSelectError = (is: boolean) => {
//   //   setIsSelectError(is);
//   // };

//   // const handleTagLvl1Select = (selectedTag: string) => {
//   //   if (isSelectError) handleSelectError(false);
//   //   setForm((prevForm) => ({ ...prevForm, tags: [selectedTag] }));
//   //   // tags: [...new Set([...prevForm.tags, selectedTag])], // * Multiple tags
//   // };

//   const handleSelectChange = (key: keyof typeof initState, value: string) => {
//     if (isSelectError) setIsSelectError(false);
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleNumericInput = (e: InputEvent) => {
//     const value = e.target.value.replace(/,/g, '.');
//     if (/^\d*\.?\d*$/.test(value)) {
//       e.target.value = value;
//     } else {
//       e.target.value = value.slice(0, -1);
//     }
//   };

//   // const handleSymbolInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const value = e.target.value;
//   //   e.target.value = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
//   // };

//   // const handleSymbolSelect = async (id: string, name: string, role: string) => {
//   // if (!confirm(`Пользователь ${name} получит статус "${role}"!`)) {
//   //   setReset(true);
//   //   setTimeout(() => setReset(false), 100);
//   //   return;
//   // }
//   // setPending(true);
//   // setSelectError(false);
//   // setReset(false);
//   // try {
//   //   // const success = await setUserRole(id, role as AuthRole);
//   //   if (!success) throw new Error('Role update failed');
//   //   setUsers((prev) =>
//   //     prev.map((user) =>
//   //       user.id === id ? { ...user, role: role as AuthRoleEnum } : user
//   //     )
//   //   );
//   // } catch (error) {
//   //   console.error(error);
//   //   setSelectError(true);
//   // } finally {
//   //   setPending(false);
//   //   handleOpenDropdown(null);
//   //   // setOpenDropdownId(null);
//   // }
//   // };

//   return (
//     <FormWrapper className="auth-form-wrapper">
//       <FormBackdropContainer>
//         <Title tag={'h3'} className="form-title" text={config.formTitle} />

//         <Form handleSubmit={onSubmit}>
//           <FormContentContainer>
//             {/* <TextInput
//               type="text"
//               // placeholder={OrderTypeEnum.Buy}
//               disabled={true}
//               value={OrderTypeEnum.Buy}
//               // error={errors.type}
//               {...register('type')}
//             /> */}

//             <SelectMulti
//               // className="admin-all-users-info-list-item-content-value-select"
//               options={typeOptions.filter((opt) => opt !== selectedType)}
//               initialOption={selectedType}
//               // initialOption={selectOptions.find((opt) => opt === user.role) || null}
//               // placeholder={OrderTypeEnum.Buy}
//               // onSelect={(value) => setSelectedType(value as OrderTypeEnum)}
//               onSelect={(value) => {
//                 setSelectedType(value as OrderTypeEnum);
//                 handleSelectChange('type', value);
//               }}
//               isError={isSelectError}
//               // isReset={isReset}
//               // isDisable={true}
//               // isDisable={isPending}
//               isOpen={openDropdownId === selectedType}
//               onToggle={() => toggleDropdown(selectedType)}
//             />

//             <SelectMulti
//               // className="admin-all-users-info-list-item-content-value-select"
//               options={symbolOptions.filter((opt) => opt !== selectedSymbol)}
//               initialOption={selectedSymbol}
//               // initialOption={selectOptions.find((opt) => opt === user.role) || null}
//               // placeholder={selectedSymbol}
//               // onSelect={(value) => setSelectedSymbol(value)}
//               onSelect={(value) => {
//                 setSelectedSymbol(value);
//                 handleSelectChange('symbol', value);
//               }}
//               isError={isSelectError}
//               // isReset={isReset}
//               // isDisable={true}
//               // isDisable={isPending}
//               isOpen={openDropdownId === selectedSymbol}
//               onToggle={() => toggleDropdown(selectedSymbol)}
//             />

//             {/* <TextInput
//               type="text"
//               placeholder="Symbol (BTC)"
//               disabled={isSubmitting}
//               error={errors.symbol}
//               {...register('symbol', {
//                 required: config.symbolRequired,
//                 validate: (value) =>
//                   /^[A-Za-z0-9]+$/.test(value) || config.symbolValidation,
//               })}
//               onInput={handleSymbolInput}
//             /> */}

//             <TextInput
//               type="tel"
//               placeholder="Amount"
//               disabled={isSubmitting}
//               error={errors.amount}
//               {...register('amount', {
//                 required: config.amountRequired,
//                 validate: (value) =>
//                   /^\d*\.?\d*$/.test(value.toString()) ||
//                   config.amountValidation,
//               })}
//               onInput={handleNumericInput}
//             />

//             <TextInput
//               type="tel"
//               placeholder="Price"
//               disabled={isSubmitting}
//               error={errors.price}
//               {...register('price', {
//                 required: config.priceRequired,
//                 validate: (value) =>
//                   /^\d*\.?\d*$/.test(value.toString()) ||
//                   config.priceValidation,
//               })}
//               onInput={handleNumericInput}
//             />

//             <Button disabled={isSubmitting || !!creationError} type="submit">
//               {isSubmitting ? config.creating : config.add}
//             </Button>
//           </FormContentContainer>
//         </Form>
//       </FormBackdropContainer>
//     </FormWrapper>
//   );
// };

// export default AddOrderForm;
