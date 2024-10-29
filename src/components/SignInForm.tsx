import { FieldError } from 'react-hook-form';
import useSignInForm from '../hooks/useSignInForm';
import SignInGoogleButton from './SignInGoogleButton';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';
import Divider from './Divider';
import Button from './Button';
import Form from './Form';

const config = {
  emailRequired: 'Email is required',
  passwordRequired: 'Password is required',
  signInEmail: 'Sign in with email',
  signingIn: 'Signing in...',
  signInGoogle: 'Sign in with Google',
  invalidEmailErr: 'Invalid email address',
  shortPassErr: 'Password must be at least 6 characters long',
  credsSignInErr: 'Sign-in unsuccessful. Please try signing in with Google.',
};

const SignInForm = () => {
  const { register, onSubmit, errors, isSubmitting, isSignInError } =
    useSignInForm();

  const emailError = isSignInError
    ? ({ message: config.credsSignInErr } as FieldError)
    : errors.email;

  return (
    <div className="form-container">
      <Form handleSubmit={onSubmit}>
        <TextInput
          type="email"
          placeholder="Email Address"
          disabled={isSubmitting}
          error={emailError}
          {...register('email', {
            required: config.emailRequired,
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: config.invalidEmailErr,
            },
          })}
        />

        <PasswordInput
          placeholder="Password"
          disabled={isSubmitting}
          error={errors.password}
          {...register('password', {
            required: config.passwordRequired,
            minLength: { value: 6, message: config.shortPassErr },
          })}
        />

        <Button disabled={isSubmitting || isSignInError} type="submit">
          {isSubmitting ? config.signingIn : config.signInEmail}
        </Button>
      </Form>

      <Divider />

      <SignInGoogleButton title={config.signInGoogle} />
    </div>
  );
};

export default SignInForm;
