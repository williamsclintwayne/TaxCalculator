import React from 'react';

function TaxResult({ result }) {
    return (
        <div className="tax-result">
            <h2>Tax Calculation Result</h2>
            <div className="result-details">
                <div className="result-section">
                    <h3>Tax Summary</h3>
                    <p><strong>Annual Tax:</strong> R{result.tax}</p>
                    <p><strong>Monthly Tax:</strong> <strong>R {(Number(result.tax) / 12).toFixed(2)}</strong></p>
                    <p><strong>Effective Tax Rate:</strong> {result.effectiveRate}%</p>
                </div>

                <div className="result-section">
                    <h3>Tax Credits and Rebates</h3>
                    <p><strong>Tax Rebates:</strong> R{result.totalRebate}</p>
                    <p><strong>Medical Aid Credits:</strong> R{result.medicalAidCredits}</p>
                </div>

                <div className="result-note">
                    <p><em>Note: These calculations are based on the 2024/2025 tax year rates and thresholds.</em></p>
                </div>
            </div>
        </div>
    );
}

export default TaxResult;
