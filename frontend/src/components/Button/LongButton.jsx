import React from 'react'

function LongButton({title,styles,type,clickHandler}) {
  return (
    <button onClick={clickHandler} className={`w-[90%] px-12 py-2 bg-[#191818] text-white rounded-sm mx-auto ${styles}`} type={type}>{title}</button>
  )
}

export default LongButton
