import React, { useState } from 'react';

export default function AssetForm() {
    // State variables for form fields
    const [investmentEntity, setInvestmentEntityValue] = useState('');
    //const [dateValue, setDateValue] = useState('');
    const [investmentType, setinvestmentTypeValue] = useState('');
    const [amount, setAmountValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [interestFrequency, setInterestFrequency] = useState('');
    //setInterestFrequency

    // Sample dropdown options
    const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

    // Event handlers for form fields
    const investmentEntityChange = (e) => {
        setInvestmentEntityValue(e.target.value);
    };

    //   const handleDateChange = (e) => {
    //     setDateValue(e.target.value);
    //   };

    const investmentTypeChange = (e) => {
        setinvestmentTypeValue(e.target.value);
    };

    const amountChange = (e) => {
        setAmountValue(e.target.value);
    };

    const interestRateChange = (e) => {
        setInterestRate(e.target.value);
    };

    const interestFrequencyChange = (e) => {
        setInterestFrequency(e.target.value);
    };

    //interestRateChange

    // Form submission handler (you can customize this)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('InvestmentEntity:', investmentEntity);
        //console.log('Date:', dateValue);
        console.log('InvestmentType:', investmentType);
        console.log('Amount:', amount);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Investment Entity:
                <input type="text" value={investmentEntity} onChange={investmentEntityChange} />
            </label>
            <br />
            <label>
                Investment Type:
                <select value={investmentType} onChange={investmentTypeChange}>
                    <option value="">Select an option</option>
                    {dropdownOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Amount :
                <input type="text" value={amount} onChange={amountChange} />
            </label>
            <br />
            <label>
                Interest Rate :
                <input type="text" value={interestRate} onChange={interestRateChange} />
            </label>
            <br />
            <label>
                Interest Frequency :
                <input type="text" value={interestFrequency} onChange={interestFrequencyChange} />
            </label>
            {/* <label>
        Date:
        <input type="date" value={dateValue} onChange={handleDateChange} />
      </label>
      <br /> */}


            <br />

            <button type="submit">Submit</button>
        </form>
    );
};