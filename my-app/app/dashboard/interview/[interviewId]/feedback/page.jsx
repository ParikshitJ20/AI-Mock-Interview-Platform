"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { UserAnswer } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"


function Feedback() {
    
    useEffect(() => {
        GetFeedback();
    },[])
    const [FeedbackList, setFeedbackList] = useState([]);
    
    const router=useRouter();
     const params = useParams();
    const { interviewId } = params;
    const GetFeedback=async()=>{
       
        const result= await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,interviewId)).orderBy(UserAnswer.id);
       
        console.log(result);
        setFeedbackList(result);
        
    }
    return (
        <div>
          <h1 className='font-bold m-4 '>Your Interview FeedBack</h1>
          {Feedback && FeedbackList.map((items, index) => (
            <Collapsible className='flex bg-secondary flex-col p-5 text-left gap-5 justify-normal' key={index}>
              <CollapsibleTrigger className='text-left bg-gray-300 p-3 m-auto rounded-sm w-11/12'><strong>Question:</strong> {items.question}</CollapsibleTrigger>
              <CollapsibleContent className='w-11/12 m-auto justify-normal'>
              <h1></h1>
               <p><strong>Your Answer: </strong> {items.userAns}</p>
               <p>  <strong>Rating:</strong>{" "+items.rating}</p>
              </CollapsibleContent>
              <CollapsibleContent className='w-11/12 m-auto justify-normal'>
    
               <p><strong>Feedback: </strong> {items.feedback}</p>
              
              </CollapsibleContent>
              <CollapsibleContent className='w-11/12 m-auto justify-normal'>
               <p><strong>Proper Answer: </strong> {items.correctAns}</p>
               <hr />
               
               <p>___________________________________________________________________________________________</p>
               <br />
              </CollapsibleContent>
            </Collapsible>
          ))}
      <div className='my-10 mx-96'>
      <Button onClick={()=> router.replace('/dashboard')}>Home Page</Button>
      </div>
    </div>
      );
}

export default Feedback
