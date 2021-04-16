import React, { forwardRef, useImperativeHandle, useState } from "react"
import ReactDOM from "react-dom"
import styles from './index.module.scss'

export type Message = {
  id: number;
  text: string;
  duration: number;
}

export type MessageContainerRef = {
  add: (text: string, duration: number) => void;
}

const MessageContainer = forwardRef((_: {}, ref: React.Ref<MessageContainerRef>) => {
  const [messages, setMessages] = useState<Array<Message>>([])
  useImperativeHandle(ref, () => ({
    add: (text: string, duration: number) => {
      const id = Math.random()
      setMessages(messages => [...messages, { id, text, duration }])
      setTimeout(() => {
        setMessages(messages => messages.filter(message => message.id !== id))
      }, duration)
    }
  }))
  return (
    <>
      {messages.map(message => (
        <div key={message.id} className={styles.message} style={{ '--delay': (message.duration / 1000 - 0.2) + 's' } as React.CSSProperties}>{ message.text }</div>
      ))}
    </>
  )
})

const ref = React.createRef<MessageContainerRef>()

function install () {
  const messageContainer = document.createElement('div')
  messageContainer.classList.add(styles.whole)
  document.body.append(messageContainer)
  ReactDOM.render(<MessageContainer ref={ref} />, messageContainer)
}

let _message = (text: string, duration: number) => {
  install()
  _message = (text: string, duration: number) => {
    ref.current?.add(text, duration)
  }
  _message(text, duration)
}

function message (text: string, duration = 3000) {
  _message(text, duration)
}

export default message
