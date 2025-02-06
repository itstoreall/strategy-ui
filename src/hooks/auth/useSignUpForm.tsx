import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createVerifyCodeServerAction } from '@/src/lib/auth/createVerifyCodeServerAction';
import { credentialsSignUp } from '@/src/lib/auth/credentialsSignUpServerAction';
import accessVerification from '@/src/lib/auth/accessVerificationServerAction';
import { handleEmailSignIn } from '@/src/lib/auth/emailSignInServerAction';
import { userService } from '@/src/services/user.service';

type Credentials = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ExistingUserData = { email: string; verified: Date; password: string };

const config = {
  signUpError: 'The user already exists. Try signing in.',
  accessError: 'Access dinied!',
};

const useSignUpForm = () => {
  const [isCodeVerification, setIsCodeVerification] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  const { register, handleSubmit, formState, watch } = useForm<Credentials>();

  const { errors, isSubmitting } = formState;

  const onSubmit = handleSubmit(async (data) => {
    const isAccess = await accessVerification(data.email);
    if (!isAccess) return setSignUpError(config.accessError);

    const existingUser = await userService.getCredentials(data.email);

    if (!existingUser) {
      const user = await credentialsSignUp(data.email, data.password);

      if (user && user.id && user.email === data.email) {
        await handleEmailSignIn(data.email);
      }
    } else {
      const user = existingUser as ExistingUserData;

      if (user.password && user.verified) {
        return setSignUpError(config.signUpError);
      } else if (user.password && !user.verified) {
        await handleEmailSignIn(data.email);
      } else {
        const isCodeSent = await createVerifyCodeServerAction(user.email);

        if (isCodeSent) {
          setIsCodeVerification(true);
          console.log(4, isCodeSent);
        }
      }
    }
  });

  return {
    register,
    onSubmit,
    watch,
    errors,
    isSubmitting,
    isCodeVerification,
    signUpError,
  };
};

export default useSignUpForm;
