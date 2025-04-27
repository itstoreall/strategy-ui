import { useTransition } from 'react';

type TxnFunction = () => void | Promise<void>;

const useTxn = () => {
  const [isPending, startTransition] = useTransition();

  const txn = (fn: TxnFunction) => {
    startTransition(async () => {
      try {
        await fn();
      } catch (error) {
        console.error('Txn failed:', error);
      }
    });
  };

  return { isPending, txn };
};

export default useTxn;

/* --- How to use:
txn(() =>
  mutateAsync({
    strategyId: userOrderData?.strategy.id,
    params: { data: { value: 'a-16' } },
  })
);
*/
