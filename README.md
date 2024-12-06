# South African Tax Calculator

A comprehensive web application for calculating South African income tax for the 2024/2025 tax year. This application provides accurate tax calculations with support for various deductions, rebates, and an AI assistant for tax-related queries.

## Features

### 1. Tax Calculation
- Calculates income tax based on the latest South African tax brackets (2024/2025)
- Supports various income types:
  - Annual base salary
  - Bonus income
  - Overtime payments
- Handles age-based tax rebates:
  - Primary rebate (all qualifying taxpayers)
  - Secondary rebate (65 years or older)
  - Tertiary rebate (75 years or older)

### 2. Deductions and Credits
- Medical Aid Tax Credits
  - Main member and dependents
  - Automatic calculation based on number of dependents
- Retirement Fund Contributions
  - Supports pension and retirement annuity contributions
  - Automatically applies contribution limits (27.5% of taxable income or R350,000)

### 3. AI Tax Assistant
- Interactive AI assistant for tax-related queries
- Provides guidance on tax calculations
- Helps explain tax concepts and regulations

## Technical Stack

- Frontend: React.js
- Backend: Node.js with Express
- AI Integration: Perplexity API
- Styling: Modern CSS with responsive design

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd TaxCalculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
npm run frontend  # For frontend only
npm start        # For backend only
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000

## Usage Guide

### Basic Tax Calculation

1. Enter your annual income
2. Provide your age
3. Add any bonus or overtime income (if applicable)
4. Specify medical aid details (if applicable)
5. Enter retirement contributions (if applicable)
6. Submit to receive detailed tax calculation

### Understanding Results

The calculator provides:
- Total tax payable
- Effective tax rate
- Applicable rebates
- Medical aid credits
- Retirement contribution deductions

### Using the AI Assistant

1. Click on the AI Assistant panel
2. Type your tax-related question
3. Receive detailed explanations and guidance

## Tax Brackets (2024/2025)

| Taxable Income (R) | Rate |
|-------------------|------|
| 0 - 237,100 | 18% |
| 237,101 - 370,500 | 26% |
| 370,501 - 512,800 | 31% |
| 512,801 - 673,000 | 36% |
| 673,001 - 857,900 | 39% |
| 857,901 - 1,817,000 | 41% |
| 1,817,001 and above | 45% |

## Rebates (2024/2025)

- Primary: R17,235
- Secondary (65 years and older): R9,444
- Tertiary (75 years and older): R3,145

## Medical Credits (Monthly)

- Main Member: R364
- First Dependent: R364
- Additional Dependents: R246 each

## API Endpoints

### Tax Calculation
```
POST /api/tax/calculate
```
Request body:
```json
{
  "annualIncome": number,
  "age": number,
  "bonusSalary": number,
  "overtimeSalary": number,
  "hasMedicalAid": boolean,
  "numberOfDependants": number,
  "medicalAid": number,
  "annuity": number
}
```

### AI Assistant
```
POST /api/ai/query
```
Request body:
```json
{
  "query": "string"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
