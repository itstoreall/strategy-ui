import { FcGoogle } from 'react-icons/fc';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';

type Props = {
  title: string;
  disabled?: boolean;
};

const SignInGoogleButton = ({ title, disabled = false }: Props) => {
  return (
    <button
      className="signin-google-button"
      onClick={() => handleGoogleSignIn()}
      disabled={disabled}
    >
      <FcGoogle className="google-icon" />
      {title}
    </button>
  );
};

export default SignInGoogleButton;
