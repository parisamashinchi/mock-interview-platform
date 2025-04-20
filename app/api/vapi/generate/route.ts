import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
import 'dotenv/config';


export async function GET() {
  return Response.json({ message: true, data: "hello" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();
  try {

    // Generate interview questions using Google Gemini
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Generate a job interview questions.
      the  job role is ${role}
      the type may be behavioral or technical is ${type}
      the level of experience is ${level}
      the techs tack which is used in job is ${techstack}
      the amount of questions required is ${amount}
      The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
      return the questions without any explanation or extra text.
      the questions should be in a list format like this:["question1", "question2"]

   ` });

   // Save the interview to the database
   const interview = {
    type,
    role,
    level,
    techStack: techstack.split(","),
    questions: JSON.parse(questions),
    userId: userid,
    createdAt: new Date().toISOString(),
    finalized: true,
    coverImage: getRandomInterviewCover(),
   }

   await db.collection("interviews").add(interview);

   return Response.json({message: true},{status: 200})

  } catch (error) {
    return Response.json({ message: false, error }, { status: 500 });
  }
}
