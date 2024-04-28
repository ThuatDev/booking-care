/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import SurveyQuestions from '../SurveyQuestions/SurveyQuestions'

const Home = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [surveyStarted, setSurveyStarted] = useState(false) // State mới để theo dõi khi bắt đầu làm bài test

  const handleButtonClick = () => {
    setShowPopup(true) // Hiển thị popup khi click vào button
  }

  const handleStartSurvey = () => {
    setSurveyStarted(true) // Đánh dấu rằng bài test đã được bắt đầu
    setShowPopup(false) // Ẩn popup khi bắt đầu làm bài test
  }

  const handleOverlayClick = () => {
    setShowPopup(false) // Ẩn popup khi click ra ngoài
  }

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation() // Ngăn chặn sự kiện click từ phát sinh ra ngoài popup
  }

  return (
    <div className='mx-auto w-5/5 xl:w-4/5 px-3'>
      {!surveyStarted && (
        <>
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
          <div className='md:relative w-full  h-[200px] sm:h-[300px] md:h-[380px] '>
            <img
              className='md:absolute inset-0 w-full h-full object-cover block'
              src='https://cdn.bookingcare.vn/fo/w1920/2023/04/26/092230-3.png'
              alt=''
            />
          </div>
          <div className='py-5'>
            <p className=' pt-4 pb-2'>
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
              onClick={handleButtonClick}
              className='w-1/2 bg-yellow-400 text-white py-2 rounded-sm text-xl font-semibold outline-primary'
            >
              BẮT ĐẦU
            </button>
          </div>
        </>
      )}
      {showPopup && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'
          onClick={handleOverlayClick}
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        >
          <div
            className='fixed bottom-0 left-0 right-0 top-0 m-auto h-[285px] w-[90%] rounded-[10px] bg-white px-5 pt-2 md:h-[336px] md:w-[48%]'
            onClick={handlePopupClick}
          >
            <div className='absolute right-2 top-2 md:right-4 md:top-4'>
              <button onClick={() => setShowPopup(false)}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
                    fill='#312f2f'
                  />
                </svg>
              </button>
            </div>
            <div className='mt-4 md:mt-2 text-center text-22 font-bold text-black md:text-24 text-md'>
              Vui lòng cho biết lý do bạn làm bài test này
            </div>
            <div className='flex items-end'>
              <div className='flex flex-col justify-center mx-auto mt-4 w-[290px] border-1 border-[#62BAC3] rounded-3xl md:mt-9 md:w-[494px] '>
                <button
                  onClick={handleStartSurvey}
                  className='h-14 px-7 py-2 my-2 text-center text-sm font-medium text-black border taiwin hover:bg-[rgba(69,190,229,1)] hover:text-white md:px-0 rounded-2xl border-primary'
                >
                  Tình cờ biết đến bài test, muốn làm thử
                </button>
                <button
                  onClick={handleStartSurvey}
                  className='h-14 px-7 py-2 my-2 text-center text-sm font-medium text-black border taiwin hover:bg-[rgba(69,190,229,1)] hover:text-white md:px-0 rounded-2xl border-primary '
                >
                  Đang gặp vấn đề tâm lý, cần tìm giải pháp hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {surveyStarted && <SurveyQuestions />}
    </div>
  )
}

export default Home
