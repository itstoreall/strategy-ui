/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useModal from '@/src/hooks/useModal';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import { OrderStatusEnum, OrderTypeEnum, QueryKeyEnum } from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';

type Credentials = { userId: string; symbol: string } & t.HodlTargets &
  t.ClosedHodlTargets;

const useAddHodlTargetForm = (formDefaults: Credentials) => {
  const { register, handleSubmit, formState, watch, setValue } =
    useForm<Credentials>({
      defaultValues: {
        symbol: formDefaults.symbol,
        userId: '',
      },
    });

  const { mutate: updStg, isSuccess } = useUpdateStrategy([
    QueryKeyEnum.HodlTargets,
  ]); // isError

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
  }, [isSuccess]);

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
  });

  return {
    register,
    setValue,
    onSubmit,
    watch,
    isSubmitting,
  };
};

export default useAddHodlTargetForm;
