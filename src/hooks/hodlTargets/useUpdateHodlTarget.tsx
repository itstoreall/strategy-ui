// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import useUpdateStrategy from '../strategy/useUpdateStrategy';

// type Credentials = {
//   userId: string;
//   symbol: string;
//   volume25: string;
//   volume50: string;
//   volume75: string;
//   volume100: string;
// };

// const config = {
//   error: 'Order creation unsuccessful.',
//   errType: 'Type is required!',
//   errSymbol: 'Symbol is required!',
//   errExchange: 'Exchange is required!',
//   errAmount: 'Amount must be a positive number!',
//   errPrice: 'Price must be a positive number!',
//   errUserId: 'User ID is required to create an order!',
// };

// const useUpdateHodlTarget = (formDefaults: Credentials) => {
//   const [creationError, setCreationError] = useState('');

//   // const { register, handleSubmit, formState, watch, setValue } =
//   //   useForm<Credentials>({
//   //     // defaultValues: formDefaults,
//   //     defaultValues: {
//   //       ...formDefaults,
//   //       userId: formDefaults.userId,
//   //       symbol: formDefaults.symbol,
//   //     },
//   //   });

//   // const { mutate: createOrder, isSuccess, isError } = useCreateOrder(queryKeys);
//   // const { mutate, isSuccess, isError } = useUpdateStrategy();
//   // const { errors, isSubmitting } = formState;

//   // const watchedValues = watch();

//   // useEffect(() => {
//   //   if (formDefaults.userId) {
//   //     setValue('userId', formDefaults.userId);
//   //   }
//   //   if (formDefaults.symbol) {
//   //     setValue('symbol', formDefaults.symbol);
//   //   }
//   // }, [formDefaults.userId, formDefaults.symbol, setValue]);

//   // useEffect(() => {
//   //   if (isError) {
//   //     setCreationError(config.error);
//   //   }
//   // }, [isSuccess, isError]);

//   // useEffect(() => {
//   //   /*
//   //   if (creationError) {
//   //     const hasChangedValues =
//   //       watchedValues.amount !== formDefaults.amount ||
//   //       watchedValues.price !== formDefaults.price;

//   //     if (hasChangedValues) {
//   //       setCreationError('');
//   //     }
//   //   }
//   //   */
//   // }, [watchedValues]);

//   const onSubmit = handleSubmit((data) => {
//     /*
//     const isBull = data.type === 'BUY';
//     if (!data.type) {
//       return setCreationError(config.errType);
//     } else if (!data.symbol) {
//       return setCreationError(config.errSymbol);
//     } else if (!data.exchange) {
//       if (isBull) return setCreationError(config.errExchange);
//     } else if (isBull && (isNaN(data.amount) || data.amount <= 0)) {
//       return setCreationError(config.errAmount);
//     } else if (isNaN(data.price) || data.price <= 0) {
//       if (isBull) return setCreationError(config.errPrice);
//     } else if (!userId) {
//       return setCreationError(config.errUserId);
//     }

//     const payload = {
//       ...data,
//       exchange: data.exchange ?? ExchangeEnum.Binance,
//       amount: +data.amount,
//       price: +data.price,
//       userId: data.userId,
//     };
//     */

//     console.log('data:', data);

//     /*
//     mutate({
//       strategyId: 0,
//       newStrategyData: { history: [{ d: 0, a: 0, b: 0, s: 0 }] },
//     });
//     */
//   });

//   return {
//     register,
//     setValue,
//     onSubmit,
//     watch,
//     errors,
//     isSubmitting,
//     creationError,
//   };
// };

// export default useUpdateHodlTarget;
