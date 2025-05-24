import { User, Chat, Message } from '../types';
import { formatDistanceToNow } from '../utils/dateUtils';

// Mock Users
export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
  status: 'online',
  about: 'Available'
};

export const contacts: User[] = [
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
    lastSeen: new Date().toISOString(),
    about: 'At work'
  },
  {
    id: 'user-3',
    name: 'Mike Williams',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
    about: 'Busy'
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
    lastSeen: new Date().toISOString(),
    about: 'Hello there!'
  },
  {
    id: 'user-5',
    name: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'offline',
    lastSeen: new Date(Date.now() - 7200000).toISOString(),
    about: 'At the movies'
  },
  {
    id: 'user-6',
    name: 'Family Group',
    avatar: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
    lastSeen: new Date().toISOString(),
    about: 'Family matters'
  },
  {
    id: 'user-7',
    name: 'WhatSwap',
    avatar: 'https://ik.imagekit.io/xkrf3df2c/photo_5877260113323083489_y.jpg?',
    status: 'online',
    lastSeen: new Date().toISOString(),
    about: 'Work discussions'
  }
];

// Mock message sequences for each chat
const mockMessageSequences: Record<string, string[][]> = {
  'chat-1': [ // Sarah
    ['hi wallet'],
    ['Welcome to Whatswap! Tap "Create Wallet" to get started.'],
    ["Here's your one-time code — reply with it: 643 912"],
    ['643 912'],
    ['✅ Wallet created. Balance 0 USDC. Add funds anytime 👉 whatswap.app/topup'],
    ['🎉 Deposit confirmed. Balance 25 USDC.'],
    ['send 20 usdc to +447700900000'],
    ['✅ Sent! Tx 0xabc…321 Your balance: 5 USDC'],
    ['💸 +1 sent you 20 USDC — claim here 👉 whatswap.app/claim'],
    ['hi'],
    ['Hi there! Reply with your code to finish setup.'],
    ['981 004'],
    ['🚀 Wallet ready. Claim 20 USDC now?'],
    ['✅ 20 USDC claimed. Balance 20 USDC.']
  ],
  'chat-3': [ // Mike
    ['hi wallet'],
    ['Welcome back, balance: 0 USDC. Need funds? 👉 whatswap.app/topup'],
    ['🎉 +40 USDC landed.'],
    ['send 30 usdc to +447700123456'],
    ['send 30 USDC to +44 7700 123 456?'],
    ['✅ Paid! Tx 0xbee…222 Balance: 10 USDC'],
    ['💸 Lisa just paid you back 30 USDC — claim here 👉 whatswap.app/claim']
  ],
  'chat-4': [ // Emily
    ["hi wallet, I'm new"],
    ['Tap "Create Wallet" to begin.'],
    ['444 555'],
    ['✅ Wallet ready. Balance 0. Load funds at whatswap.app/topup'],
    ['Balance 12 USDC 🍔'],
    ['send 6 to +15559876543'],
    ['Approve 6 USDC to +1 555 987 6543?'],
    ['✅ Sent! Bal 6 USDC.'],
    ['🍕 Alex covered lunch & sent 6 USDC — grab it 👉 whatswap.app/claim']
  ],
  'chat-6': [ // Family Group
    ['hi wallet'],
    ['Balance: 18 USDC — happy to help 🎉'],
    ['send 15 usdc to +491760987654'],
    ['Confirm 15 USDC to +49 176 098 7654?'],
    ['🎁 Gift on the way! Tx 0xaaa…777 Bal 3 USDC'],
    ['🎂 Surprise! You got 15 USDC birthday money. Claim 👉 whatswap.app/claim'],
    ['888 999'],
    ['Wallet created ➡️ claiming 15 USDC now…'],
    ['✅ Claimed! Enjoy your day 🥳']
  ],
  'chat-7': [ // WhatSwap
    ['request 10 usdc from +447700555888'],
    ['🔔 Jamie requests 10 USDC. Pay? Yes / No'],
    ['yes'],
    ['Balance check… ✅ You have 12 USDC. Sending 10…'],
    ['✅ Paid! Tx 0xabc…909 Your balance: 2 USDC'],
    ['✅ Jamie, you received 10 USDC from Sam']
  ]
};

// Generate initial messages
const generateInitialMessages = (chatId: string, participants: User[]): Message[] => {
  return [];
};

// Generate mock chats
export const chats: Chat[] = contacts.map((contact, index) => {
  const participants = [contact];
  const messages = generateInitialMessages(`chat-${index + 1}`, participants);
  const lastMessage = messages[messages.length - 1];
  
  return {
    id: `chat-${index + 1}`,
    participants,
    messages,
    unreadCount: index === 0 ? 2 : (index === 1 ? 1 : 0),
    lastMessage,
    isGroup: index > 4
  };
});

// Helper function to get next message for a chat
export const getNextMessage = (chatId: string, currentIndex: number): Message | null => {
  const sequence = mockMessageSequences[chatId];
  if (!sequence || currentIndex >= sequence.length) {
    return null;
  }

  const isBot = currentIndex % 2 === 1; // Every other message is from the bot
  return {
    id: `msg-${chatId}-${Date.now()}`,
    senderId: isBot ? contacts.find(c => c.id === 'user-7')?.id || 'bot' : currentUser.id,
    text: sequence[currentIndex][0],
    timestamp: new Date().toISOString(),
    status: 'sent',
    isAlternate: currentIndex % 4 >= 2 // Alternate between two colors every two messages
  };
};