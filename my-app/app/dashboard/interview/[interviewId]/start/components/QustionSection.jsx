import React from 'react'
import { Pointer, Volume2 } from 'lucide-react';

function QustionSection({MockInterviewQuestions,activeIndex}) {

    const textToSpeech=()=>{
        if('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
            window .speechSynthesis.speak(speech)
        }
        else{
            alert('Sorry Your Browser does not support text to speech');
        }
    }
  return (
    
    <div className='p-5 border w-96 rounded-lg bg-secondary '>
     <div className='flex flex-row gap-5 ove' >
     {MockInterviewQuestions && MockInterviewQuestions.map((question,index)=>(
        <h2 className={` p-2 rounded-2xl ${activeIndex==index && `bg-purple-600 text-white`}`}         key={index}>#Question{index+1}</h2>
     ))}
    
     </div>

     <h2 className='my-10 font-bold'>{MockInterviewQuestions[activeIndex]?.question}</h2>

     <Volume2 cursor={Pointer} onClick={()=>{
     textToSpeech(MockInterviewQuestions[activeIndex]?.question)
     }}/>

     </div>
    // <div className='w-96'>
    //     <h1>Questions1</h1>

    // </div>
  )
}

export default QustionSection
