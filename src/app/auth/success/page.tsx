import { checkIsAuthenticated } from "@/src/lib/auth/checkIsAuthenticated";
import AuthSuccessPage from "./success";
import { redirect } from "next/navigation";

const Success: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    console.log(1, "isAuthenticated --->", isAuthenticated);
    return <AuthSuccessPage />;
  } else {
    console.log(2, "isAuthenticated --->", isAuthenticated);
    redirect("/dashboard");
  }
};

export default Success;
