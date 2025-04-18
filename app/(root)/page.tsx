import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const HomePage = () => {
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
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 ">
        <h2>Take an interview</h2>
        <div className="flex flex-row gap-4">
        {dummyInterviews.map((interview:Interview)=>(
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
        <p>You don&apos;t take an interview yet</p>
      </section>
    </>
  );
};

export default HomePage;
