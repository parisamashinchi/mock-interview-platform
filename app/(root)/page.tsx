import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import InterviewCard from "@/components/InterviewCard";
import { getUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/global.actions";

const HomePage = async () => {
  const user = await getUser();

  const [userInterviews, latestInterview] = await Promise.all ([
    getInterviewsByUserId(user?.id as string),
    getLatestInterviews({userId : user?.id as string})
  ])

  const hadInterview = userInterviews.length > 0;
  const hadLatestInterview = latestInterview.length > 0;

  return (
    <>
      <div className="card-cta">
        <div className="flex flex-col gap-4 max-w-lg">
          <h2>be prepare with AI-powered mock interview platform</h2>
          <p className="text-lg">
            Get personalized feedback and improve your interview skills with our
            AI-powered mock interview platform. Practice with real interview
            questions and receive instant feedback to help you succeed in your
            job search.
          </p>
          <Button className="btn-primary max-sm:w-full" variant="default">
            <Link href="/interview">start an interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={500}
          height={500}
          className="max-sm:hidden"
        />
      </div>
      <section className="flex flex-col gap-4 ">
        <h2 className="text-2xl font-bold">How it works</h2>
        <p className="text-lg">
          Our platform uses advanced AI algorithms to simulate real interview
          scenarios, providing you with a realistic and effective practice
          experience. You can choose from a variety of interview types and
          receive personalized feedback to help you improve your performance.
        </p>
      </section>
      <section className="flex flex-col gap-4 ">
        <h2>Your interview</h2>
        <div className="flex flex-row gap-4  w-full items-stretch max-lg:flex-col">
          {hadInterview ? (
            userInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You have not taken any interview yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-4 ">
        <h2>Take an interview</h2>
        <div className="flex flex-row gap-4">
        {hadLatestInterview ? (
            latestInterview.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new InterviewCard</p>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
