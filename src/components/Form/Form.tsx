import { FormEvent } from '@/src/types';

type FormProps = {
  className?: string;
  handleSubmit: (event: FormEvent) => void;
  children: React.ReactNode;
  isPending?: boolean;
};

const Form = (props: FormProps) => {
  const { className, handleSubmit, children, isPending } = props;

  return (
    <form className={`default-form ${className}`} onSubmit={handleSubmit}>
      {children}
      {isPending && <p>Loading...</p>}
    </form>
  );
};

export default Form;
