import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext<any>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chat, setChat] = useState<{ question: string; answer: string }[]>(() => {
    const saved = localStorage.getItem('justify_chat');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  // Persist chat in localStorage
  useEffect(() => {
    localStorage.setItem('justify_chat', JSON.stringify(chat));
  }, [chat]);

  return (
    <ChatContext.Provider value={{ chat, setChat, isLoading, setIsLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);