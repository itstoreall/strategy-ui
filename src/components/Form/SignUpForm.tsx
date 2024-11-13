import { FieldError } from 'react-hook-form';
import useSignUpForm from '@/src/hooks/auth/useSignUpForm';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import SignInGoogleButton from '@/src/components/Button/SignInGoogleButton';
import CodeVerificationForm from '@/src/components/Form/CodeVerificationForm';
import PasswordInput from '@/src/components/Form/PasswordInput';
import TextInput from '@/src/components/Form/TextInput';
import Divider from '@/src/components/Form/Divider';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';

const config = {
  formTitle: 'Sign Up',
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
    <FormWrapper className="auth-form-wrapper">
      {/* <div className="form-container"> */}
      {isCodeVerification ? (
        <CodeVerificationForm
          email={watch('email')}
          password={watch('password')}
        />
      ) : (
        <FormBackdropContainer>
          <Title tag={'h3'} className="form-title" text={config.formTitle} />

          <Form handleSubmit={onSubmit}>
            <FormContentContainer>
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
            </FormContentContainer>
          </Form>

          <Divider />

          <SignInGoogleButton
            className={'sign-up'}
            title={config.signUpGoogle}
            disabled={!!signUpError}
          />
        </FormBackdropContainer>
      )}
      {/* </div> */}
    </FormWrapper>
  );
};

export default SignUpForm;
