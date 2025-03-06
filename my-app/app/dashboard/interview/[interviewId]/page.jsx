"use client"
import { InterviewDB } from '@/utils/schema'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Webcam from "react-webcam";
import { WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Londrina_Solid } from 'next/font/google';
import { db } from '@/utils/db';
// import { Equal } from 'lucide-react';
import { eq } from 'drizzle-orm';
import Link from 'next/link';




function Interview({params}) {
   const { interviewId } = React.use(params);
    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setwebCamEnabled] = useState(false);
    useEffect(()=>{
     console.log(params.interviewId);
     GetInterviewDetails();

    },[])

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(InterviewDB).where(eq(InterviewDB.mockId,interviewId));
        console.log(result);
        setInterviewData(result[0]);
    }
  return (
    <div className='my-8 m-auto flex flex-col h-100 p-5 w-120 bg-secondary'>
      <h1 className='font-bold text-2xl m-auto mb-4'>Lest Get Started</h1>
      <div className=' flex flex-row mx-10 gap-x-48'>
      <div className='flex flex-col gap-4 mx-4 my-8 h-48 w-80 border-2 bg-secondary p-5'>
{/* <h2><strong>Job Position:</strong>{"  "+ interviewData.jobPosition}</h2>   <h2><strong>Job Description:</strong>{"  "+ interviewData.jobDesc}</h2>
<h2><strong>work Experience:</strong>{"  "+ interviewData.jobExperience}</h2>  */}
<h2><strong>Job Position:</strong>{interviewData?.jobPosition}</h2>  
<h2><strong>Job Description:</strong>{interviewData?.jobDesc}</h2>
<h2><strong>work Experience:</strong>{interviewData?.jobExperience}</h2> 




        
      </div> 
     

      <div >
        
      {webCamEnabled?<>
            <Webcam onUserMedia={
            ()=>setwebCamEnabled(true)}  
            onUserMediError={()=>setwebCamEnabled(false)} 
            style={{height:260,width:300} } mirrored={true}/>
            <Button className="my-0 h-6 justify-center m-auto flex-row mx-52 bg-gray-800" onClick={()=>setwebCamEnabled(false)}>turn off</Button>
            </>
            :<>
            <WebcamIcon className="h-40 w-60 bg-secondary rounded-lg border my-6 p-10"/>
            <Button className="primary" onClick={()=>setwebCamEnabled(true)}>
            Enable WebCam and Microphone
            </Button>
            </>
           }
      </div>
      </div>
      
    <div className='flex flex-row my-0 justify-around gap-2' >
    <div className='font-sans  bg-gray-300 p-3 rounded-md'>
   
    <p ><strong>Note:</strong>- For each of 5 Questions start the recording attempt the </p>
   
    <p>question and Save responces for each. click End Interview to submit</p>
    
    
    </div>
    
   <br />
    <div className='m-auto my-4'>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button className="bg-white-700 text-black font-bold border-y-gray-800 hover:bg-blue-300 hover:">
        Start Interview</Button>
        </Link>
        </div>
    </div>
     
    </div>
  )
}

export default Interview
