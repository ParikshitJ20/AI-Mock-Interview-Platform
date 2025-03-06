import { Button } from "@/components/ui/button";
import Image from "next/image";


import Link from "next/link";

export default function Home() {
  

  return (
   <>
   <div className=" font-extrabold my-44 mx-96 ">
    Welcome to Mock Interview Platform !!
    <p className="font-semibold my-5">Here You can Practice your own customized interview.Analyze your performance and Keep a Record of it.</p>
    <Link href={"/dashboard"}>
   <Button  className='w-44 mx-1 my-5'>Get Started</Button>
   </Link>
   </div>
   
 
   </>

  );
}
