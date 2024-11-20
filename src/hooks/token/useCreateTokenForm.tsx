/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCreateToken from '@/src/hooks/token/useCreateToken';

type Credentials = {
  symbol: string;
  name: string;
};

type ErrorValues = Credentials | null;

const config = {
  error: 'Token creation unsuccessful.',
};

const useCreateTokenForm = (fetchTokens: () => void) => {
  const [creationError, setCreationError] = useState('');
  const [errorValues, setErrorValues] = useState<ErrorValues>(null);

  const { register, handleSubmit, formState, watch } = useForm<Credentials>();

  const { mutate: createToken, isSuccess, isError } = useCreateToken();

  const { errors, isSubmitting } = formState;

  const symbol = watch('symbol');
  const name = watch('name');

  useEffect(() => {
    if (isSuccess) fetchTokens();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) setCreationError(config.error);
  }, [isError]);

  useEffect(() => {
    const isChangedSymbol = symbol !== errorValues?.symbol;
    const isChangedName = name !== errorValues?.name;
    if (creationError && (isChangedSymbol || isChangedName)) {
      setCreationError('');
      setErrorValues(null);
    }
  }, [name, symbol]);

  const onSubmit = handleSubmit(async (data) => {
    createToken({ symbol: data.symbol, name: data.name });
  });

  return { register, onSubmit, watch, errors, isSubmitting, creationError };
};

export default useCreateTokenForm;
