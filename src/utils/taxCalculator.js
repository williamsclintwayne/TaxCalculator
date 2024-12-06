const { taxBrackets, rebates, thresholds, medicalCredits, retirementLimits } = require('../config/taxBrackets');

class TaxCalculator {
    calculateTax(annualIncome, age, bonusSalary = 0, overtimeSalary = 0, hasMedicalAid = false, numberOfDependants = 0, medicalAid = 0, annuity = 0) {
        // Calculate total taxable income (including bonus and overtime)
        const totalIncome = annualIncome + bonusSalary + overtimeSalary;

        // Calculate age-based rebate
        let totalRebate = rebates.primary; // Everyone gets primary rebate
        if (age >= 65) {
            totalRebate += rebates.secondary;
        }
        if (age >= 75) {
            totalRebate += rebates.tertiary;
        }

        // Find applicable tax bracket
        const applicableBracket = taxBrackets.find(bracket => 
            totalIncome >= bracket.min && totalIncome <= bracket.max
        );

        if (!applicableBracket) {
            return { 
                tax: 0, 
                effectiveRate: 0,
                medicalAidCredits: 0,
                annuityDeduction: 0,
                totalRebate: totalRebate
            };
        }

        // Calculate initial tax based on the applicable bracket
        const initialTax = (totalIncome - applicableBracket.min) * (applicableBracket.rate / 100) + applicableBracket.baseAmount;

        // Calculate medical aid tax credits based on number of dependants
        let medicalAidCredits = 0;
        if (hasMedicalAid) {
            medicalAidCredits += medicalCredits.mainMember * 12; // Main member
            if (numberOfDependants >= 1) {
                medicalAidCredits += medicalCredits.firstDependent * 12; // First dependent
            }
            if (numberOfDependants > 1) {
                medicalAidCredits += (numberOfDependants - 1) * medicalCredits.otherDependents * 12; // Additional dependents
            }
        }

        // Calculate retirement annuity/pension fund contributions
        const maxAnnuityAmount = Math.max(retirementLimits.maxAnnualAmount, totalIncome * (retirementLimits.maxPercentage / 100));
        const annuityDeduction = Math.min(annuity, maxAnnuityAmount);

        // Apply tax rebates and credits
        const finalTax = Math.max(0, initialTax - totalRebate - medicalAidCredits);

        // Calculate effective tax rate
        const effectiveRate = (finalTax / totalIncome) * 100;

        return {
            tax: finalTax.toFixed(2),
            effectiveRate: effectiveRate.toFixed(2),
            medicalAidCredits: medicalAidCredits.toFixed(2),
            annuityDeduction: annuityDeduction.toFixed(2),
            totalRebate: totalRebate.toFixed(2)
        };
    }
}

module.exports = new TaxCalculator();
