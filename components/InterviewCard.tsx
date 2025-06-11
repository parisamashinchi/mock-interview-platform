import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  id,
  role,
  type,
  techStack,
  createdAt,
}: InterviewCardProps) => {
  const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");

  return (
    <div className="blue-gradient-dark  rounded-2xl w-[400px] max-sm:w-full min-h-100 mb-4">
      <div className="flex flex-col justify-around h-full relative p-5 ">
        <div className="absolute top-0 right-0 text-sm px-5 py-3 rounded-bl-2xl rounded-tr-2xl bg-blue-200 capitalize">
          {type}
        </div>
        <Image
          src={getRandomInterviewCover()}
          alt="cover"
          width={40}
          height={40}
          className="rounded-full object-cover object-fit "
        />

        <div className="flex flex-row justify-between">
          <h3 className="capitalize text-light-100">{role}</h3>
          <div className="flex flex-row items-center">
            <Image src="/calendar.png" alt="calender" width={20} height={20} />
            <p className="text-sm text-light-400 ml-2">{formattedDate}</p>
          </div>
        </div>
        <p className="text-light-100">
            you have not take an interview yet. Participate in an interview and earn confidence through it.
        </p>
        <div className="flex flex-row gap-2 justify-between items-center">
          <DisplayTechIcons techStack={techStack} />
          <Button className="btn-primary">
            <Link href={`/interview/${id}`}>{"Take Interview"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
