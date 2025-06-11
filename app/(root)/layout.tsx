import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { signOut } from "@/lib/actions/auth.action";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in ");
  }

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href={"/"} className="flex gap-2 items-center ">
          <Image src={"/logo.png"} alt="logo" width={70} height={70} />
          <h1 className="text-2xl font-bold">Mock Interview</h1>
        </Link>
        <Link href="/sign-in" onClick={signOut} className="font-bold">
          {" "}
          Sign out
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
