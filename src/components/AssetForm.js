import React, { useState } from 'react';

export default function AssetForm() {
    // State variables for form fields
    const [investmentEntity, setInvestmentEntityValue] = useState('');
    //const [dateValue, setDateValue] = useState('');
    const [investmentType, setinvestmentTypeValue] = useState('');
    const [amount, setAmountValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [interestFrequency, setInterestFrequency] = useState('');
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [maturityDate, setMaturityDate] = useState('');
    const [asOfDate, setAsOfDate] = useState('');
    const [remarks, setRemarks] = useState('');
    //setRemarks

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

    const userIdChange = (e) => {
        setUserId(e.target.value);
    };
    const startDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const maturityDateChange = (e) => {
        setMaturityDate(e.target.value);
    };

    const asOfDateChange = (e) => {
        setAsOfDate(e.target.value);
    };

    const remarksChange = (e) => {
        setRemarks(e.target.value);
    };
    //remarksChange

    // Form submission handler (you can customize this)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('InvestmentEntity:', investmentEntity);
        //console.log('Date:', dateValue);
        console.log('InvestmentType:', investmentType);
        console.log('Amount:', amount);
        console.log('User', userId);
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
            <br/>
            <label>
                User Id :
                <input type="text" value={userId} onChange={userIdChange} />
            </label>
            <br/>
            <label>
                Start Date:
                <input type="date" value={startDate} onChange={startDateChange} />
            </label>
            <br />
            <label>
                Maturity Date:
                <input type="date" value={maturityDate} onChange={maturityDateChange} />
            </label>
            <br/>
            <label>
                As Of Date:
                <input type="date" value={asOfDate} onChange={asOfDateChange} />
            </label>
            <br/>
            <label>
                Remarks:
                <input type="text" value={remarks} onChange={remarksChange} />
            </label>

            <br />

            <button type="submit">Submit</button>
        </form>
    );
};