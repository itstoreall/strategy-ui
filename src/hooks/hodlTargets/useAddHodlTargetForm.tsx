/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useModal from '@/src/hooks/useModal';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import { OrderStatusEnum, OrderTypeEnum, QueryKeyEnum } from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';
// import useUpdateHodlTarget from './useUpdateHodlTarget';
// import useCreateOrder from '@/src/hooks/order/useCreateOrder';
// import { QueryKeyEnum } from '@/src/enums';
// import { useSession } from 'next-auth/react';

type Credentials = {
  userId: string;
  symbol: string;
  // v25: number;
  // v50: number;
  // v75: number;
  // v100: number;
} & t.HodlTargets &
  t.ClosedHodlTargets;

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

// , tokens: Token[]
const useAddHodlTargetForm = (formDefaults: Credentials) => {
  // const { data: session } = useSession();
  // const userId = session?.user?.id;

  /*
  const [creationError, setCreationError] = useState('');
  */

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<Credentials>({
      defaultValues: {
        // volume25: formDefaults.volume25,
        // volume50: formDefaults.volume50,
        // volume75: formDefaults.volume75,
        // volume100: formDefaults.volume100,
        symbol: formDefaults.symbol,
        userId: '',
      },
    });

  const {
    mutate: updStg,
    isSuccess,
    isError,
  } = useUpdateStrategy([QueryKeyEnum.HodlTargets]);
  // const { onSubmit: updateHodlTarget } = useUpdateHodlTarget(formDefaults);

  // const { mutate: createOrder, isSuccess, isError } = useCreateOrder(queryKeys);
  const { userId } = formDefaults;
  const { isSubmitting } = formState; // errors

  const { closeModal } = useModal();
  const watchedValues = watch();

  const { userOrderData } = useFetchAllUserStrategyOrders(
    userId,
    OrderTypeEnum.Buy,
    watchedValues.symbol,
    OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );
  // */

  // console.log('sym, userOrderData:', watchedValues.symbol, userOrderData?.strategy);

  useEffect(() => {
    if (userId) {
      setValue('userId', userId);
    }
  }, [userId, setValue]);

  useEffect(() => {
    if (isSuccess) {
      console.log('isSuccess:', isSuccess);
      closeModal();
    }
    if (isError) {
      console.log('isError:', isError);
      // setCreationError(config.error);
    }
  }, [isSuccess, isError]);

  /*
  useEffect(() => {
    if (creationError) {
      const hasChangedValues =
        watchedValues.symbol !== formDefaults.symbol ||
        watchedValues.v25 !== formDefaults.v25 ||
        watchedValues.v50 !== formDefaults.v50 ||
        watchedValues.v75 !== formDefaults.v75 ||
        watchedValues.v100 !== formDefaults.v100;

      if (hasChangedValues) {
        setCreationError('');
      }
    }
  }, [watchedValues]);
  // */

  // (data) =>
  const onSubmit = handleSubmit(() => {
    if (!userOrderData || !userOrderData?.strategy) {
      alert(`No ${watchedValues.symbol} Strategy in DB`);
      closeModal();
      return;
    }

    const hodlTargets = {
      v25: +watchedValues.v25,
      v50: +watchedValues.v50,
      v75: +watchedValues.v75,
      v100: +watchedValues.v100,
      w: +watchedValues.w,
      b: +watchedValues.b,
      c25: watchedValues.c25,
      c50: watchedValues.c50,
      c75: watchedValues.c75,
      c100: watchedValues.c100,
    };

    const entry = u.updateStrategyHodlTargetsEntry({
      hodlTargets,
      stgData: userOrderData.strategy.data,
    });

    console.log('entry:', entry);

    // /*
    updStg({ strategyId: userOrderData.strategy.id, newStrategyData: entry });
    // */

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

    // const payload = {
    //   ...data,
    //   volume25: data.volume25,
    //   volume50: data.volume50,
    //   volume75: data.volume75,
    //   volume100: data.volume100,
    //   userId: data.userId,
    // };

    // console.log('payload:', payload);

    // updateHodlTarget();
  });

  return {
    register,
    setValue,
    onSubmit,
    watch,
    // errors,
    isSubmitting,
    // creationError,
  };
};

export default useAddHodlTargetForm;
