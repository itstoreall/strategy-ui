import { FieldError } from 'react-hook-form';
import useVerificationCode from '@/src/hooks/useVerificationCode';
import CodeInput from '@/src/components/CodeInput';
import Button from '@/src/components/Button';
import Form from '@/src/components/Form';

type Props = { email: string; password: string };

const config = {
  codeRequired: 'Code is required',
  codeNumeric: 'Code must be numeric',
  sendingCode: 'Sending code...',
  sendCode: 'Send code',
};

const CodeVerificationForm = ({ email, password }: Props) => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useVerificationCode();

  const handleFormSubmit = handleSubmit(() => onSubmit(email, password));

  return (
    <Form handleSubmit={handleFormSubmit}>
      <CodeInput
        placeholder="Enter Code"
        maxLength={4}
        disabled={isSubmitting}
        error={errors.code as FieldError}
        {...register('code', {
          required: config.codeRequired,
          pattern: {
            value: /^[0-9]{4}$/,
            message: config.codeNumeric,
          },
        })}
      />

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? config.sendingCode : config.sendCode}
      </Button>
    </Form>
  );
};

export default CodeVerificationForm;
