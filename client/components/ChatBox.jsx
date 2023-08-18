import React from 'react'
import Message from './Message'
import { getUser } from '@/api/Session'

const ChatBox = ({messages}) => {
  const user = getUser();
  return (
    <div className='flex flex-col p-5'>
      {messages.map((message) => (
        <Message message={message} sender={user}/>
      ))}
    </div>
  )
}

export default ChatBox
