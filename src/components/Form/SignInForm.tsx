import { FieldError } from 'react-hook-form';
import useSignInForm from '@/src/hooks/auth/useSignInForm';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import SignInGoogleButton from '@/src/components/Button/SignInGoogleButton';
import PasswordInput from '@/src/components/Form/PasswordInput';
import TextInput from '@/src/components/Form/TextInput';
import Divider from '@/src/components/Form/Divider';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';

const config = {
  formTitle: 'Sign In',
  emailRequired: 'Email is required',
  passwordRequired: 'Password is required',
  signInEmail: 'Sign in with email',
  signingIn: 'Signing in...',
  signInGoogle: 'Sign in with Google',
  invalidEmailErr: 'Invalid email address',
  shortPassErr: 'Password must be at least 6 characters long',
};

const SignInForm = () => {
  const { register, onSubmit, errors, isSubmitting, signInError } =
    useSignInForm();

  const emailError = signInError
    ? ({ message: signInError } as FieldError)
    : errors.email;

  return (
    <FormWrapper className="auth-form-wrapper">
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
                minLength: { value: 6, message: config.shortPassErr },
              })}
            />

            <Button disabled={isSubmitting || !!signInError} type="submit">
              {isSubmitting ? config.signingIn : config.signInEmail}
            </Button>
          </FormContentContainer>
        </Form>

        <Divider />

        <SignInGoogleButton
          title={config.signInGoogle}
          // disabled={!!signInError}
        />
      </FormBackdropContainer>
    </FormWrapper>
  );
};

export default SignInForm;
