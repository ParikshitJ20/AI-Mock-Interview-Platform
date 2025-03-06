"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Volume2, Pointer, Mic } from "lucide-react";
import { ChatSession } from "@google/generative-ai";
import { useRouter } from "next/router";
import { UserAnswer } from "@/utils/schema";
import { Inter } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';


function QuestionAnswerComponent({ questions}) {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  // const { interviewId } = React.use(params);
  const params = useParams();
  const { interviewId } = params;
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const { GoogleGenerativeAI } = require("@google/generative-ai");
 
  const {user}=useUser();

const genAI = new GoogleGenerativeAI("AIzaSyBWVJ3tvnN_oK_szLyH8Dsj6cB15MTP4PY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const notify = () => toast("Answer Saved Successfully. You can move to the next Question!");

// const router=useRouter();

  const {
    error,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    debug: true,
  });

  useEffect(() => {
    if (results.length) {
      setUserAnswer((prevAns) => prevAns + " " + results[results.length - 1].transcript);
    }
  }, [results]);

  const handleNext = () => {
    setSelectedQuestionIndex((prev) => (prev + 1) % questions.length);
    setUserAnswer(""); // Clear the answer for the next question
  };

  const startRecording = () => {
    console.log("Starting speech-to-text...");
    setIsRecording(true);
    startSpeechToText();
  };

  const stopRecording = () => {
    console.log("Stopping speech-to-text...");
    setIsRecording(false);
    stopSpeechToText();
  };

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const saveUserResponses = async () => {
    try {
      notify();
      console.log(userAnswer);
      const selectedQuestion = questions[selectedQuestionIndex];
      const feedbackPrompt = `
        Question: ${selectedQuestion.question}
        User Answer: ${userAnswer}
        Depending on the question and user answer, please provide a rating and feedback in JSON format.
        Include a "rating" field and a "feedback" field.
      `;

      // const result = await ChatSession.sendMessage(feedbackPrompt);
      // const rawText = await result.response.text();
      // const cleanedText = rawText.replace("```json", "").replace("```", "").trim();
      const result = await model.generateContent(feedbackPrompt);
      const Response=(result.response.text()).replace("```json","").replace("```","")

      console.log(JSON.parse(Response));
      // setjsonResponse(Response)
      const jsonResponse = JSON.parse(Response);

      console.log("Feedback received:", jsonResponse);
      setFeedback(jsonResponse);

      console.log(interviewId);
       
      const resp=await db.insert(UserAnswer).values({
        mockIdRef:interviewId,
        question:questions[selectedQuestionIndex]?.question,
        userAns:userAnswer, 
        correctAns:questions[selectedQuestionIndex].answer,
        feedback:feedback?.feedback,
        rating:feedback?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')
      })
      if(resp){
        console.log(resp);
      }
     
    } catch (error) {
      console.error("Error saving user responses:", error);
    }
  };

  if (!questions || questions.length === 0) {
    return <p>No questions available.</p>;
  }
 
  
  return (
    <>
    <div style={{ maxWidth: "800px", display: "flex", flexDirection:"row",gap:"40px",marginTop:"30px", fontFamily: "Arial, sans-serif" }}>
      <div>
      {/* Question Selector */}
      <div style={{ display: "flex", flexDirection:"row",gap: "17px", justifyContent: "space-between", marginBottom: "30px" }}>
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuestionIndex(index)}
            style={{
              padding: "10px 20px",
              backgroundColor: selectedQuestionIndex === index ? "#6C63FF" : "#f0f0f0",
              color: selectedQuestionIndex === index ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {`Question ${index + 1}`}
          </button>
        ))}
      </div>

      {/* Selected Question */}
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "4px" }}>
        <h3 style={{ marginBottom: "10px" }}>#{`Question ${selectedQuestionIndex + 1}`}</h3>
        <p>{questions[selectedQuestionIndex].question}</p>
        <div className="m-3">
          <Volume2
            cursor={Pointer}
            onClick={() => textToSpeech(questions[selectedQuestionIndex].question)}
          />
        </div>
      </div>

      {/* Next Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            margin:"20px",
            backgroundColor: "#6C63FF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
      </div>
       
       <div >
      {/* Webcam */}
      <Webcam mirrored={true} width={200} />

      {/* Audio Recorder */}
      <Button
        variant="outline"
        className="w-40 m-auto my-6"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <h2 className="flex flex-row">
            <Mic /> Recording Audio...
          </h2>
        ) : (
          "Record Audio"
        )}
      </Button>

      {/* Save Answer */}
      <Button onClick={saveUserResponses} className="mb-4 mx-2 ">
        Save User Answer
      </Button>
      </div>
      </div>
      

      {/* Feedback Display */}
      {/* {feedback && (  */}
        {/* // <div className="mt-5 p-4 border rounded-lg bg-gray-200">
        //   <h2 className="text-lg font-semibold">Feedback:</h2>
        //   <p><strong>Rating:</strong> {feedback.rating}</p>
        //   <p><strong>Feedback:</strong> {feedback.feedback}</p>
        // </div>
        // <div>
        //   toast("Answer Saved Successfully. You can move to the next Question.");
        // </div> */}
      {/* )} */}

      

      

      {/* Error Handling */}
      {error && (
        <p className="text-red-500">
          Web Speech API error: {error.message || "Permissions were denied."}
        </p>
      )}
    
    </>
  );
}

export default QuestionAnswerComponent;
