import React, { useState } from 'react';

function TaxForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        annualIncome: '',
        age: '',
        bonusSalary: '',
        overtimeSalary: '',
        hasMedicalAid: false,
        numberOfDependants: '',
        medicalAid: '',
        annuity: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value.replace(/,/g, '.');
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        const submittedData = {
            annualIncome: parseFloat(formData.annualIncome) || 0,
            age: Number(formData.age) || 0,
            bonusSalary: Number(formData.bonusSalary) || 0,
            overtimeSalary: Number(formData.overtimeSalary) || 0,
            hasMedicalAid: formData.hasMedicalAid,
            numberOfDependants: Number(formData.numberOfDependants) || 0,
            medicalAid: Number(formData.medicalAid) || 0,
            annuity: Number(formData.annuity) * 12 || 0 // Convert monthly to annual
        };
        console.log('Parsed Data:', submittedData);
        onSubmit(submittedData);
    };

    return (
        <form onSubmit={handleSubmit} className="tax-form">
            <div className="form-group">
                <label htmlFor="annualIncome">Annual Income (R)</label>
                <input
                    type="text"
                    id="annualIncome"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="Enter your annual income"
                />
            </div>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="0"
                    max="120"
                    placeholder="Enter your age"
                />
            </div>
            <div className="form-group">
                <label htmlFor="bonusSalary">Bonus Salary (R)</label>
                <input
                    type="number"
                    id="bonusSalary"
                    name="bonusSalary"
                    value={formData.bonusSalary}
                    onChange={handleChange}
                    placeholder="Enter your bonus salary"
                />
            </div>
            <div className="form-group">
                <label htmlFor="overtimeSalary">Overtime Salary (R)</label>
                <input
                    type="number"
                    id="overtimeSalary"
                    name="overtimeSalary"
                    value={formData.overtimeSalary}
                    onChange={handleChange}
                    placeholder="Enter your overtime salary"
                />
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="hasMedicalAid"
                        checked={formData.hasMedicalAid}
                        onChange={handleChange}
                    />
                    Do you have Medical Aid?
                </label>
            </div>
            {formData.hasMedicalAid && (
                <>
                    <div className="form-group">
                        <label htmlFor="numberOfDependants">Number of Dependants (excluding self)</label>
                        <input
                            type="number"
                            id="numberOfDependants"
                            name="numberOfDependants"
                            value={formData.numberOfDependants}
                            onChange={handleChange}
                            min="0"
                            placeholder="Enter number of dependants"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="medicalAid">Medical Aid Contributions (R)</label>
                        <input
                            type="number"
                            id="medicalAid"
                            name="medicalAid"
                            value={formData.medicalAid}
                            onChange={handleChange}
                            placeholder="Enter your medical aid contributions"
                        />
                    </div>
                </>
            )}
            <div className="form-group">
                <label htmlFor="annuity">Monthly Annuity/Pension Contributions (R)</label>
                <input
                    type="number"
                    id="annuity"
                    name="annuity"
                    value={formData.annuity}
                    onChange={handleChange}
                    placeholder="Enter your monthly annuity/pension contributions"
                />
            </div>
            <button type="submit" className="submit-button">
                Calculate Tax
            </button>
        </form>
    );
}

export default TaxForm;
