import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { credentialsSignIn } from '../lib/auth/credentialsSignInServerAction';

type Credentials = {
  email: string;
  password: string;
  confirmPassword: string;
};

const useSignInForm = () => {
  const [isSignInError, setIsSignInError] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm<Credentials>();

  const router = useRouter();

  const { errors, isSubmitting } = formState;

  const onSubmit = handleSubmit(async (data) => {
    const { success } = await credentialsSignIn(data.email, data.password);
    if (success) {
      router.push('/dashboard');
    } else {
      setIsSignInError(true);
    }
  });

  return { register, onSubmit, watch, errors, isSubmitting, isSignInError };
};

export default useSignInForm;
