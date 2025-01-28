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

type ErrorValues = Credentials | null;

const config = {
  error: 'Order creation unsuccessful.',
};

// fetchTokens: () => void

const useCreateOrderForm = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [creationError, setCreationError] = useState('');
  const [errorValues, setErrorValues] = useState<ErrorValues>(null);

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<Credentials>({
      defaultValues: {
        type: OrderTypeEnum.Buy,
      },
    });
  const { mutate: createOrder, isSuccess, isError } = useCreateOrder();

  const { errors, isSubmitting } = formState;

  // const type = watch('type');
  const symbol = watch('symbol');
  const amount = watch('amount');
  const price = watch('price');

  useEffect(() => {
    if (isSuccess) console.log('fetch new user"s orders here!');
  }, [isSuccess]);

  useEffect(() => {
    if (isError) setCreationError(config.error);
  }, [isError]);

  useEffect(() => {
    // const isChangedType = type !== errorValues?.type;
    const isChangedSymbol = symbol !== errorValues?.symbol;
    const isChangedAmount = amount !== errorValues?.amount;
    const isChangedPrice = price !== errorValues?.price;
    if (
      creationError &&
      (isChangedSymbol || isChangedAmount || isChangedPrice)
    ) {
      setCreationError('');
      setErrorValues(null);
    }
  }, [symbol, amount, price]);

  useEffect(() => {
    if (userId) {
      setValue('userId', userId);
    }
  }, [userId, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      type: data.type,
      symbol: data.symbol,
      amount: +data.amount,
      price: +data.price,
      userId: data.userId,
    };

    console.log('payload:', payload);

    createOrder(payload);
  });

  return { register, onSubmit, watch, errors, isSubmitting, creationError };
};

export default useCreateOrderForm;
