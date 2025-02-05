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
  exchange: string;
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
        watchedValues.amount !== formDefaults.amount ||
        watchedValues.price !== formDefaults.price;

      if (hasChangedValues) {
        setCreationError('');
      }
    }
  }, [watchedValues]);

  const onSubmit = handleSubmit((data) => {
    if (!data.type) {
      return setCreationError('Type is required!');
    } else if (!data.symbol) {
      return setCreationError('Symbol is required!');
    } else if (!data.exchange) {
      return setCreationError('Exchange is required!');
    } else if (isNaN(data.amount) || data.amount <= 0) {
      return setCreationError('Amount must be a positive number!');
    } else if (isNaN(data.price) || data.price <= 0) {
      return setCreationError('Price must be a positive number!');
    } else if (!userId) {
      return setCreationError('User ID is required to create an order!');
    }

    const payload = {
      ...data,
      exchange: data.exchange,
      amount: +data.amount,
      price: +data.price,
      userId,
    };

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
