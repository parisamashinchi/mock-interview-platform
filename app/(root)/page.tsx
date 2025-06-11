import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import InterviewCard from "@/components/InterviewCard";
import { getUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/global.actions";
import {TestimonialCard} from '@/components/TestimonialCard'

const HomePage = async () => {
  const user = await getUser();

  const [userInterviews, latestInterview] = await Promise.all([
    getInterviewsByUserId(user?.id as string),
    getLatestInterviews({ userId: user?.id as string }),
  ]);

  const hadInterview = userInterviews.length > 0;
  const hadLatestInterview = latestInterview.length > 0;
  return (
    <>
      <div className="flex h-[400px] blue-gradient-dark rounded-3xl  justify-between max-sm:px-4">
        <div className="flex flex-col justify-around h-full px-10 py-6 ">
          <h2 className="text-light-100">
            Be Prepared with Our AI-Powered Mock Interview Platform
          </h2>
          <p className="text-gray-300 mt-2 max-w-xl">
            Improve your interview skills with real-time, AI-generated
            questions. Practice smarter, gain confidence, and land your dream
            job.
          </p>
          <p className="text-gray-500 mt-4">
            Looks like you haven’t started an interview yet. Why wait?
          </p>
          <Button className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" variant="default">
             <Link href="/interview">Start Your First Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={500}
          height={500}
          className="max-sm:hidden rounded-br-3xl rounded-tr-3xl"
        />
      </div>
      <section className="flex flex-col gap-4 ">
        <h2 className="text-2xl font-bold ">How it works</h2>
        <p className="text-lg ">
          Our platform uses advanced AI algorithms to simulate real interview
          scenarios, providing you with a realistic and effective practice
          experience. You can choose from a variety of interview types to help
          you improve your performance.
        </p>
      </section>
      <section className="mt-3  flex flex-col">
        <h2 className="text-2xl font-bold ">
          Why use our AI Interview Platform?
        </h2>
        <p className="mt-2 ">
          Whether you&apos;re preparing for your first job or your next big
          opportunity, our platform provides:
        </p>
        <ul className="mt-4 list-disc list-inside max-w-2xl">
          <li>Realistic mock interviews tailored to your goals</li>
          <li>Instant feedback to help you improve</li>
          <li>Custom questions based on your tech stack & role</li>
          <li>Flexible practice—anytime, anywhere</li>
        </ul>
      </section>

      <section className="flex flex-col gap-4 ">
        <h2>Your interviews</h2>
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
        <h2>Interviews conducted</h2>
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
      <section className="mt-12 bg-gray-50 p-6 rounded">
        <h2 className="text-xl font-bold text-center">What our users say</h2>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row justify-center">
          <TestimonialCard
            name="Parisa"
            feedback="This helped me get my frontend job!"
          />
          <TestimonialCard
            name="Alex"
            feedback="Realistic and very useful for behavioral interviews."
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
