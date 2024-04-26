import React, { useState } from 'react'

const Test = () => {
  const questions = [
    {
      question: 'Question 1',
      options: ['Option 1', 'Option 2', 'Option 3']
    },
    {
      question: 'Question 2',
      options: ['Option A', 'Option B', 'Option C']
    }
    // Add more questions here
  ]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)

  const handleNextQuestion = () => {
    if (isAnswerSelected && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption('')
      setIsAnswerSelected(false)
    }
  }

  const handleOptionChange = (option: any) => {
    setSelectedOption(option)
    setIsAnswerSelected(true)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  return (
    <div className='mx-auto w-4/5'>
      <div className='relative m-auto h-full w-full items-start px-1 md:w-md lg:w-lg xl:w-xl'>
        <p className='mb-2.5 text-sm font-bold mt-5'>Trạng thái hoàn thành</p>
        <div className='mb-7 h-auto w-full rounded-md bg-[#D9D9D9]'>
          <div className='text-sm text-white p-'>
            {currentQuestionIndex + 1}/{totalQuestions}
          </div>
        </div>
        <div className='pt-10 pl-16'>
          <div className='pb-16 font-bold'>{currentQuestion?.question}</div>
          {currentQuestion?.options.map((option, i) => (
            <div key={i}>
              <div className='flex items-center border-t-2 border-gray-300 py-2.5'>
                <input
                  className='w-5 h-5'
                  type='radio'
                  id={`option-${i}`}
                  name='option'
                  value={option}
                  checked={option === selectedOption}
                  onChange={() => handleOptionChange(option)}
                />
                <label htmlFor={`option-${i}`} className='font-bold text-base pl-3'>
                  {option}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-end mt-5 bg-white py-1 pb-1 border-t border-gray-300 pr-1'>
          <button
            className={`cursor-pointer flex h-11 rounded items-center justify-center ml-1 md:ml-4 flex-1 md:w-40 md:flex-none ${
              isAnswerSelected ? 'bg-[#d2d2d2]' : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected}
          >
            <div className='font-semibold text-base sm:text-base text-center '>Tiếp Theo</div>
          </button>
          <button
            className={`cursor-pointer flex h-11 rounded items-center justify-center ml-1 md:ml-4 flex-1 md:w-40 md:flex-none ${
              isAnswerSelected ? 'bg-[#d2d2d2]' : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected}
          >
            <div className='font-semibold text-base sm:text-base text-center '>Trước Đó </div>
          </button>
          <button
            className={`cursor-pointer flex h-11 rounded items-center justify-center ml-1 md:ml-4 flex-1 md:w-40 md:flex-none ${
              isAnswerSelected ? 'bg-[#d2d2d2]' : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected}
          >
            <div className='font-semibold text-base sm:text-base text-center '>Làm bài lại </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Test
