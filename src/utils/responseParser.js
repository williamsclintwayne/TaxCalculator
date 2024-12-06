export const parseResponse = (response) => {
    // Convert markdown-like syntax to HTML
    return response
        .replace(/### (.*?)\n/g, '<h3>$1</h3>') // Convert ### to <h3>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to <strong>
        .replace(/\n/g, '<br/>'); // Convert new lines to <br>
};
