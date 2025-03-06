"use client";
import { InterviewDB } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { eq, desc } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(InterviewDB)
        .where(eq(InterviewDB.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(InterviewDB.id));

      console.log(result);
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    }
  };

  return (
    <div>
      <h1 className="my-10 font-bold">Previous Mock Interviews</h1>
      <div className='grid grid-cols-3 gap-10 bg-secondary border-2xl m-5 w-full my-10 font-sans p-4'>
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
