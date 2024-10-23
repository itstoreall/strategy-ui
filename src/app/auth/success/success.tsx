'use client';

import { RxCheckCircled } from 'react-icons/rx';

/*
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import Form from '@/src/components/Form';

const strategyApiUrl = process.env.NEXT_PUBLIC_STRATEGY_API_URL;
*/

const config = {
  formHeadingMsg: 'Success! Please check your email',
  formBottomMsg: 'Did not receive an email? ',
};

const AuthSuccessPage: React.FC = () => {
  /*
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');

  const router = useRouter();

  const makeReq = async () => {
    try {
      startTransition(async () => {
        const reqUrl = `${strategyApiUrl}/api/user/verify/code/${inputValue}`;
        const res = await axios.get(reqUrl);
        if (res.data.url) {
          setTimeout(() => {
            router.push(res.data.url);
          }, 2000);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) setInputValue(value);
  };
  */

  return (
    <div className="auth-success-page">
      <div className="auth-success-card">
        <div className="form-heading-info-success">
          <RxCheckCircled className="icon" />
          <p>{config.formHeadingMsg}</p>
        </div>

        {/* <div>
          <Form className="email-form" handleSubmit={makeReq}>
            <Input
              placeholder="Code"
              maxLength={4}
              value={inputValue}
              handleChange={handleInputChange}
              disabled={isPending}
              required
            />

            <Button disabled={isPending}>Send Code</Button>
          </Form>
        </div> */}

        <div className="form-bottom-info-success">
          <p>
            {config.formBottomMsg}

            <a href="/api/auth/signin">Try again</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccessPage;
