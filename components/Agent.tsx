"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";

enum InterviewStatus {
  active = "active",
  inactive = "inactive",
  completed = "completed",
  connected = "connected",
}

interface MessageProps {
  role: "user" | "assistant" | "system";
  content: string;
}

const Agent = ({
  userName,
  userId,
  type,
  interviewId,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState<InterviewStatus>(
    InterviewStatus.inactive
  );
  const [message, setMessage] = useState<MessageProps[]>([]);

  useEffect(() => {
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessage((prevMessage) => {
          return [...prevMessage, newMessage];
        });
      }
    };

    const onCallStart = () => {
      setInterviewStatus(InterviewStatus.active);
    };

    const onCallEnd = () => {
      setInterviewStatus(InterviewStatus.completed);
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error", error);
    };

    // subscribe to events
    vapi.on("message", onMessage);
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    // cleanup
    return () => {
      vapi.off("message", onMessage);
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (message: MessageProps[]) => {
    //ToDO server action to generate feedback
    const { success, id } = { success: true, id: "feedback-id" };
    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
      console.log("error generating feedback");
      router.push("");
    }
  };

  useEffect(() => {
    // check if interview is completed
    if (interviewStatus === InterviewStatus.completed) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(message);
      }
    }
  }, [userId, InterviewStatus, message, type]);

  // start call
  const handleCall = async () => {
    setInterviewStatus(InterviewStatus.connected);
    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
        variableValues: {
          userid: userId,
          username: userName,
        },
      });
    } else {
      const formattedQuestions = questions?.map((q) =>`- ${q}`).join('\n');
      await vapi.start(interviewer,{
        variableValues: {
          questions: formattedQuestions,
        }
      })
    }
  };

  // stop call
  const handleStopCall = () => {
    setInterviewStatus(InterviewStatus.completed);
    vapi.stop();
  };
  const latestMessage = message[message.length - 1]?.content;

  return (
    <>
      <div className="flex sm:flex-row flex-col w-full justify-between items-center gap-8 ">
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
      {message.length > 0 && (
        <div className="border-gradient w-full rounded-2xl p-0.5">
          <div className="dark-gradient rounded-2xl flex justify-center items-center gap-2 py-4.5 px-4 h-3.5">
            <p>{latestMessage}</p>
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
            className="inline-block rounded-full w-[80px] px-3.5 py-3 bg-success-200 hover:bg-success-100 active:bg-destructive-100"
          >
            {interviewStatus === "connected" ? "..." : "Call"}
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
