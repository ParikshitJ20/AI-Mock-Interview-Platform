"use client"
import React, { useEffect } from 'react'
import { db } from '@/utils/db';
import { InterviewDB } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import QustionSection from './components/QustionSection';
import RecordAnswerSection from './components/RecordAnswerSection';
import QuestionDisplay from './components/QuestionDisplay';
import QuestionAnswerComponent from './components/QuestionAnswerComponent';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Feedback from '../feedback/page';


function startInterview({params}) {
  const { interviewId } = React.use(params);
  const [InterviewData, setInterviewData] = useState();
  const [MockInterviewQuestions, setMockInterviewQuestions] = useState()
  const [activeIndex, setactiveIndex] = useState()
  useEffect(() => {
    GetInterviewDetails()
  }, [])
  
  const GetInterviewDetails=async()=>{
          const result=await db.select().from(InterviewDB).where(eq(InterviewDB.mockId,interviewId));
          console.log(result);
          setInterviewData(result[0]);

          const jsonMockResp=JSON.parse(result[0].jsonMockResp);
          console.log(jsonMockResp);
          setMockInterviewQuestions(jsonMockResp);
          setactiveIndex(0);
      }

  return (
    <div >
     {/* <div className='flex flex-row gap-30 '>
     <div className='w-96 my-5'>
       
         <QuestionDisplay questions={MockInterviewQuestions}/>
      </div>
      <div className='my-12 w-56'>
          <RecordAnswerSection/>
        </div>
     </div> */}
     <QuestionAnswerComponent questions={MockInterviewQuestions} interviewId={interviewId} />
     <div className='flex flex-row justify-end mx-24 mt-0'>
     <Link href={'/dashboard/interview/'+interviewId+'/feedback'}>
     <Button >End Interview</Button>
     </Link>
     </div>
     
    </div >

  )
}
 
export default startInterview
