/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function SignUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    //checking user already exist or not
    const checkUser = await db.collection("users").doc(uid).get();

    if (checkUser.exists) {
      return {
        success: false,
        message: "User already exist. Please signIn",
      };
    }

    //creating user in firebase
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "User created successfully. Please sign in",
    };
  } catch (error: any) {
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    return {
      success: false,
      message: "Something went wrong. Failed to create an account",
    };
  }
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const user = await auth.getUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "user does not exist",
      };
    }

    // Set the session cookie
    await SetSessionCookie(idToken);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: false,
      message: "Something went wrong. Failed to sign in",
    };
  }
}
// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

export async function SetSessionCookie(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const cookie = await cookies();

  // Set the session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

  cookie.set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

export async function getUser() {
  const cookie = await cookies();
  const sessionCookie = cookie.get("session");
  if (!sessionCookie) {
    return null;
  }
  // Verify the session cookie
  try {
    const decodedClaims = await auth.verifySessionCookie(
      sessionCookie.value,
      true
    );
    // Get the user ID from the decoded claims
    const user = await db.collection("users").doc(decodedClaims.uid).get();

    if (!user) {
      return null;
    }
    // Return the user data
    return { ...user.data(), id: user.id } as User;
  } catch (error: any) {
    return null;
  }
}

export async function isAuthenticated() {
  // Check if the user is authenticated
  const user = await getUser();
  return user ? true : false;
}

