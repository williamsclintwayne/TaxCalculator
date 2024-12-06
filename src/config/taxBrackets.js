// South African Tax Brackets for 2024/2025 tax year
const taxBrackets = [
    {
        min: 0,
        max: 237100,
        rate: 18,
        baseAmount: 0
    },
    {
        min: 237101,
        max: 370500,
        rate: 26,
        baseAmount: 42678
    },
    {
        min: 370501,
        max: 512800,
        rate: 31,
        baseAmount: 77362
    },
    {
        min: 512801,
        max: 673000,
        rate: 36,
        baseAmount: 121475
    },
    {
        min: 673001,
        max: 857900,
        rate: 39,
        baseAmount: 179147
    },
    {
        min: 857901,
        max: 1817000,
        rate: 41,
        baseAmount: 251258
    },
    {
        min: 1817001,
        max: Infinity,
        rate: 45,
        baseAmount: 644489
    }
];

// Tax Rebates 2024/2025
const rebates = {
    primary: 17235,    // All qualifying taxpayers
    secondary: 9444,   // 65 years or older (additional)
    tertiary: 3145,    // 75 years or older (additional)
};

// Tax Thresholds 2024/2025
const thresholds = {
    below65: 95750,      // Below age 65
    age65to74: 148217,   // Age 65 to 74
    age75andOver: 165689 // Age 75 and over
};

// Medical Aid Credits 2024/2025 (per month)
const medicalCredits = {
    mainMember: 364,     // Main member
    firstDependent: 364, // First dependent
    otherDependents: 246 // Per additional dependent
};

// Retirement Fund Contribution Limits
const retirementLimits = {
    maxPercentage: 27.5,    // Maximum percentage of taxable income
    maxAnnualAmount: 350000 // Maximum annual amount
};

module.exports = {
    taxBrackets,
    rebates,
    thresholds,
    medicalCredits,
    retirementLimits
};
