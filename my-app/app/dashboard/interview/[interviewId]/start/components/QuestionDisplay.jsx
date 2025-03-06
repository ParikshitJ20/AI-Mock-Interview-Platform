import React, { useState } from 'react';
import { Volume2, Pointer } from 'lucide-react';

const QuestionDisplay = ({ questions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  // Handle the case where no questions are provided
  if (!questions || questions.length === 0) {
    return <p>No questions available.</p>;
  }

  const handleNext = () => {
    setSelectedQuestion((prev) => (prev + 1) % questions.length);
  };

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
        const speech=new SpeechSynthesisUtterance(text);
        window .speechSynthesis.speak(speech)
    }
    else{
        alert('Sorry Your Browser does not support text to speech');
    }
}

const saveUserResponses = async () => {
    try {
      const selectedQuestion = questions[selectedQuestionIndex];
      const feedbackPrompt = `
        Question: ${selectedQuestion.question}
        User Answer: ${userAnswer}
        Depending on the question and user answer, please provide a rating and feedback in JSON format.
        Include a "rating" field and a "feedback" field.
      `;

      const result = await ChatSession.sendMessage(feedbackPrompt);
      const rawText = await result.response.text();
      const cleanedText = rawText.replace("```json", "").replace("```", "").trim();
      const jsonResponse = JSON.parse(cleanedText);

      console.log("Feedback received:", jsonResponse);
      setFeedback(jsonResponse);
    } catch (error) {
      console.error("Error saving user responses:", error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Labels */}
      <div style={{ display: 'flex',gap:'17px', justifyContent: 'space-between', marginBottom: '30px' }}>
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuestion(index)}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedQuestion === index ? '#6C63FF' : '#f0f0f0',
              color: selectedQuestion === index ? '#fff' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {`Question${index + 1}`}
          </button>
        ))}
      </div>

      {/* Selected Question */}
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h3 style={{ marginBottom: '10px' }}>#{`Question${selectedQuestion + 1}`}</h3>
        <p>{questions[selectedQuestion].question}</p>
      </div>
      <div className='m-3'>
      <Volume2 cursor={Pointer} onClick={()=>{
     textToSpeech(questions[selectedQuestion].question)
     }}/>
      </div>

      {/* Next Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleNext}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6C63FF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;
