'use client';

import InfoStatusBlock from '@/src/components/InfoStatusBlock';
import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';

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
        <InfoStatusBlock status="success" text={config.formHeadingMsg} />

        <InfoTextLinkBlock
          text={config.formBottomMsg}
          url={'/api/auth/signin'}
          linkTitle={'Try again'}
        />
      </div>
    </div>
  );
};

export default AuthSuccessPage;
