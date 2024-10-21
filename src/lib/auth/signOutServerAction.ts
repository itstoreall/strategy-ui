"use server";

import { signOut } from "@/src/lib/auth/authConfig";

/*
export const handleSignOut = async () => {
  try {
    await signOut({ redirectTo: "/auth/sign-in" });
    // deleteCookie("__Secure-authjs.session-token"); // Manually delete the session token
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};
*/

/*
export const handleSignOut = async () => {
  try {
    await signOut();
    document.cookie =
      "__Secure-authjs.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax";
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};
*/

// /*
const clearCookies = () => {
  document.cookie =
    "__Secure-authjs.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax";
};

export const handleSignOut = async () => {
  try {
    console.log(1, "sign out");
    await signOut();

    // ---

    clearCookies();
    // window.location.href = "/auth/sign-in";

    // ---
  } catch (error) {
    throw error;
  }
};
// */
