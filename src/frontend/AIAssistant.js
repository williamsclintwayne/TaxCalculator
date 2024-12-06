import React, { useState, useRef, useEffect } from 'react';
import './styles.css'; // Import the existing CSS
import './AIAssistantStyles.css'; // Import the existing CSS
import './AIResponseStyles.css'; // Import the new CSS for AI responses
import { togglePanel } from '../utils/panelManager'; // Import the togglePanel function
import { handleChatInput, loadStoredMessages } from '../utils/chatManager'; // Import the chat functions
import { parseResponse } from '../utils/responseParser'; // Import the parseResponse function

function AIAssistant() {
    const [messages, setMessages] = useState(() => loadStoredMessages());
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatWindowRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);

        // Add user message immediately
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

        try {
            const response = await fetch('http://SouthAfricanTaxCalculator.somee.com/api/ai/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userMessage })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Add AI response and persist to localStorage
            const aiMessage = { 
                type: 'assistant', 
                content: data.answer || 'I apologize, but I could not generate a response. Please try rephrasing your question.'
            };
            const updatedMessages = [...messages, aiMessage];
            setMessages(updatedMessages);
            try {
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
            } catch (error) {
                console.error('Error saving messages to localStorage:', error);
            }

        } catch (error) {
            console.error('Error getting AI response:', error); // Log the error here
            setMessages(prev => [...prev, {
                type: 'error',
                content: 'I encountered an error while processing your request. Please try again in a moment.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-assistant">
            <div className="chat-window" ref={chatWindowRef}>
                {messages.length === 0 && (
                    <div className="chat-welcome">
                        <p>Hello! I'm your AI Tax Assistant. How can I help you with your tax-related questions?</p>
                        <p>You can ask me about:</p>
                        <ul>
                            <li>Tax calculations and brackets</li>
                            <li>Medical aid credits</li>
                            <li>Retirement contributions</li>
                            <li>General tax advice</li>
                        </ul>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.type}`}>
                        <strong>{message.type === 'user' ? 'You' : 'Tax Assistant'}:</strong>
                        <div className="ai-response">
                            <div dangerouslySetInnerHTML={{ __html: parseResponse(message.content) }} />
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="loading">
                        Processing your question...
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a tax-related question..."
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="submit-button"
                >
                    {isLoading ? 'Processing...' : 'Ask'}
                </button>
            </form>
        </div>
    );
}

export default AIAssistant;
