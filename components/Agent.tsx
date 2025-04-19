import React from "react";
import Image from "next/image";

enum InterviewStatus {
  active = "active",
  inactive = "inactive",
  completed = "completed",
  connected = "connected",
}
const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true;
  const interviewStatus = InterviewStatus.completed;

  const message = [
    "Hello, how are you?",
    "I am here to help you with your interview.",
    "Please tell me about yourself.",
    "What are your strengths?",
    "What are your weaknesses?",
    "Why do you want to work here?",
    "What are your goals?",
  ]
 

  return (
    <>
      <div className="flex sm:flex-row flex-col w-full justify-between items-center gap-8 " >
        <div className="flex-col flex-center gap-2 p-6 h-[500px] w-full border-4 rounded-2xl blue-gradient-dark flex-1">
          <div className="flex z-20 size-[100px] bg-white rounded-full relative items-center justify-center">
            <Image
              src="/ai-avatar.png"
              alt="avatar"
              width={50}
              height={40}
              className="object-cover"
            />
            {isSpeaking && (
              <span className="animate-pulse bg-primary-200 opacity-80 rounded-full absolute inline-flex size-24"></span>
            )}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="flex-col flex-center gap-2 p-6 h-[500px] w-full border-4 rounded-2xl dark-gradient-dark flex-1">
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
      {message.length > 0  && (
        message.map((msg)=>{
            return (
                <div key={msg} className="border-gradient w-full rounded-2xl p-0.5">
                    <div className="dark-gradient rounded-2xl flex justify-center items-center gap-2 py-4.5 px-4 h-3.5">
                           <p>{msg}</p> 
                    </div>
                </div>
            )
        })
      )}
      <div className=" flex justify-center w-full">
        {interviewStatus === "active" ? (
          <button className=" inline-block rounded-full px-3.5 py-3 bg-destructive-200 hover:bg-destructive-100 active:bg-destructive-100">
            End Interview
          </button>
        ):(
        <button className=" inline-block rounded-full w-[80px] px-3.5 py-3 bg-success-200 hover:bg-success-100 active:bg-destructive-100">
           {interviewStatus === "connected" ? "..." : "Call"}
          </button> 
        )}
      </div>
    </>
  );
};

export default Agent;
