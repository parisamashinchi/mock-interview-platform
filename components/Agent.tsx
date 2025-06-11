"use client";

import Image from "next/image";
import useCall from "@/hooks/useCall";

enum InterviewStatus {
  active = "active",
  inactive = "inactive",
  completed = "completed",
  connected = "connected",
}
const Agent = ({
  userName,
  userId,
  type,
  interviewId,
  questions,
}: AgentProps) => {
  const { isSpeaking, interviewStatus, message, handleStopCall, handleCall } =
    useCall({ userName, userId, type, interviewId, questions });
console.log(userId, 'agent')
  const latestMessage = message[message.length - 1]?.content;
  const latestMessageRole = message[message.length - 1]?.role;

  return (
    <>
      <div className="flex sm:flex-row flex-col w-full justify-between items-center gap-8 ">
        <div className="flex-col flex-center gap-2 p-6 h-[300px] w-full border-4 rounded-4xl blue-gradient-dark flex-1">
          <div className="flex z-20 size-[100px] bg-white rounded-full relative items-center justify-center">
            <Image
              src="/ai-avatar.png"
              alt="avatar"
              width={100}
              height={40}
              className="object-cover rounded-full"
            />
            {isSpeaking && (
              <span className="animate-pulse bg-blue-400 opacity-80 rounded-full absolute inline-flex size-20"></span>
            )}
          </div>
          <h3 className="text-white">AI Interviewer</h3>
        </div>
        <div className="flex-col flex-center gap-2 p-6 h-[300px] w-full border-4 rounded-4xl dark-gradient-dark flex-1">
          <Image
            src="/user-avatar.png"
            alt="user avatar"
            width="100"
            height="100"
            className="object-cover rounded-full size-[100px]"
          />
          <h3>{userName}</h3>
        </div>
      </div>
      {message.length > 0 && (
        <div className="border-gradient w-full rounded-2xl p-0.5">
          <div className="dark-gradient rounded-2xl flex justify-center items-center gap-2 py-4.5 px-4 h-3.5">
            <p className="text-white ">
              {latestMessageRole}:{latestMessage}
            </p>
          </div>
        </div>
      )}
      <div className=" flex justify-center w-full">
        {interviewStatus === "active" ? (
          <button
            onClick={handleStopCall}
            className=" inline-block rounded-full px-3.5 py-3 bg-destructive-200 hover:bg-destructive-100 active:bg-destructive-100"
          >
            End Interview
          </button>
        ) : (
          <button
            onClick={handleCall}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            {interviewStatus === "connected" ? "..." : "Start Interview"}
          </button>
        )}
      </div>
      {interviewStatus !== InterviewStatus.completed ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-md mt-6 max-w-2xl mx-auto text-center">
          <strong>Tip:</strong> Ensure your microphone is working. You’ll hear a
          question first — then answer when you’re ready.
        </div>
      ) : (
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold text-green-600">
            ✅ Interview Generated!
          </h2>
          <p className="text-gray-600 mt-2">
            {type === "generate"
              ? `Thanks for the call, ${userName}. Your mock interview has been created based on your inputs.`
              : `Thanks for the call  ${userName}. please check your mailbox for the results of your interview.`
              }
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {type === "generate"
              ? "Good luck with your preparation!"
              : "We will reach out to you soon with feedback."}
          </p>
        </div>
      )}
    </>
  );
};

export default Agent;
