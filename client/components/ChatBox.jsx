import React from 'react'
import Message from './Message'
import { getUser } from '@/api/Session'

const ChatBox = ({messages}) => {
  const user = getUser();
  return (
    <div className='flex flex-col p-5'>
      {messages.map((message, i) => (
        <Message message={message} sender={user} key = {i}/>
      ))}
    </div>
  )
}

export default ChatBox
