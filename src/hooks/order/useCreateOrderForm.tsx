/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCreateOrder from '@/src/hooks/order/useCreateOrder';
import { OrderTypeEnum } from '@/src/enums';
import { useSession } from 'next-auth/react';

type Credentials = {
  type: OrderTypeEnum;
  symbol: string;
  amount: number;
  price: number;
  userId: string;
};

const config = {
  error: 'Order creation unsuccessful.',
};

const useCreateOrderForm = (formDefaults: Omit<Credentials, 'userId'>) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [creationError, setCreationError] = useState('');

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<Credentials>({
      defaultValues: {
        type: formDefaults.type,
        symbol: formDefaults.symbol,
        userId: '',
      },
    });

  const { mutate: createOrder, isSuccess, isError } = useCreateOrder();
  const { errors, isSubmitting } = formState;

  const watchedValues = watch();

  useEffect(() => {
    if (userId) {
      setValue('userId', userId);
    }
  }, [userId, setValue]);

  useEffect(() => {
    // if (isSuccess) {
    //   console.log("Fetch new user's orders here!");
    // }

    if (isError) {
      setCreationError(config.error);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (creationError) {
      const hasChangedValues =
        watchedValues.symbol !== formDefaults.symbol ||
        watchedValues.amount !== formDefaults.amount ||
        watchedValues.price !== formDefaults.price;

      if (hasChangedValues) {
        setCreationError('');
      }
    }
  }, [watchedValues]);

  const onSubmit = handleSubmit((data) => {
    if (!userId) {
      setCreationError('User ID is required to create an order!');
      return;
    }

    const payload = {
      ...data,
      amount: +data.amount,
      price: +data.price,
      userId,
    };

    // console.log('payload:', payload);
    createOrder(payload);
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

export default useCreateOrderForm;
