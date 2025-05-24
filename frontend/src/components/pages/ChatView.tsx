import React, { useState, useRef, useEffect } from 'react';
import Header from '../ui/Header';
import MessageBubble from '../chat/MessageBubble';
import MessageInput from '../chat/MessageInput';
import { Chat, User, Message } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { getNextMessage } from '../../data/mockData';

interface ChatViewProps {
  chat: Chat;
  currentUser: User;
  onBackClick: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ chat, currentUser, onBackClick }) => {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [messageIndex, setMessageIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIntervalRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    scrollToBottom();
    
    // Start generating mock messages
    messageIntervalRef.current = setInterval(() => {
      const newMessage = getNextMessage(chat.id, messageIndex);
      if (newMessage) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessageIndex(prev => prev + 1);
      }
    }, 1000);
    
    return () => {
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
      }
    };
  }, [chat.id, messageIndex]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${chat.id}-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  const shouldShowDate = (currentMsg: Message, prevMsg: Message | null) => {
    if (!prevMsg) return true;
    
    const currentDate = new Date(currentMsg.timestamp).toDateString();
    const prevDate = new Date(prevMsg.timestamp).toDateString();
    
    return currentDate !== prevDate;
  };
  
  const getMessageDate = (timestamp: string) => {
    return formatDate(timestamp);
  };
  
  return (
    <div className="flex flex-col h-full">
      <Header 
        type="chat"
        user={chat.participants[0]}
        onBackClick={onBackClick}
        onCallClick={() => console.log('Call clicked')}
        onVideoClick={() => console.log('Video clicked')}
        onMoreClick={() => console.log('More clicked')}
      />
      
      <div 
        className="flex-1 overflow-y-auto p-3"
        style={{ backgroundImage: 'linear-gradient(rgba(229, 221, 213, 0.9), rgba(229, 221, 213, 0.9))' }}
      >
        {messages.map((message, index) => {
          const prevMessage = index > 0 ? messages[index - 1] : null;
          const showDate = shouldShowDate(message, prevMessage);
          
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isMine={message.senderId === currentUser.id}
              showDate={showDate}
              date={showDate ? getMessageDate(message.timestamp) : undefined}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatView;