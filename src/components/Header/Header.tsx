import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header className='css-bkcare z-[1001] m-auto h-[78px!important] w-full md:w-full bg-white pl-[15px] pr-[15px] md:w-[]768px] md:px-0  lg:h-[124px] lg:w-full lg:bg-[#EDFFFA] lg:pl-2.5 xl:mt-0 xl:h-[78px] xl:w-full xl:pl-5 xl:pr-0 2xl:w-auto 2xl:px-0'>
        {/* <div className='css-bkcare absolute left-[-20%] h-full w-0 bg-white md:w-[150%] lg:top-[-10%] lg:h-[110%] lg:bg-[#EDFFFA] xl:top-0 xl:h-full 2xl:left-[-70%] 2xl:w-[450%]' ></div> */}
        <div className='flex h-[78px] w-full  items-center justify-center lg:w-lg  lg:items-start lg:justify-normal xl:w-[1208px] xl:flex-row xl:items-center xl:self-center 2xl:self-auto'>
          <div className='flex items-center'>
            <button className=' cursor-pointer mr-2.5 mt-[5px!important] h-6 w-6 sm:h-[35px] sm:w-[35px]'>
              <svg width='100%' height='100%' viewBox='0 0 32 32' preserveAspectRatio='none' fill='#969495'>
                <path d='M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4m24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4m0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4'></path>
              </svg>
            </button>
            <Link
              to='/'
              className=' '
            ><img className='w-full h-full'  src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt="" /></Link>
          </div>
          <ul className=' ml-10  self-center hidden lg:flex'>
            <li className=''>
              <Link to='/' className=' text-xs font-bold flex-col flex'>
                Chuyên khoa <span className='mt-0.5 text-xs font-normal'>Tìm bác sĩ theo chuyên khoa</span>
              </Link>
            </li>
            <li className='ml-5'>
              <Link to='/' className=' text-xs font-bold flex-col flex'>
              Cơ sở y tế <span className='mt-0.5 text-xs font-normal'>Chọn bệnh viện phòng khám</span>
              </Link>
            </li>
            <li className='ml-5'>
              <Link to='/' className=' text-xs font-bold flex-col flex'>
              Bác sĩ <span className='mt-0.5 text-xs font-normal'>Chọn bác sĩ giỏi</span>
              </Link>
            </li>
            <li className='ml-5'>
              <Link to='/' className=' text-xs font-bold flex-col flex'>
              Gói khám <span className='mt-0.5 text-xs font-normal'>Khám sức khỏe tổng quát</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header
