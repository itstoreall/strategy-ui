import { FieldError } from 'react-hook-form';
import useSignUpForm from '@/src/hooks/useSignUpForm';
import SignInGoogleButton from '@/src/components/SignInGoogleButton';
import CodeVerificationForm from '@/src/components/CodeVerificationForm';
import PasswordInput from '@/src/components/PasswordInput';
import TextInput from '@/src/components/TextInput';
import Divider from '@/src/components/Divider';
import Button from '@/src/components/Button';
import Form from '@/src/components/Form';

const config = {
  emailRequired: 'Email is required',
  passwordRequired: 'Password is required',
  confirmPassword: 'Please confirm your password',
  passwordNotMatch: 'Passwords do not match',
  signUpEmail: 'Sign up with email',
  signingUp: 'Signing up...',
  signUpGoogle: 'Sign up with Google',
  invalidEmailErr: 'Invalid email address',
  shortPassErr: 'Password must be at least 6 characters long',
};

const SignUpForm = () => {
  const {
    register,
    onSubmit,
    watch,
    errors,
    isSubmitting,
    isCodeVerification,
    signUpError,
  } = useSignUpForm();

  const emailError = signUpError
    ? ({ message: signUpError } as FieldError)
    : errors.email;

  return (
    <div className="form-container">
      {isCodeVerification ? (
        <CodeVerificationForm
          email={watch('email')}
          password={watch('password')}
        />
      ) : (
        <>
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
                minLength: {
                  value: 6,
                  message: config.shortPassErr,
                },
              })}
            />

            <PasswordInput
              placeholder="Confirm Password"
              disabled={isSubmitting}
              error={errors.confirmPassword}
              {...register('confirmPassword', {
                required: config.confirmPassword,
                validate: (value) =>
                  value === watch('password') || config.passwordNotMatch,
              })}
            />

            <Button disabled={isSubmitting || !!signUpError} type="submit">
              {isSubmitting ? config.signingUp : config.signUpEmail}
            </Button>
          </Form>

          <Divider />

          <SignInGoogleButton
            title={config.signUpGoogle}
            disabled={!!signUpError}
          />
        </>
      )}
    </div>
  );
};

export default SignUpForm;
