const express = require('express');
const router = express.Router();

const PERPLEXITY_API_KEY = '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';

async function getAIResponse(query) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-small-128k-online",
                messages: [
                    {
                        role: "system",
                        content: "You are a South African tax expert. Provide accurate information about South African tax laws, calculations, and regulations for the 2024/2025 tax year. Use SARS and TaxTim as references. Be precise and concise."
                    },
                    {
                        role: "user",
                        content: query
                    }
                ],
                temperature: 0.2,
                top_p: 0.9,
                search_domain_filter: ["sars.gov.za", "taxtim.com"],
                return_images: false,
                return_related_questions: false,
                search_recency_filter: "month",
                frequency_penalty: 1
            })
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', options);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from API');
        }

        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling Perplexity AI:', error);
        throw error;
    }
}

router.post('/query', async (req, res) => {
    try {
        const { query } = req.body;
        
        if (!query) {
            return res.status(400).json({
                error: 'Please provide a query'
            });
        }

        const answer = await getAIResponse(query);
        const disclaimer = '\n\nPlease note: This information is based on the 2024/2025 tax year. For the most accurate and up-to-date information, please consult SARS directly or speak with a qualified tax practitioner.';

        res.json({
            answer: answer + disclaimer
        });
    } catch (error) {
        console.error('Route error:', error);
        res.status(500).json({
            error: 'An error occurred while processing your query. Please try again.'
        });
    }
});

module.exports = router;
