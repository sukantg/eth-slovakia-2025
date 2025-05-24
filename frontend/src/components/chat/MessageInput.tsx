import React, { useState } from 'react';
import { Paperclip, Mic, Send, Camera, Image, Smile } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  
  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="bg-gray-100 border-t border-gray-200 p-2">
      {showAttachments && (
        <div className="grid grid-cols-3 gap-2 p-2 bg-white rounded-lg mb-2 animate-slide-up">
          <button className="flex flex-col items-center justify-center p-3 bg-purple-100 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
              <Camera size={20} />
            </div>
            <span className="text-xs mt-1">Camera</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-blue-100 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <Image size={20} />
            </div>
            <span className="text-xs mt-1">Photos</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-green-100 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
              <Paperclip size={20} />
            </div>
            <span className="text-xs mt-1">Files</span>
          </button>
        </div>
      )}
      
      <div className="flex items-center bg-white rounded-full border border-gray-300">
        <button 
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowAttachments(!showAttachments)}
        >
          <Smile size={22} />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="flex-1 py-2 px-3 bg-transparent outline-none text-gray-800"
        />
        
        <button 
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowAttachments(!showAttachments)}
        >
          <Paperclip size={22} />
        </button>
        
        {message.trim() ? (
          <button 
            className="bg-primary text-white p-2 rounded-full mx-1"
            onClick={handleSend}
          >
            <Send size={20} />
          </button>
        ) : (
          <button className="bg-primary text-white p-2 rounded-full mx-1">
            <Mic size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;