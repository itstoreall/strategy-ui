import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import Button from '@/src/components/Button/Button';
import { useState } from 'react';

type Props = {
  className: 'sign-in' | 'sign-up';
  title: string;
  disabled?: boolean;
};

const SignInGoogleButton = ({ className, title, disabled = false }: Props) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = () => {
    setIsDisabled(true);
    handleGoogleSignIn('dashboard');
  };

  return (
    <Button
      className={`signin-google-button ${className}`}
      clickContent={handleClick}
      disabled={disabled || isDisabled}
    >
      {title}
    </Button>
  );
};

export default SignInGoogleButton;

/* 
import { FcGoogle } from 'react-icons/fc';
<FcGoogle className="google-icon" />
*/
