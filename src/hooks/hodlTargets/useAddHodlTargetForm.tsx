/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import useCreateOrder from '@/src/hooks/order/useCreateOrder';
import { QueryKeyEnum } from '@/src/enums';
import { useSession } from 'next-auth/react';

type Credentials = {
  volume25: string;
  volume50: string;
  volume75: string;
  volume100: string;
};

/*
const config = {
  error: 'Order creation unsuccessful.',
  errType: 'Type is required!',
  errSymbol: 'Symbol is required!',
  errExchange: 'Exchange is required!',
  errAmount: 'Amount must be a positive number!',
  errPrice: 'Price must be a positive number!',
  errUserId: 'User ID is required to create an order!',
};
*/

const useAddHodlTargetForm = (
  formDefaults: Omit<Credentials, 'userId'>,
  queryKeys: QueryKeyEnum[]
) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [creationError, setCreationError] = useState('');

  const { register, handleSubmit, formState, watch, setValue } = useForm<
    Credentials & { userId: string }
  >({
    defaultValues: {
      // volume25: formDefaults.volume25,
      // volume50: formDefaults.volume50,
      // volume75: formDefaults.volume75,
      // volume100: formDefaults.volume100,
      userId: '',
    },
  });

  // const { mutate: createOrder, isSuccess, isError } = useCreateOrder(queryKeys);
  const { errors, isSubmitting } = formState;

  const watchedValues = watch();

  useEffect(() => {
    if (userId) {
      setValue('userId', userId);
    }
  }, [userId, setValue]);

  // useEffect(() => {
  //   if (isError) {
  //     setCreationError(config.error);
  //   }
  // }, [isSuccess, isError]);

  useEffect(() => {
    if (creationError) {
      const hasChangedValues =
        watchedValues.volume25 !== formDefaults.volume25 ||
        watchedValues.volume50 !== formDefaults.volume50 ||
        watchedValues.volume75 !== formDefaults.volume75 ||
        watchedValues.volume100 !== formDefaults.volume100;

      if (hasChangedValues) {
        setCreationError('');
      }
    }
  }, [watchedValues]);

  const onSubmit = handleSubmit((data) => {
    /*
    const isBull = data.type === 'BUY';
    if (!data.type) {
      return setCreationError(config.errType);
    } else if (!data.symbol) {
      return setCreationError(config.errSymbol);
    } else if (!data.exchange) {
      if (isBull) return setCreationError(config.errExchange);
    } else if (isBull && (isNaN(data.amount) || data.amount <= 0)) {
      return setCreationError(config.errAmount);
    } else if (isNaN(data.price) || data.price <= 0) {
      if (isBull) return setCreationError(config.errPrice);
    } else if (!userId) {
      return setCreationError(config.errUserId);
    }
    */

    console.log('queryKeys:', queryKeys);

    const payload = {
      ...data,
      volume25: data.volume25,
      volume50: data.volume50,
      volume75: data.volume75,
      volume100: data.volume100,
      userId: data.userId,
    };

    console.log('payload:', payload);

    // createOrder(payload);
  });

  return {
    register,
    setValue,
    onSubmit,
    watch,
    errors,
    isSubmitting,
    creationError,
  };
};

export default useAddHodlTargetForm;
