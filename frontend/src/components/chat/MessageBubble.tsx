import React from 'react';
import { CheckCheck, Check } from 'lucide-react';
import { Message } from '../../types';
import { formatTime } from '../../utils/dateUtils';

interface MessageBubbleProps {
  message: Message;
  isMine: boolean;
  showDate?: boolean;
  date?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isMine, 
  showDate = false,
  date
}) => {
  const renderMessageStatus = () => {
    switch (message.status) {
      case 'sent':
        return <Check size={14} className="text-gray-500" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-500" />;
      case 'read':
        return <CheckCheck size={14} className="text-primary" />;
      default:
        return null;
    }
  };

  const getBubbleClass = () => {
    if (isMine) {
      return message.isAlternate ? 'chat-bubble-sent-alt' : 'chat-bubble-sent';
    }
    return message.isAlternate ? 'chat-bubble-received-alt' : 'chat-bubble-received';
  };

  return (
    <>
      {showDate && date && (
        <div className="flex justify-center my-4">
          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
            {date}
          </span>
        </div>
      )}
      <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2 animate-fade-in`}>
        <div className={getBubbleClass()}>
          <p className="text-[15px] text-gray-800">{message.text}</p>
          <div className="flex items-center justify-end space-x-1 mt-1">
            <span className="text-[11px] text-gray-500">
              {formatTime(message.timestamp)}
            </span>
            {isMine && (
              <span className="ml-1">
                {renderMessageStatus()}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBubble;