import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';

type Props = {
  title: string;
  disabled?: boolean;
};

const SignInGoogleButton = ({ title, disabled = false }: Props) => {
  return (
    <button
      className="signin-google-button"
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
