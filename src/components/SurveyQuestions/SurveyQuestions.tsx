// Import các thư viện và component cần thiết
import React, { useState, useEffect } from 'react' // Import React và hai hooks useState và useEffect từ thư viện react
import axios from 'axios' // Import thư viện axios để thực hiện các request HTTP
import ProgressBar from './ProgressBar' // Import component ProgressBar
import Question from './Question' // Import component Question

// Định nghĩa interface cho dữ liệu câu hỏi
interface QuestionData {
  questionId: number // ID của câu hỏi
  question: string // Nội dung câu hỏi
  options: string[] // Các lựa chọn trả lời
  answers: number[] // Các câu trả lời
}

// Định nghĩa component SurveyQuestions
const SurveyQuestions: React.FC = () => {
  // Khởi tạo các state
  const [currentQuestion, setCurrentQuestion] = useState(0) // State cho câu hỏi hiện tại
  const [answers, setAnswers] = useState<number[]>([]) // State cho các câu trả lời
  const [totalScore, setTotalScore] = useState<number | null>(null) // State cho tổng điểm
  const [questionsData, setQuestionsData] = useState<QuestionData[]>([]) // State cho dữ liệu câu hỏi
  const [loading, setLoading] = useState(true) // State cho trạng thái loading
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null) // State cho câu trả lời đã chọn

  // Hook useEffect để fetch dữ liệu câu hỏi khi component được mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/questions') // Gửi request GET để lấy dữ liệu câu hỏi
        setQuestionsData(response.data) // Cập nhật state questionsData với dữ liệu câu hỏi nhận được
        setAnswers(new Array(response.data.length).fill(0)) // Khởi tạo mảng answers với độ dài bằng số lượng câu hỏi và mỗi phần tử đều là 0
        setLoading(false) // Đặt trạng thái loading thành false
      } catch (error) {
        console.error('Failed to fetch questions:', error) // In lỗi nếu có lỗi xảy ra khi fetch dữ liệu
        setLoading(false) // Đặt trạng thái loading thành false
      }
    }

    fetchQuestions() // Gọi hàm fetchQuestions
  }, [])

  // Hàm xử lý khi người dùng chọn một câu trả lời
  // const handleAnswer = (answerIndex: number) => {
  //   const updatedAnswers = [...answers] // Tạo một bản sao của mảng answers
  //   updatedAnswers[currentQuestion] = questionsData[currentQuestion].answers[answerIndex] // Cập nhật câu trả lời cho câu hỏi hiện tại
  //   setAnswers(updatedAnswers) // Cập nhật state answers
  // }
  // v2 dai hon
  const handleAnswer = (answerIndex: number) => {
    // Tạo một bản sao của mảng answers hiện tại
    const newAnswersArray = [...answers]

    // Lấy câu trả lời tương ứng với answerIndex từ câu hỏi hiện tại
    const selectedAnswer = questionsData[currentQuestion].answers[answerIndex]

    // Thay thế câu trả lời cho câu hỏi hiện tại trong mảng mới
    newAnswersArray[currentQuestion] = selectedAnswer

    // Cập nhật state answers với mảng mới
    setAnswers(newAnswersArray)
  }
  // Hàm điều hướng đến câu hỏi trước đó
  const navigateToPreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1) // Giảm currentQuestion đi 1

    setSelectedAnswer(answers[currentQuestion - 1]) // Cập nhật selectedAnswer với câu trả lời của câu hỏi trước đó
  }

  // Hàm điều hướng đến câu hỏi tiếp theo
  const navigateToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1 // Tính index của câu hỏi tiếp theo
    setCurrentQuestion(nextQuestion) // Cập nhật currentQuestion
    setSelectedAnswer(null) // Reset selectedAnswer

    // Nếu câu trả lời cho câu hỏi tiếp theo đã được chọn trước đó, sử dụng nó. Ngược lại, reset selectedAnswer.
    if (answers[nextQuestion] !== 0) {
      setSelectedAnswer(answers[nextQuestion])
    } else {
      setSelectedAnswer(null)
    }

    // Nếu câu hỏi tiếp theo vượt quá câu hỏi cuối cùng, tính toán điểm số.
    if (nextQuestion >= questionsData.length) {
      calculateScore()
    }
  }

  // Hàm khởi động lại bài khảo sát
  const restartSurvey = () => {
    setCurrentQuestion(0) // Reset currentQuestion về 0
    setAnswers(new Array(questionsData.length).fill(0)) // Reset mảng answers

    setTotalScore(null) // Reset totalScore
    setSelectedAnswer(null) // Reset selectedAnswer
  }

  // Hàm tính toán tổng điểm
  const calculateScore = () => {
    const score = answers.reduce((acc, curr) => acc + curr, 0) // Tính tổng các câu trả lời
    setTotalScore(score) // Cập nhật totalScore
  }

  // Hàm đánh giá mức độ trầm cảm dựa trên điểm số
  const evaluateDepressionLevel = (score: number) => {
    if (score < 14) return 'Không biểu hiện trầm cảm'
    if (score >= 14 && score <= 19) return 'Trầm cảm nhẹ'
    if (score >= 20 && score <= 29) return 'Trầm cảm vừa'
    return 'Trầm cảm nặng'
  }

  // Nếu đang trong trạng thái loading, hiển thị "Loading..."
  if (loading) return <div>Loading...</div>

  // Nếu đã có totalScore, hiển thị kết quả bài khảo sát
  if (totalScore !== null) {
    return (
      <div className='-md mx-auto my-6 w-9/12'>
        <h3 className='text-center text-2xl font-semibold'>Bạn đã hoàn thành Bài Test</h3>
        <div className='w-full h-72 bg-slate-50 rounded-sm mt-4 py-11 px-6 border-spacing-x-px shadow-xl'>
          <p className='font-medium'>Điểm Stress:</p>
          <p className='font-semibold text-center flex justify-center pt-12 text-6xl'>{totalScore}</p>

          <p className='pt-16 font-semibold'> Đánh giá Stress: {evaluateDepressionLevel(totalScore)}</p>
          <button
            className='bg-gray-500 text-white px-40 py-2 rounded hover:bg-gray-600 focus:outline-none mt-12 flex justify-center mx-auto'
            onClick={restartSurvey}
          >
            Làm lại
          </button>
        </div>
      </div>
    )
  }

  // Nếu chưa có totalScore, hiển thị câu hỏi và các nút điều hướng
  return (
    <div className='relative m-auto h-full w-full items-start px-1 md:w-md lg:w-lg xl:w-xl'>
      Trạng thái hoàn thành
      <ProgressBar current={currentQuestion} total={questionsData.length} />
      <Question
        data={questionsData[currentQuestion]}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <div className='sm:flex justify-end mt-10'>
        {currentQuestion >= 2 && (
          <button
            className='bg-[#28a745] font-semibold px-8 py-2   mx-1 md:mx-3 rounded hover:bg-gray-600 text-sm sm:text-base focus:outline-none'
            onClick={restartSurvey}
          >
            Bắt đầu lại
          </button>
        )}
        {currentQuestion > 0 && (
          <button
            className='bg-[#45bee5] font-semibold px-8 py-2 mx-1 md:mx-3 rounded text-sm sm:text-base focus:outline-none'
            onClick={navigateToPreviousQuestion}
          >
            Trước đó
          </button>
        )}
        {currentQuestion < questionsData.length && (
          <button
            className={`font-semibold px-8 py-2  mx-1 md:mx-3 rounded text-sm sm:text-base focus:outline-none ${
              selectedAnswer === null ? 'bg-gray-400' : 'bg-yellow-400'
            }`}
            onClick={navigateToNextQuestion}
            disabled={selectedAnswer === null}
          >
            Tiếp theo
          </button>
        )}
      </div>
    </div>
  )
}

export default SurveyQuestions
