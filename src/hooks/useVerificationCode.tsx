import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { updateUserCredentials } from '../lib/auth/updateUserCredentials';

type Credentials = { code: string };

const useVerificationCode = () => {
  const { register, handleSubmit, formState } = useForm<Credentials>();

  const { errors, isSubmitting } = formState;

  const router = useRouter();

  const onSubmit = async (email: string, password: string) =>
    await handleSubmit(async (data) => {
      const res = await updateUserCredentials(email, password, data.code);

      if (res?.updated) {
        router.push('/auth/sign-in');
      }
    })();

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
};

export default useVerificationCode;
