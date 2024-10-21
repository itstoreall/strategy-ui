"use server";

import { signIn } from "@/src/lib/auth/authConfig";

export const handleGoogleSignIn = async () => {
  try {
    console.log(1, "sign in");
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    throw error;
  }
};

// export const handleGoogleSignIn = async () => {
//   try {
//     await signIn("google", { callbackUrl: "/dashboard" });
//   } catch (error) {
//     console.error("Error during Google sign-in:", error);
//     throw error;
//   }
// };
