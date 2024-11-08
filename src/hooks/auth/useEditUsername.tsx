import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

type Credentials = {
  username: string;
};

const useEditUsername = (initialUsername?: string) => {
  const session = useSession();

  const { register, handleSubmit, watch } = useForm<Credentials>({
    defaultValues: { username: initialUsername ?? '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    session.update({ name: data.username });
  });

  return { register, onSubmit, watch };
};

export default useEditUsername;
