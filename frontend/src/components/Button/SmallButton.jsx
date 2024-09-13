import React from 'react'

export default function SmallButton({title,styles,type,clickHandler}) {
  return (
    <button onClick={clickHandler} className={`w-fit px-12 py-2 bg-[#191818] text-white rounded-sm mx-auto ${styles}`} type={type}>{title}</button>
  )
}

