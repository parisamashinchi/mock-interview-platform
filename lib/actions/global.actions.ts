import {  db } from "@/firebase/admin";

export async function getInterviewsByUserId(userId: string) {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
  
    return interviews.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Interview[]
  }
  
  export async function getLatestInterviews(params: GetLatestInterviewsParams) {
    const {userId, limit= 10 } = params
    const interviews = await db
      .collection("interviews")
      .where("finalized", '==' , true)
      .where("userId", "!=", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
  
    return interviews.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Interview[]
  }
  
  export async function getInterviewById (id: string) {
    const interview = await db.collection('interviews').doc(id).get();
    return interview.data() as Interview | null;
  }