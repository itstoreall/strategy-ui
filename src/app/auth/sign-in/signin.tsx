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
  const [formData, setFormData] = useState({ email: '', password: '' });

  const isEmptyForm = formData.email === '' && formData.password === '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      startTransition(async () => {
        const url = await handleEmailSignIn(formData.email); // , formData.password
        console.log('url =======>', url);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: event.target.value });
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

            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              handleChange={handlePasswordChange}
              disabled={isPending}
            />

            <Button disabled={isPending || isEmptyForm} type="submit">
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
