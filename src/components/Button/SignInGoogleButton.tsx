import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';

type Props = {
  className: 'sign-in' | 'sign-up';
  title: string;
  disabled?: boolean;
};

const SignInGoogleButton = ({ className, title, disabled = false }: Props) => {
  return (
    <button
      className={`signin-google-button ${className}`}
      onClick={() => handleGoogleSignIn('dashboard')}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default SignInGoogleButton;

/* 
import { FcGoogle } from 'react-icons/fc';
<FcGoogle className="google-icon" />
*/
