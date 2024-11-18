/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { credentialsSignIn } from '@/src/lib/auth/credentialsSignInServerAction';
import { userService } from '@/src/services/user.service';
import { handleEmailSignIn } from '@/src/lib/auth/emailSignInServerAction';

type Credentials = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ErrorValues = Omit<Credentials, 'confirmPassword'> | null;

const config = {
  error: 'Sign-in unsuccessful. Error in credentials.',
};

const useSignInForm = () => {
  const [signInError, setSignInError] = useState('');
  const [errorValues, setErrorValues] = useState<ErrorValues>(null);
  const session = useSession();

  const router = useRouter();

  const { register, handleSubmit, formState, watch } = useForm<Credentials>();

  const { errors, isSubmitting } = formState;

  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
    const isChangedEmail = email !== errorValues?.email;
    const isChangedPassword = password !== errorValues?.password;
    if (signInError && (isChangedEmail || isChangedPassword)) {
      setSignInError('');
      setErrorValues(null);
    }
  }, [email, password]);

  const handleError = () => {
    setSignInError(config.error);
    setErrorValues({ email, password });
  };

  const onSubmit = handleSubmit(async (data) => {
    const existingUser = await userService.getCredentials(data.email);

    if (existingUser) {
      if (existingUser.verified) {
        const res = await credentialsSignIn(data.email, data.password);

        if (res.success) {
          session.update();
          router.push('/dashboard');
        } else {
          handleError();
        }
      } else {
        if (existingUser.password) {
          const signInRes = await handleEmailSignIn(
            data.email,
            data.password,
            existingUser.password
          );

          if (signInRes === 'do not match') {
            return handleError();
          } else {
            console.log('signInRes:', signInRes);
            // setTimeout(() => window.close(), 5000);
          }
        } else handleError();
      }
    } else {
      handleError();
    }
  });

  return { register, onSubmit, watch, errors, isSubmitting, signInError };
};

export default useSignInForm;
