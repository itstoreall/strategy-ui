import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/src/lib/auth/checkIsAuthenticated";
import { SignInPage } from "@/src/app/auth/sign-in/signin";

const SignIn: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    return <SignInPage />;
  }
};

export default SignIn;
