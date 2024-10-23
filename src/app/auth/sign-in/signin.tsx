'use client';

// import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import { handleEmailSignIn } from '@/src/lib/auth/emailSignInServerAction';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import Form from '@/src/components/Form';
import { useState } from 'react';

type SignInFormData = {
  email: string;
  password: string;
};

export const SignInPage: React.FC = () => {
  // const [isPending, startTransition] = useTransition();
  // const [formData, setFormData] = useState({ email: '', password: '' });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the state
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  // const isEmptyForm = formData.email === '' && formData.password === '';

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     startTransition(async () => {
  //       const url = await handleEmailSignIn(formData.email); // , formData.password
  //       console.log('url =======>', url);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, email: event.target.value });
  // };

  // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, password: event.target.value });
  // };

  const onSubmit = async (data: SignInFormData) => {
    try {
      const url = await handleEmailSignIn(data.email); // Optionally handle password as well
      console.log('url =======>', url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>
        <div className="form-container">
          <Form className="email-form" handleSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Email Address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address',
                },
              })}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}

            <div style={{ position: 'relative' }}>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                disabled={isSubmitting}
              />

              <Button
                type="button"
                clickContent={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  padding: 0,
                  width: 24,
                  height: 24,
                  right: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'hsl(0, 0%, 70%)',
                }}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </Button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Signing in...' : 'Sign in with email'}
            </Button>
          </Form>

          <div className="divider">
            <div className="line"></div>
            <span className="or">or</span>
            <div className="line"></div>
          </div>

          <div className="social-logins">
            <button className="google" onClick={() => handleGoogleSignIn()}>
              <FcGoogle className="google-icon" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
'use client';

import { FcGoogle } from 'react-icons/fc';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import { useState, useTransition } from 'react';
import { handleEmailSignIn } from '@/src/lib/auth/emailSignInServerAction';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import Form from '@/src/components/Form';

export const SignInPage: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ email: '' as string });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      startTransition(async () => {
        const url = await handleEmailSignIn(formData.email);
        console.log('url =======>', url);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: event.target.value });
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>
        <div className="form-container">
          <Form className="email-form" handleSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              handleChange={handleEmailChange}
              disabled={isPending}
            />

            <Button disabled={isPending} type="submit">
              Sign in with email
            </Button>
          </Form>

          <div className="divider">
            <div className="line"></div>
            <span className="or">or</span>
            <div className="line"></div>
          </div>

          <div className="social-logins">
            <button className="google" onClick={() => handleGoogleSignIn()}>
              <FcGoogle className="google-icon" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
*/
