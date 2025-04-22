import Agent from "@/components/Agent";
import { getUser } from "@/lib/actions/auth.action";
import React from "react";

const page = async () => {
  const user = await getUser();
  return (
    <>
      <h3>Interview Generation</h3>
     {user && <Agent userName={user && user.name} userId={user && user.id} type="generate" />}
    </>
  );
};

export default page;
