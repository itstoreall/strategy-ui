"use client";

import { useRouter } from "next/navigation";

type SignInButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

const inlineStyle = { cursor: "pointer" };

const SignInButton = (props: SignInButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={props.className}
      style={inlineStyle}
      onClick={() => router.push("/auth/sign-in")}
    >
      {props.children || "Sign In"}
    </button>
  );
};

export default SignInButton;
