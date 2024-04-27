// Question.tsx
import React from 'react'
import Answer from './Answer'

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
  return (
    <div className='border border-gray-300 p-4 rounded-sm my-5'>
      <div className='font-semibold'>{data.question}</div>
      {data.options.map((option, index) => (
        <Answer
          key={index}
          text={option}
          index={index}
          selected={selectedAnswer === index}
          onChange={setSelectedAnswer}
          onAnswer={onAnswer}
        />
      ))}
    </div>
  )
}

export default Question
