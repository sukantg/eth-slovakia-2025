import React from 'react';
import { CheckCheck } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { Chat, User } from '../../types';
import { formatTime } from '../../utils/dateUtils';

interface ChatListItemProps {
  chat: Chat;
  onClick: (chatId: string) => void;
  isActive: boolean;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onClick, isActive }) => {
  const participant = chat.participants[0];
  const lastMessage = chat.lastMessage;
  
  const handleClick = () => {
    onClick(chat.id);
  };
  
  return (
    <div 
      className={`flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
        isActive ? 'bg-gray-50' : ''
      }`}
      onClick={handleClick}
    >
      <Avatar 
        src={participant.avatar} 
        alt={participant.name}
        status={participant.status}
      />
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900 truncate">{participant.name}</h3>
          {lastMessage && (
            <span className="text-xs text-gray-500">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 truncate max-w-[220px]">
            {lastMessage && (
              <>
                {lastMessage.senderId === 'user-1' && (
                  <span className="inline-flex items-center mr-1">
                    <CheckCheck size={14} className={
                      lastMessage.status === 'read' ? 'text-primary' : 'text-gray-400'
                    } />
                  </span>
                )}
                {lastMessage.text}
              </>
            )}
          </p>
          
          {chat.unreadCount > 0 && (
            <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;