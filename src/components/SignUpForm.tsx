import useSignInForm from '../hooks/useSignInForm';
import { handleEmailSignIn } from '../lib/auth/emailSignInServerAction';
import Form from './Form';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import Button from './Button';
import Divider from './Divider';
import SignInGoogleButton from './SignInGoogleButton';

type OnSubmitCallbackArgs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const onSubmitCallback = async (data: OnSubmitCallbackArgs) => {
    try {
      await handleEmailSignIn(data.email);
    } catch (error) {
      console.error(error);
    }
  };

  const { register, onSubmit, errors, isSubmitting, watch } =
    useSignInForm(onSubmitCallback);

  return (
    <div className="form-container">
      <Form className="email-form" handleSubmit={onSubmit}>
        <TextInput
          type="email"
          placeholder="Email Address"
          disabled={isSubmitting}
          error={errors.email}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address',
            },
          })}
        />

        <PasswordInput
          placeholder="Password"
          disabled={isSubmitting}
          error={errors.password}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />

        <PasswordInput
          placeholder="Confirm Password"
          disabled={isSubmitting}
          error={errors.confirmPassword}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
        />

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Signing up...' : 'Sign up with email'}
        </Button>
      </Form>

      <Divider />

      <SignInGoogleButton title={'Sign up with Google'} />
    </div>
  );
};

export default SignUpForm;
