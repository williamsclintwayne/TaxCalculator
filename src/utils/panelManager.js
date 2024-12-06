export const togglePanel = (isPanelOpen, setIsPanelOpen) => {
    setIsPanelOpen(!isPanelOpen); // Toggle the panel visibility
};

export const addMessage = (messages, newMessage) => {
    return [...messages, newMessage]; // Add new message to the existing messages
};
