import React, { useState, useEffect } from "react";

import "./styles.css"

interface BoxMessageProps {
  text: string,
  seconds: number,
  visible: boolean
}

const BoxMessage: React.FC<BoxMessageProps> = ({text, seconds, visible}) => {
  const [ isDisplay, setIsDisplay ] = useState(visible)

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
