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
  if (!data) return null // Add a check to handle cases where data is undefined or null

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
