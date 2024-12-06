import React, { useState } from 'react';
import TaxForm from './TaxForm';
import TaxResult from './TaxResult';
import AIAssistant from './AIAssistant';
import './styles.css';

function App() {
    const [taxResult, setTaxResult] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isAIOpen, setIsAIOpen] = useState(false);

    const calculateTax = async (formData) => {
        try {
            setIsCalculating(true);
            const response = await fetch('http://localhost:3000/api/tax/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setTaxResult(data);
        } catch (error) {
            console.error('Error calculating tax:', error);
        } finally {
            setIsCalculating(false);
        }
    };

    const toggleAI = () => {
        console.log('Toggling AI Assistant'); // Added log
        setIsAIOpen(!isAIOpen);
        document.body.classList.toggle('ai-panel-open');
    };

    return (
        <div className="app-wrapper">
            <main className={`main-content ${isAIOpen ? 'shifted' : ''}`}>
                <div className="app-container">
                    <h1>South African Tax Calculator 2024/2025</h1>
                    <div className="calculator-container">
                        <TaxForm onSubmit={calculateTax} disabled={isCalculating} />
                        {isCalculating && <div className="loading">Calculating...</div>}
                        {taxResult && <TaxResult result={taxResult} />}
                    </div>
                </div>
            </main>

            <button 
                className={`ai-toggle-button ${isAIOpen ? 'active' : ''}`}
                onClick={() => { console.log('Button clicked'); toggleAI(); }}
                aria-label="Toggle AI Assistant"
            >
                {isAIOpen ? (
                    <span className="close-icon">×</span>
                ) : (
                    <span className="ai-icon">AI</span>
                )}
            </button>

{isAIOpen && <div className="ai-panel"><AIAssistant className="open" /></div>}

            <footer className="app-footer">
                <p>
                    Note: This calculator uses the latest tax rates for the 2024/2025 tax year. 
                    For professional tax advice, please consult with a registered tax practitioner.
                </p>
            </footer>
        </div>
    );
}

export default App;
