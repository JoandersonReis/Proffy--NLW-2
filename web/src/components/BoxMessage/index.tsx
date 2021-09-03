import React, { useState, useEffect } from "react";

import "./styles.css"

interface BoxMessageProps {
  text: string,
  seconds: number,
}

const BoxMessage: React.FC<BoxMessageProps> = ({text, seconds}) => {
  const [ isDisplay, setIsDisplay ] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsDisplay(false)
    }, seconds * 1000)
  }, [])

  return (
    <div className={isDisplay? "box-message-container":"not-display"}>
      <p>{text}</p>
    </div>
  )
}


export default BoxMessage
