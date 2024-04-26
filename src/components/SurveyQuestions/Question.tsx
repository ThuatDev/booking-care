import React, { useState } from 'react'

// Question.tsx
interface Props {
  data: {
    questionId: number
    question: string
    options: string[]
    answers: number[]
  }
  onAnswer: (answerIndex: number) => void
  selectedAnswer: number | null
  setSelectedAnswer: (value: number | null) => void
}

const Question: React.FC<Props> = ({ data, onAnswer, selectedAnswer, setSelectedAnswer }) => {
  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    onAnswer(index)
  }

  // Question.tsx
  // ...existing code...

  return (
    <div className='border border-gray-300 p-4 rounded-sm my-5'>
      <div>{data.question}</div>
      {data.options.map((option, index) => (
        <div key={index} className='flex items-center border-t-2 border-gray-300 py-2.5'>
          <input
            type='radio'
            id={`option-${index}`}
            name='answer'
            className='mr-2 w-5 h-5'
            checked={selectedAnswer === index}
            onChange={() => handleAnswer(index)}
          />
          <label htmlFor={`option-${index}`} className='cursor-pointer'>
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Question
