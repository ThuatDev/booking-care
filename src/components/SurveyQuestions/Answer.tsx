import React from 'react'

interface Props {
  text: string
  index: number
  selected: boolean
  onChange: (index: number) => void
}

const Answer: React.FC<Props> = ({ text, index, selected, onChange }) => {
  const handleClick = () => {
    if (!selected) {
      onChange(index)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !selected) {
      onChange(index)
    }
  }

  return (
    <div onClick={handleClick} onKeyDown={handleKeyPress} role='button' tabIndex={0}>
      <input type='radio' name='answer' checked={selected} className='form-radio text-blue-500 w-5 h-5' readOnly />
      {text}
    </div>
  )
}

export default Answer
