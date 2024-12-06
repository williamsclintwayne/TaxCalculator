const express = require('express');
const router = express.Router();
const taxCalculator = require('../utils/taxCalculator');

router.post('/calculate', (req, res) => {
    try {
        const { annualIncome, age, bonusSalary, overtimeSalary, medicalAid, annuity } = req.body;

        // Input validation
        if (!annualIncome || !age) {
            return res.status(400).json({
                error: 'Both annual income and age are required'
            });
        }

        if (isNaN(annualIncome) || isNaN(age)) {
            return res.status(400).json({
                error: 'Annual income and age must be numbers'
            });
        }

        if (annualIncome < 0) {
            return res.status(400).json({
                error: 'Annual income cannot be negative'
            });
        }

        if (age < 18 || age > 120) {
            return res.status(400).json({
                error: 'Age must be between 18 and 120'
            });
        }

        // Convert values to numbers and default to 0 if undefined
        const parsedBonusSalary = Number(bonusSalary) || 0;
        const parsedOvertimeSalary = Number(overtimeSalary) || 0;
        const parsedMedicalAid = Number(medicalAid) || 0;
        const parsedAnnuity = Number(annuity) || 0;

        console.log('Calculating tax with values:', {
            annualIncome: Number(annualIncome),
            age: Number(age),
            bonusSalary: parsedBonusSalary,
            overtimeSalary: parsedOvertimeSalary,
            medicalAid: parsedMedicalAid,
            annuity: parsedAnnuity
        });

        const result = taxCalculator.calculateTax(
            Number(annualIncome),
            Number(age),
            parsedBonusSalary,
            parsedOvertimeSalary,
            parsedMedicalAid,
            parsedAnnuity
        );
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message || 'An error occurred while calculating tax'
        });
    }
});

module.exports = router;
