import React from 'react'

interface Props {
  current: number
  total: number
}

const ProgressBar: React.FC<Props> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100

  // ProgressBar.tsx
  // ...existing code...

  return (
    <div className='w-full h-4 bg-gray-200 rounded-full'>
      <div
        className='h-full text-sm text-white text-center bg-[#56C5E7] rounded-full'
        style={{ width: `${progress}%` }}
      >
        {current + 1}/{total}
      </div>
    </div>
  )

  // ...existing code...
}

export default ProgressBar
