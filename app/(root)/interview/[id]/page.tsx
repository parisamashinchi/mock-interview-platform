import { getInterviewById } from "@/lib/actions/global.actions";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth.action";
import Agent from "@/components/Agent";

type RouteParams = {
  params: {
    id: string;
  };
};

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getUser();
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");
 
  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        Welcome to Mock Interview
      </h1>
      <div className="flex flex-col gap-4 justify-center">
        <p className="text-lg text-center mt-2 text-gray-600">
          Hello <strong>{user?.name}</strong>. Let&apos;s do your interview.
          I’ll ask you a few questions related to Interview 
          <strong> {interview.role}</strong> role.
        </p>
        <p className="text-lg text-center mt-2 text-gray-600">
          These questions are be in tech area of your interest in 
          <strong> {interview.techStack.join(", ")}</strong>
        </p>

        <p className="text-lg text-center mt-2 text-gray-600 capitalize">
          The questions are in {
          interview.type === 'Mix of both' || interview.type === 'mixed'
          ? 'Mix of both behavioral and technical'
          :  interview.type === 'Technical' || interview.type === 'technical'
          ? 'Technical'
          : 'Behavioral'
          }
        </p>
      </div>
      <div className="text-center ">
        <p className="text-sm text-gray-500 mb-4">
          When you’re ready, click the button below to start your interview.
        </p>
      </div>

      {user && (
        <Agent
          userName={user.name}
          userId={user.id}
          type="interview"
          questions={interview?.questions}
        />
      )}
    </>
  );
};

export default page;
