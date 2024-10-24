import { useForm } from 'react-hook-form';

type Payload = {
  email: string;
  password: string;
  confirmPassword: string;
};

const useSignInForm = (onSubmitCallback: (payload: Payload) => void) => {
  const { register, handleSubmit, formState, watch } = useForm<Payload>();

  const { errors, isSubmitting } = formState;

  const onSubmit = handleSubmit((data) => onSubmitCallback(data));

  return { register, onSubmit, errors, isSubmitting, watch };
};

export default useSignInForm;
