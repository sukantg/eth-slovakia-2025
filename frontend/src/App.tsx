import React, { useState } from 'react';
import ChatList from './components/pages/ChatList';
import ChatView from './components/pages/ChatView';
import { WalletManager } from './components/WalletManager';
import { WhatsAppAuth } from './components/WhatsAppAuth';
import { chats, currentUser } from './data/mockData';

function App() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showChatList, setShowChatList] = useState(true);
  const [showWallet, setShowWallet] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  
  // Handle window resize for responsive design
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) {
        setShowChatList(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Effect to hide chat list when chat is selected on mobile
  React.useEffect(() => {
    if (isMobileView && selectedChatId) {
      setShowChatList(false);
    }
  }, [selectedChatId, isMobileView]);
  
  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };
  
  const handleBackClick = () => {
    if (isMobileView) {
      setShowChatList(true);
    }
  };

  const handleWalletCreated = () => {
    setShowWallet(false);
  };

  const handleAuthSuccess = (token: string) => {
    setAuthToken(token);
    setIsAuthenticated(true);
  };
  
  const selectedChat = selectedChatId ? chats.find(chat => chat.id === selectedChatId) : null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <WhatsAppAuth onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }
  
  return (
    <div className="flex h-full bg-gray-100">
      {/* Chat List */}
      <div 
        className={`${isMobileView ? 'w-full' : 'w-1/3 border-r'} bg-white h-full ${
          isMobileView && !showChatList ? 'hidden' : 'block'
        } animate-fade-in`}
      >
        <div className="p-4 border-b">
          <button
            onClick={() => setShowWallet(true)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Open Wallet
          </button>
        </div>
        <ChatList 
          chats={chats} 
          onChatSelect={handleChatSelect}
          selectedChatId={selectedChatId}
        />
      </div>
      
      {/* Chat View */}
      <div 
        className={`${isMobileView ? 'w-full' : 'w-2/3'} h-full ${
          isMobileView && showChatList ? 'hidden' : 'block'
        } animate-fade-in`}
      >
        {selectedChat ? (
          <ChatView 
            chat={selectedChat} 
            currentUser={currentUser}
            onBackClick={handleBackClick}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-4">
            <div className="w-64 h-64 rounded-full bg-gray-200 flex items-center justify-center mb-6">
              <img 
                src="https://images.pexels.com/photos/4145356/pexels-photo-4145356.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="WhatsApp" 
                className="w-40 h-40 object-cover opacity-50"
              />
            </div>
            <h2 className="text-2xl font-light text-gray-700 mb-2">WhatsApp Web</h2>
            <p className="text-center text-gray-500 max-w-md">
              Send and receive messages without keeping your phone online.
              Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
          </div>
        )}
      </div>

      {/* Wallet Modal */}
      {showWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Wallet</h2>
              <button
                onClick={() => setShowWallet(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <WalletManager onWalletCreated={handleWalletCreated} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;