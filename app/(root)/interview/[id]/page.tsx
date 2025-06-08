import { getInterviewById } from "@/lib/actions/global.actions";
import { getRandomInterviewCover } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth.action";
import Image from "next/image";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import Agent from "@/components/Agent";

const page = async ({ params }: RouteParams) => {
  const { id } = params;
  const user = await getUser();
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");
  return (
    <>
      <div className="flex flex-row gap-4 justify-center">
        <div className="flex- flex-row gap-4 items-center">
          <Image
            src={getRandomInterviewCover()}
            className="object-cover rounded-full size-[40px]"
            alt="interview"
            width={40}
            height={40}
          />
          <h3 className="capitalized">{interview.role}</h3>
        </div>
        <DisplayTechIcons techStack={interview.techStack} />
        <p className="py-2 px-3 bg-gray-200 rounded-md h-fit capitalize">
          {interview.type}
        </p>
      </div>
      <Agent
        userName={user?.name}
        userId={user?.id} 
        type="interview"
        questions={interview?.questions} />
    </>
  );
};

export default page;
