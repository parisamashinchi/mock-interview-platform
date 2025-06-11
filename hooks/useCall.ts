"use client";

import { useState, useEffect } from "react";
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

export default function useCall({
  userName,
  userId,
  type,
//   interviewId,
  questions,
}: AgentProps) {
//   const router = useRouter();
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
        console.log('end')
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

  // start call
  const handleCall = async () => {
    setInterviewStatus(InterviewStatus.connected);
    if (type === "generate") {
    //ask question based on vapi workflow to generate interview questions
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
        variableValues: {
          userid: userId,
          username: userName,
        },
      });
    } else {
           // start call and ask questions which are provided by  gemini by asking previous questions
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }
      
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  // stop call
  const handleStopCall = () => {
    setInterviewStatus(InterviewStatus.completed);
    vapi.stop();
  };

  return {
    isSpeaking,
    interviewStatus,
    message,
    handleStopCall,
    handleCall,
  };
}
