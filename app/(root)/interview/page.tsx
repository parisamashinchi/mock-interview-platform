import Agent from "@/components/Agent";
import { getUser } from "@/lib/actions/auth.action";
import React from "react";

const page = async () => {
  const user = await getUser();
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Interview Generation</h1>
      <p className="text-lg text-center mt-2 text-gray-600">
        Hello <strong>{user?.name}</strong>. Let&apos;s prepare your interview.
        I’ll ask you a few questions to tailor a mock interview just for you.
      </p>
      <div className="text-center ">
        <p className="text-sm text-gray-500 mb-4">
          When you’re ready, click the button below to start your interview.
        </p>
      </div>

      {user && <Agent userName={user.name} userId={user.id} type="generate" />}
    </>
  );
};

export default page;
