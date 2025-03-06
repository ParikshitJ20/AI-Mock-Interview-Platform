"use client";
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { ChatSession } from '@google/generative-ai';

function RecordAnswerSection({questions}) {

  const [userAnswer, setuserAnswer] = useState()
  const [Recording, setRecording] = useState(true);
  // const [userResponses, setuserResponses] = useState([]);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    debug: true, // Enable debugging
  });
  useEffect(() => {
    results.map((result)=>{
        setuserAnswer(prevAns => prevAns + result.transcript);
    })
  
  }, [results])
  

//   if (error) {
//     console.error("Speech recognition error:", error);
//     return <p>Web Speech API is not available in this browser or permissions were denied 🤷‍</p>;
//   }

  const startRecording = () => {
    console.log("Starting speech-to-text...");
    startSpeechToText();
  };

  const stopRecording = () => {
    console.log("Stopping speech-to-text...");
    stopSpeechToText();
  };

  const SaveUserResponces=async()=>{
    console.log(userAnswer);
    const feedbackPrompt='Question:'+"Describe a time you had to manage a team through a challenging project. What were the challenges, and how did you overcome them?"+", User Answer:"+userAnswer+"Depending on question ans user answer for given interview question please give us rating for answer ans feedback as area of improvement if any in just 3 to 5 line to improve it in JSON format  with rating field and feedback field"

    const result=await  ChatSession.sendMessage(feedbackPrompt);
    const mockJsonResp=(result.response.text()).replace("```json","").replace("```","");
    console.log(mockJsonResp);
  }

  return (
    <div className='my-12 flex flex-col gap-5'>
      {<Webcam mirrored="true" />}
      <Button variant="outline" className="w-40 m-auto my-5"
      onClick={isRecording?stopSpeechToText:startSpeechToText}
      >

        {isRecording?
        <h2 className='flex flex-row'>
           <Mic/>{"  "} Recording Audio....
        </h2>
        :'Record Audio'
            }
  
      </Button>

      <Button onClick={
        // console.log(userAnswer)
        // setuserResponses(...userResponses,userAnswer);
        SaveUserResponces()
      }>Save User Answer</Button>

    </div>
  );
}

export default RecordAnswerSection;