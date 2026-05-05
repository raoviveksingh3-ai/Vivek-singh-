import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Mic } from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIChat({ currentLang }: { currentLang: Language }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: currentLang === 'kn' 
        ? "ನಮಸ್ಕಾರ! ನಾನು ಜೇನು ಮೈತ್ರಿ. ಜೇನುತುಪ್ಪದ ಶ್ರೇಣೀಕರಣ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆ, ಅಥವಾ ಸುಸ್ಥಿರ ಕೊಯ್ಲು ವಿಧಾನಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ ಕೇಳಿ." 
        : "Hello! I am Jenu Maitri (Honey Friend). Ask me any questions about honey grading, market prices, or sustainable harvesting practices."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // We keep a reference to the chat session
  const chatRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the chat session with instructions
    const systemInstruction = 
      "You are 'Jenu Maitri' (Honey Friend), an AI assistant for the Jenu-Gumpu honey producers' collective in India. " +
      "Answer questions about sustainable honey harvesting, moisture grading, floral sources (wildflower, coffee blossom), and local market prices. " +
      "Be helpful, respectful of tribal traditions, and encourage cooperative selling. Keep responses brief and practical. " +
      "If the user speaks or asks in Kannada, respond in Kannada.";

    chatRef.current = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: { 
        systemInstruction,
        temperature: 0.7 
      }
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading || !chatRef.current) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      const responseText = response.text || "I'm sorry, I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: currentLang === 'kn' ? "ಕ್ಷಮಿಸಿ, ದೋಷ ಉಂಟಾಗಿದೆ." : "Sorry, an error occurred. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] sm:h-[650px]">
      <div className="flex items-center space-x-2 text-amber-800 ml-1 mb-4">
        <Bot className="text-amber-600" size={24} />
        <div>
          <h2 className="font-semibold text-lg leading-tight">{t(currentLang, 'expertChatTitle')}</h2>
          <p className="text-xs text-gray-500">{t(currentLang, 'expertChatSubtitle')}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
              <div className={`flex-shrink-0 mb-1 ${msg.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                {msg.role === 'user' 
                  ? <div className="bg-amber-600 rounded-full p-1.5"><User size={14} className="text-white" /></div>
                  : <div className="bg-amber-100 rounded-full p-1.5"><Bot size={14} className="text-amber-700" /></div>
                }
              </div>
              <div 
                className={`p-3 rounded-2xl text-sm 
                  ${msg.role === 'user' 
                    ? 'bg-amber-600 text-white rounded-br-sm' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm markdown-body'
                  }`}
              >
                {msg.role === 'user' ? (
                  msg.text
                ) : (
                  <Markdown>{msg.text}</Markdown>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="flex justify-start"
          >
            <div className="flex items-end max-w-[85%]">
              <div className="bg-amber-100 rounded-full p-1.5 mr-2 mb-1">
                <Bot size={14} className="text-amber-700" />
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm flex items-center space-x-2">
                <Loader2 size={16} className="text-amber-600 animate-spin" />
                <span className="text-xs text-gray-500">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="relative flex items-center space-x-2">
        <button 
          title={t(currentLang, 'voiceAssistant')}
          type="button" 
          className="bg-amber-100 text-amber-600 p-3.5 rounded-full hover:bg-amber-200 transition-colors shadow-sm flex-shrink-0"
        >
          <Mic size={20} />
        </button>
        <div className="relative flex-1">
          <input 
            type="text" 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={t(currentLang, 'typeMessage')}
            className="w-full bg-white border border-gray-200 rounded-full py-3.5 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-amber-600 text-white rounded-full p-2.5 hover:bg-amber-700 disabled:opacity-50 transition-colors flex items-center justify-center shadow-md w-10"
          >
            <Send size={16} className="ml-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
