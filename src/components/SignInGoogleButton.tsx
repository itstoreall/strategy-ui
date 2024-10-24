import { FcGoogle } from 'react-icons/fc';
import { handleGoogleSignIn } from '../lib/auth/googleSignInServerAction';

const SignInGoogleButton = ({ title }: { title: string }) => {
  return (
    <button
      className="signin-google-button"
      onClick={() => handleGoogleSignIn()}
    >
      <FcGoogle className="google-icon" />
      {title}
    </button>
  );
};

export default SignInGoogleButton;
