"use client"
import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from '@/utils/db'
import { InterviewDB } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import { useUser } from '@clerk/nextjs'
import { Loader, LoaderCircle } from 'lucide-react'
import { Result } from 'postcss'
import Router from 'next/router'
import InterviewList from './InterviewList'




  import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    } from "@/components/ui/dialog"




function AddNewInterview() {
    const [diag, setdiag] = useState(false)
    const [jobPosition, setjobPosition] = useState()
    const [jobDesc, setjobDesc] = useState()
    const [jobExperience, setjobExperience] = useState()
    const [Loading, setLoading]=useState(false)
    const [jsonResponse, setjsonResponse]= useState([])


    const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBWVJ3tvnN_oK_szLyH8Dsj6cB15MTP4PY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });








    const InputPrompt="Give me five Interview Question and Answers in JSON format for Job Position:"+ jobPosition +"with Job Description"+ jobDesc+ "and Suitable for a person with Experience of:"+jobExperience+ "Years"

    const{ user}=useUser();

    

    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault();
        console.log(jobDesc,jobExperience,jobPosition)

        const result = await model.generateContent(InputPrompt);
        const Response=(result.response.text()).replace("```json","").replace("```","")

        console.log(JSON.parse(Response));
        setjsonResponse(Response)
        
       if(Response){
        const resp=await db.insert(InterviewDB).values({
          mockId:uuidv4(),
          jsonMockResp:jsonResponse,
          jobPosition:jobPosition,
          jobDesc:jobDesc,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          // createdBy:"Amol",
          createdAt:moment().format('DD-MM-YYYY'),
          jobExperience:jobExperience,

        }).returning({mockId:InterviewDB.mockId});

        console.log("Inserted Id:",resp);
        if(resp){
            setLoading(false);
            router.push('/dashboard/interview'+resp[0].mockId)
        }
    }
    else{
        console.log("Some Error...")
    }

        


      
    }

  return (
    <div>
    <div className='p-10 border rounded-lg w-80 bg-secondary hover:shadow-md cursor-pointer transition all text-gray-600'>
       <h3  className='font-bold text-lg justify-center m-auto px-16' onClick={()=>setdiag(true)}>+ Add New</h3>
       
    </div>
    <InterviewList/>
    <Dialog open={diag}>
     
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Tell us more about the job Interview</DialogTitle>
          <DialogDescription>
            <form onSubmit={onSubmit}>
            <div>
            <h1></h1>
            <h2 className='mb-4'>Add Details about the Job Position/role, Job Description and your Experience</h2>

            <div className='my-3'>
            <label htmlFor="" className='font-bold'>Job Position</label>
          <Input required onChange={(e)=>setjobPosition(e.target.value)}/>
           </div> 

           <div className='my-3'>
            <label htmlFor="" className='font-bold'>Job Description</label>
           <Textarea onChange={(e)=>setjobDesc(e.target.value)}/>
           </div> 

           <div className='my-3 mb-7' >
            <label htmlFor="" className='font-bold'>Years of Experience</label>
          <Input type="number"  max="50" required onChange={(e)=>setjobExperience(e.target.value)}/>
           </div> 
           
            </div> 
            <div className='flex gap-5 justify-end my-1'>
                <Button variant="ghost" onClick={()=>setdiag(false)}>Cancel</Button>
                <Button  type="submit">
                    {Loading? <><LoaderCircle className='animate-spin'/>'Generating From Ai'</>:'Start Interview'}
                    </Button>
            </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    
   
    </div>
  )
}

export default AddNewInterview
