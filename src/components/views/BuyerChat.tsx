import React, { useState } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { Send, User, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  role: 'buyer' | 'seller';
  text: string;
}

export default function BuyerChat({ currentLang }: { currentLang: Language }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'buyer', text: 'Hello, I saw your latest batch of Coorg Forest Edge honey. Is it still available?' },
    { role: 'seller', text: 'Yes, we have 45kg available from the recent harvest.' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { role: 'seller', text: inputText.trim() }]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] sm:h-[650px]">
      <div className="flex items-center space-x-2 text-gray-800 ml-1 mb-4">
        <MessageSquare className="text-blue-500" size={24} />
        <div>
          <h2 className="font-semibold text-lg leading-tight">{t(currentLang, 'buyerChat')}</h2>
          <p className="text-xs text-gray-500">Bangalore Organics Ltd.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'seller' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm 
                ${msg.role === 'seller' 
                  ? 'bg-amber-600 text-white rounded-br-sm' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSend} className="relative">
        <input 
          type="text" 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Type message..."
          className="w-full bg-white border border-gray-200 rounded-full py-3.5 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button 
          type="submit"
          className="absolute right-1.5 top-1.5 bottom-1.5 bg-amber-600 text-white rounded-full p-2.5 hover:bg-amber-700 transition-colors flex items-center justify-center shadow-md w-10"
        >
          <Send size={16} className="ml-0.5" />
        </button>
      </form>
    </div>
  );
}
