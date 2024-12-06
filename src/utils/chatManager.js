export const handleChatInput = (messages, setMessages, userMessage) => {
    const updatedMessages = [...messages, { type: 'user', content: userMessage }];
    setMessages(updatedMessages);
    try {
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    } catch (error) {
        console.error('Error saving messages to localStorage:', error);
    }
};

export const loadStoredMessages = () => {
    try {
        const storedMessages = localStorage.getItem('chatMessages');
        return storedMessages ? JSON.parse(storedMessages) : [];
    } catch (error) {
        console.error('Error loading messages from localStorage:', error);
        return [];
    }
};
