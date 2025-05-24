import React from 'react';
import { ArrowLeft, MoreVertical, Phone, Video, Search } from 'lucide-react';
import Avatar from './Avatar';
import { User } from '../../types';
import { getLastSeen } from '../../utils/dateUtils';

interface HeaderProps {
  type: 'main' | 'chat' | 'settings';
  title?: string;
  subtitle?: string;
  user?: User;
  onBackClick?: () => void;
  onSearchClick?: () => void;
  onCallClick?: () => void;
  onVideoClick?: () => void;
  onMoreClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  type,
  title,
  subtitle,
  user,
  onBackClick,
  onSearchClick,
  onCallClick,
  onVideoClick,
  onMoreClick
}) => {
  return (
    <header className="bg-primary text-white z-10 sticky top-0">
      <div className="flex items-center p-2 h-16">
        {type === 'main' && (
          <>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">WhatsApp</h1>
            </div>
            <div className="flex space-x-4">
              <button 
                className="p-2 rounded-full hover:bg-white/10 transition" 
                onClick={onSearchClick}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-white/10 transition" 
                onClick={onMoreClick}
                aria-label="More options"
              >
                <MoreVertical size={20} />
              </button>
            </div>
          </>
        )}
        
        {type === 'chat' && user && (
          <>
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition mr-2" 
              onClick={onBackClick}
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center flex-1" onClick={onMoreClick}>
              <Avatar 
                src={user.avatar} 
                alt={user.name} 
                size="md"
                status={user.status}
              />
              <div className="ml-3">
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-xs text-gray-200">
                  {user.status === 'online' ? 'online' : getLastSeen(user.lastSeen)}
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <button 
                className="p-2 rounded-full hover:bg-white/10 transition" 
                onClick={onVideoClick}
                aria-label="Video call"
              >
                <Video size={20} />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-white/10 transition" 
                onClick={onCallClick}
                aria-label="Voice call"
              >
                <Phone size={20} />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-white/10 transition" 
                onClick={onMoreClick}
                aria-label="More options"
              >
                <MoreVertical size={20} />
              </button>
            </div>
          </>
        )}
        
        {type === 'settings' && (
          <>
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition mr-2" 
              onClick={onBackClick}
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{title}</h1>
              {subtitle && <p className="text-xs text-gray-200">{subtitle}</p>}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;