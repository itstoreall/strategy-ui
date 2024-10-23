"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RxCheckCircled } from "react-icons/rx";
import axios from "axios";

const strategyApiUrl = process.env.NEXT_PUBLIC_STRATEGY_API_URL;

const config = {
  formHeadingMsg: "Success! Please check your email",
  formBottomMsg: "Did not receive an email? ",
};

const AuthSuccessPage: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");

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

  return (
    <div className="auth-success-page">
      <div className="auth-success-card">
        <div className="form-heading-info-success">
          <RxCheckCircled className="icon" />
          <p>{config.formHeadingMsg}</p>
        </div>

        <div>
          <form className="email-form" onSubmit={makeReq}>
            <input
              className="form-input"
              placeholder="Code"
              maxLength={4}
              value={inputValue}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*$/.test(value)) setInputValue(value);
              }}
              disabled={isPending}
              required
            />

            <button
              className="submit-button"
              disabled={isPending}
              type="submit"
            >
              Send Code
            </button>
          </form>
        </div>

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
