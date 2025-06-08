import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  id,
  userId,
  role,
  type,
  techStack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;

  //   const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    createdAt || feedback?.createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="border-gradient p-0.5 rounded-2xl  w-[400px] max-sm:w-full min-h-100 mb-4">
      <div className="flex flex-col gap-4 relative p-3">
        <div className="absolute top-0 right-0 px-5 py-3 rounded-bl-lg rounded-tr-lg bg-light-400">
          {type}
        </div>
        <Image
          src={getRandomInterviewCover()}
          alt="cover"
          width={70}
          height={70}
          className="rounded-full object-cover object-fit"
        />
        <h3 className="capitalize ">{role}</h3>
        <div className="flex flex-row">
          <Image src="/calendar.svg" alt="calender" width={20} height={20} />
          <p className="text-sm text-light-400 ml-2">{formattedDate}</p>
          <Image
            src="/star.svg"
            alt="star"
            width={20}
            height={20}
            className="ml-4"
          />
          <p className="text-sm text-light-400 ml-2">
            {feedback ? feedback.totalScore : "N/A"}
          </p>
        </div>
        <p className="line-clamp-3">
          {feedback?.finalAssessment ||
            "you have not take an interview yet. Participate in an interview and earn confidence through it."}
        </p>
        <div className="flex flex-row gap-2 justify-between items-center">
            <DisplayTechIcons techStack={techStack} />
            <Button className="btn-primary">
                <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
                    {feedback ? "View Feedback" : "Take Interview"}
                </Link>
            </Button>
        </div>
       
      </div>
    </div>
  );
};

export default InterviewCard;
