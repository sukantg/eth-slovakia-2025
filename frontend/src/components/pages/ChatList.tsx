import React, { useState } from 'react';
import { MessageSquare, Users, Phone, Settings } from 'lucide-react';
import Header from '../ui/Header';
import ChatListItem from '../chat/ChatListItem';
import { Chat } from '../../types';

interface ChatListProps {
  chats: Chat[];
  onChatSelect: (chatId: string) => void;
  selectedChatId: string | null;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect, selectedChatId }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'status' | 'calls'>('chats');
  
  return (
    <div className="flex flex-col h-full">
      <Header 
        type="main"
        onSearchClick={() => console.log('Search clicked')}
        onMoreClick={() => console.log('More clicked')}
      />
      
      <div className="bg-primary text-white flex items-center justify-around">
        <button
          className={`flex-1 py-3 flex flex-col items-center ${
            activeTab === 'chats' ? 'border-b-2 border-white' : 'opacity-80'
          }`}
          onClick={() => setActiveTab('chats')}
        >
          <MessageSquare size={20} />
          <span className="text-xs mt-1">Chats</span>
        </button>
        <button
          className={`flex-1 py-3 flex flex-col items-center ${
            activeTab === 'status' ? 'border-b-2 border-white' : 'opacity-80'
          }`}
          onClick={() => setActiveTab('status')}
        >
          <Users size={20} />
          <span className="text-xs mt-1">Status</span>
        </button>
        <button
          className={`flex-1 py-3 flex flex-col items-center ${
            activeTab === 'calls' ? 'border-b-2 border-white' : 'opacity-80'
          }`}
          onClick={() => setActiveTab('calls')}
        >
          <Phone size={20} />
          <span className="text-xs mt-1">Calls</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-white">
        {activeTab === 'chats' && (
          <div>
            {chats.map((chat) => (
              <ChatListItem 
                key={chat.id}
                chat={chat}
                onClick={onChatSelect}
                isActive={chat.id === selectedChatId}
              />
            ))}
          </div>
        )}
        
        {activeTab === 'status' && (
          <div className="p-4 flex flex-col items-center justify-center h-full text-gray-500">
            <Users size={40} />
            <p className="mt-2 text-center">Status updates from your contacts will appear here</p>
          </div>
        )}
        
        {activeTab === 'calls' && (
          <div className="p-4 flex flex-col items-center justify-center h-full text-gray-500">
            <Phone size={40} />
            <p className="mt-2 text-center">Recent calls will appear here</p>
          </div>
        )}
      </div>
      
      <div className="bg-gray-100 p-4 flex justify-center">
        <button className="bg-primary text-white p-3 rounded-full shadow-lg">
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatList;