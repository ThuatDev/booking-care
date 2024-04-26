import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Question {
  question: string
  options: string[]
  answers: number[]
}

const Home = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [startTest, setStartTest] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState(Array(questions.length).fill(0))

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleStart = () => {
    togglePopup()
    setStartTest(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/questions')
        const data = await response.json()
        setQuestions(data)
        console.log('Questions:', data)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchData()
  }, [])

  const handleNextQuestion = () => {
    // Move to the next question if an answer is selected
    if (isAnswerSelected && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
      setIsAnswerSelected(false);
    } else if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true); // Hiển thị kết quả khi đạt đến cuối bài test
    }
  };

  const handlePreviousQuestion = () => {
    // Move to the previous question if not at the first question
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedOption('')
      setIsAnswerSelected(false)
    }
  }

  const handleRestart = () => {
    // Move back to the first question if not already there
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(0)
      setSelectedOption('')
      setIsAnswerSelected(false)
      setScores(Array(questions.length).fill(0)) // Reset điểm số khi restart
    }
  }

  const handleOptionChange = (option: string) => {
    // Update selected option
    setSelectedOption(option)
    setIsAnswerSelected(true) // Set isAnswerSelected to true when an option is selected

    // Tính điểm và cập nhật vào state
    const newScores = [...scores]
    const currentQuestion = questions[currentQuestionIndex] as Question // Đảm bảo kiểu dữ liệu của currentQuestion
    const answerIndex = currentQuestion.options.findIndex((opt: string) => opt === option)

    newScores[currentQuestionIndex] = currentQuestion.answers[answerIndex]
    setScores(newScores)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  // Tính tổng điểm
  const totalScore = scores.reduce((acc, score) => acc + score, 0)

  // Đánh giá mức độ trầm cảm dựa vào tổng điểm
  let depressionLevel
  if (totalScore < 14) {
    depressionLevel = 'Không biểu hiện trầm cảm'
  } else if (totalScore >= 14 && totalScore <= 19) {
    depressionLevel = 'Trầm cảm nhẹ'
  } else if (totalScore >= 20 && totalScore <= 29) {
    depressionLevel = 'Trầm cảm vừa'
  } else {
    depressionLevel = 'Trầm cảm nặng'
  }
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  return (
    <div className='mx-auto w-4/5'>
      {/* ẩn hết mọi item của header */}
      {!startTest && !showResult && (
        <div>
          <div className='flex flex-wrap items-center pb-3 whitespace-nowrap'>
            <a href='http://localhost:8080/' className='px-1 text-primary flex-shrink-0 text-xs'>
              #
            </a>
            <span className='text-primary flex-shrink-0'>/</span>
            <a href='http://localhost:8080/' className='px-1 text-primary flex-shrink-0 text-xs'>
              Link Text
            </a>
            <p className='overflow-hidden'>Bài Test đánh giá Lo âu - Trầm cảm - Stress (DASS 21)</p>
          </div>

          <div className='flex justify-between pb-9'>
            <h6 className='text-2xl font-semibold'>Bài Test đánh giá Lo âu - Trầm cảm - Stress (DASS 21)</h6>
          </div>
          <div className='md:relative w-full h-[200px] sm:h-[300px] md:h-[380px] '>
            <img
              className='md:absolute inset-0 w-full h-full object-cover block'
              src='https://cdn.bookingcare.vn/fo/w1920/2023/04/26/092230-3.png'
              alt=''
            />
          </div>
          <div className='py-5'>
            <p className='pt-4 pb-2'>
              <strong>Bài test (trắc nghiệm) DASS 21</strong> là thang đo&nbsp;(gồm 21 câu hỏi) giúp đánh giá mức độ rối
              loạn lo âu – trầm cảm - stress khá phổ biến hiện nay trong cộng đồng. Bài test này thường&nbsp;được sử
              dụng để đánh giá tình trạng tâm lý của những người gặp khó khăn trong cuộc sống, như mất việc làm, chấn
              thương, hoặc đối mặt với các tình huống khó khăn.
            </p>
            <p className='py-2'>Bài test nhằm mục đích:</p>
            <ul className='py-2 list-disc px-10'>
              <li>Tự đánh giá tình trạng Sức khoẻ tinh thần cá nhân.</li>
              <li>Dự đoán về Sức khoẻ tinh thần và có kế hoạch thăm khám phù hợp.</li>
              <li>Tổng hợp thông tin để thuận tiện khi thăm khám với Bác sĩ/Chuyên gia</li>
            </ul>
            <p className='py-2'>
              <strong>Nguyên tắc thực hiện bài test:</strong>
            </p>
            <p className='py-2'>
              Hãy đọc mỗi câu hỏi sau và chọn đáp án gần giống nhất với{' '}
              <strong>tình trạng mà bạn cảm thấy trong suốt một tuần qua</strong>. Không có câu trả lời đúng hay sai. Và
              đừng dừng lại quá lâu ở bất kỳ câu nào.
            </p>
            <p className='py-2'>
              <strong>Lưu ý:</strong>
            </p>
            <p className='py-2'>
              Kết quả bài test này chỉ mang tính chất tham khảo, không có giá trị thay thế chẩn đoán y khoa bởi bác
              sĩ/chuyên gia có chuyên môn.
            </p>
            <p className='py-2'>
              <strong>Nguồn tham khảo:</strong>
            </p>
            <p className='py-2'>
              <strong>
                <a href='http://localhost:8080/' className='text-primary'>
                  Viện Sức khỏe Tâm thần, Bệnh viện Bạch Mai
                </a>
              </strong>
            </p>
          </div>

          <div className='flex justify-center pt-2 pb-20'>
            <button
              onClick={togglePopup}
              className='w-1/2 bg-yellow-400 text-white py-2 rounded-sm text-xl font-semibold outline-primary'
            >
              BẮT ĐẦU
            </button>
          </div>
        </div>
      )}
      {/* hiện bài test  */}
      {startTest && !showResult && (
        <div className='m-auto h-full w-full items-start px-1 md:w-md lg:w-lg xl:w-xl'>
          <div className='relative m-auto h-full w-full items-start px-1 md:w-md lg:w-lg xl:w-xl'>
            <p className='mb-2.5 text-sm font-bold mt-5'>Trạng thái hoàn thành</p>
            <div className='mb-7 h-auto w-full rounded-md '>
              <div className='text-sm text-white p- bg-[#3d8de9] rounded-md' style={{ width: `${progress}%` }}>
                <p style={{ width: `${progress}%` }}>
                  {currentQuestionIndex + 1}/{totalQuestions}
                </p>
              </div>
            </div>
            <div className='mx-[-4px] mb-12.5 w-full pl-4 rounded-sm border border-solid border-[#ccc]'>
              {currentQuestion && ( // Kiểm tra currentQuestion trước khi sử dụng
                <div>
                  <div className='pb-16 font-bold pt-2 pb-4'>{currentQuestion.question}</div>
                  {currentQuestion &&
                    currentQuestion.options.map((option:never, i:any) => (
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
                          <label htmlFor={`option-${i}`} className='font-bold text-base pl-3 py-1'>
                            {option}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className='flex justify-end mt-5 bg-white py-1 pb-1 border-gray-300 pr-1'>
              {currentQuestionIndex > 1 && (
                <button
                  className='cursor-pointer flex h-11 rounded items-center justify-center ml-1 md:ml-4 flex-1 md:w-40 md:flex-none bg-[#28a745]'
                  onClick={handleRestart}
                >
                  Bắt Đầu Lại
                </button>
              )}
              {currentQuestionIndex > 1 && (
                <button
                  className='cursor-pointer flex h-11 rounded items-center justify-center ml-1 md:ml-4 flex-1 md:w-40 md:flex-none bg-[#45bee5]'
                  onClick={handlePreviousQuestion}
                >
                  Trước Đó
                </button>
              )}
              <button
                className='cursor-pointer flex h-11 rounded items-center justify-center ml-1 md:ml-4 flex-1 md:w-40 md:flex-none bg-[#f7d800]'
                onClick={() => handleNextQuestion()}
                disabled={!isAnswerSelected}
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Kết thúc' : 'Tiếp theo'}
              </button>
            </div>
          </div>
        </div>
      )}
      {currentQuestionIndex === totalQuestions - 1 && (
        <div className='mx-auto mb-2.5 w-full md:w-md md:px-4 lg:w-lg xl:w-xl'>
          <div className='mt-10'>
            <h2 className='text-center font-bold mb-5 mt-2.5 text-20 md:mb-10 md:mt-1.5 md:text-lg'>
              Bạn đã hoàn thành Bài Test
            </h2>
            <p>
              Tổng số điểm của bạn: <strong>{totalScore}</strong>
            </p>
            <p>
              Đánh giá mức độ: <strong>{depressionLevel}</strong>
            </p>
          </div>
        </div>
      )}
      {showPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
          <div className='fixed bottom-0 left-0 right-0 top-0 m-auto h-[285px] w-[90%] rounded-[10px] bg-white px-5 pt-2 md:h-[336px] md:w-[48%]'>
            <div className='absolute right-4 top-4'>
              <button onClick={togglePopup}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
                    fill='#312f2f'
                  />
                </svg>
              </button>
            </div>
            <div className='mt-2 text-center text-22 font-bold text-black md:text-24'>
              Vui lòng cho biết lý do bạn làm bài test này
            </div>
            <div className='flex items-end'>
              <div className='flex flex-col justify-center mx-auto mt-4 w-[290px] border-1 border-[#62BAC3] rounded-3xl md:mt-9 md:w-[494px] '>
                <button
                  onClick={handleStart}
                  className='h-14 px-7 py-2 my-2 text-center text-16 font-medium text-black border taiwin hover:bg-[rgba(69,190,229,1)] hover:text-white md:px-0 rounded-2xl border-primary'
                >
                  Tình cờ biết đến bài test, muốn làm thử
                </button>

                <button
                  onClick={handleStart}
                  className='h-14 px-7 py-2 my-2 text-center text-16 font-medium text-black border taiwin hover:bg-[rgba(69,190,229,1)] hover:text-white md:px-0 rounded-2xl border-primary '
                >
                  Đang gặp vấn đề tâm lý, cần tìm giải pháp hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* END  */}
    </div>
  )
}

export default Home
