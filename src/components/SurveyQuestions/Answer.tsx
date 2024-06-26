import React from 'react'

interface Props {
  text: string
  index: number
  selected: boolean
  onChange: (index: number) => void
  onAnswer: (answerIndex: number) => void
}

const Answer: React.FC<Props> = ({ text, index, selected, onChange, onAnswer }) => {
  const handleAnswer = () => {
    if (!selected) {
      onChange(index)
      onAnswer(index)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !selected) {
      onChange(index)
      onAnswer(index)
    }
  }

  return (
    <div
      onClick={handleAnswer}
      onKeyDown={handleKeyPress}
      role='button'
      tabIndex={0}
      className='flex items-center border-t-2 border-gray-300 py-3 font-semibold cursor-pointer'
    >
      <input
        type='radio'
        name='answer'
        checked={selected}
        className='form-radio text-blue-500 lg:w-5 lg:h-5 mr-4  focus:ring-2 focus:ring-blue-500 focus:ring-opacity-5'
        readOnly
      />
      {text}
    </div>
  )
}

export default Answer
