import React, { useState, useEffect, useRef } from 'react';
import { API_ENDPOINTS } from '../config/api';
import './StoryInterviewModal.css';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface StoryInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt: string;
}

export function StoryInterviewModal({ isOpen, onClose, initialPrompt }: StoryInterviewModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialPrompt) {
      startInterview(initialPrompt);
    } else {
      setMessages([]);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.STORY_START, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessages([{ role: 'model', content: data.message }]);
      }
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const updatedHistory = [...messages, { role: 'user', content: userMsg } as Message];
    setMessages(updatedHistory);
    
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.STORY_MESSAGE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          chat_history: messages
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessages([...updatedHistory, { role: 'model', content: data.message }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="story-modal-overlay">
      <div className="story-modal-content">
        <div className="story-modal-header">
          <div className="keeper-info">
            <span className="keeper-icon">📜</span>
            <div>
              <h3>Keeper of Tales</h3>
              <p>AI Heritage Storyteller</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="story-chat-window" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="chat-bubble model loading">...</div>}
        </div>

        <form className="story-input-area" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell your story..."
            autoFocus
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
