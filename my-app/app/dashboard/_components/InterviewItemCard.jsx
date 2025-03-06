import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function InterviewItemCard({interview}) {
    const router=useRouter();
    const onStart=()=>{
        router.push('dashboard/interview/'+interview?.mockId)
    }
  return (
    <div className='border-secondary m-2 p-4 w-56 font-sans bg-gray-300 rounded-md'>
      <h1><strong>Position:</strong>{" "+interview?.jobPosition}</h1>
      <h2><strong>{interview?.jobExperience+" "}years</strong> of Experience</h2>
      <h2><strong>created at:</strong>{" "+interview.createdAt}</h2>
      <div className='flex justify-around mt-6'>
       <Link href={"dashboard/interview/"+interview.mockId+"/feedback"}>
       <Button size="sm" className='w-full my-3  bg-gray-400' variant="outline">FeedBack</Button>      </Link>
       <Link href={"dashboard/interview/"+interview.mockId}>
        <Button size="sm" className='w-full my-3 mx-2'>Start</Button>
        </Link>
      </div>
    </div>
  )
}

export default InterviewItemCard
