/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCreateToken from '@/src/hooks/token/useCreateToken';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { userService } from '@/src/services/user.service';

type Credentials = {
  symbol: string;
  name: string;
};

type ErrorValues = Credentials | null;

// const config = {
//   error: 'Token creation unsuccessful.',
// };

const useCreateTokenForm = (fetchTokens: () => void) => {
  const [creatingError, setCreatingError] = useState('');
  const [errorValues, setErrorValues] = useState<ErrorValues>(null);

  const { register, handleSubmit, formState, watch } = useForm<Credentials>();

  const { mutate: createToken, isSuccess } = useCreateToken();

  useEffect(() => {
    if (isSuccess) fetchTokens();
  }, [isSuccess]);

  const { errors, isSubmitting } = formState;

  const symbol = watch('symbol');
  const name = watch('name');

  useEffect(() => {
    const isChangedSymbol = symbol !== errorValues?.symbol;
    const isChangedName = name !== errorValues?.name;
    if (creatingError && (isChangedSymbol || isChangedName)) {
      setCreatingError('');
      setErrorValues(null);
    }
  }, [name, symbol]);

  /*
  const handleError = () => {
    setCreatingError(config.error);
    setErrorValues({ name, symbol });
  };
  */

  // /*
  const onSubmit = handleSubmit(async (data) => {
    console.log('data:', data);

    createToken({ symbol: data.symbol, name: data.name });
  });
  // */

  return { register, onSubmit, watch, errors, isSubmitting, creatingError };
};

export default useCreateTokenForm;
