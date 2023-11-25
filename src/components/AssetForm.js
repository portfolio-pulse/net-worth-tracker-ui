import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AssetForm() {
    // State variables for form fields
    const [investmentEntity, setInvestmentEntityValue] = useState('');
    const [investmentType, setinvestmentTypeValue] = useState('');
    const [amount, setAmountValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [interestFrequency, setInterestFrequency] = useState('');
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [maturityDate, setMaturityDate] = useState('');
    const [asOfDate, setAsOfDate] = useState('');
    const [remarks, setRemarks] = useState('');
    const [investmentTypeData, setInvestmentTypeData] = useState([]);
    const [usersData, setUsersData] = useState([]);

    const [postData, setPostData] = useState({
        "AssetDetailId": '',
        "InvestmentEntity": '',
        "InvestmentTypeId": '',
        "Amount": '',
        "InterestRate": '',
        "InterestFrequency": '',
        "UserId": '',
        "StartDate": '',
        "MaturityDate": '',
        "AsOfDate": '',
        "Remarks": '',
    });

    useEffect(() => {
        const today = new Date();
        const defaultDate = today.toISOString().substr(0, 10);
        console.log(defaultDate);
        setAsOfDate(defaultDate);

        //api to populate users
        
        fetchUsers();
    }, []);


    // Sample dropdown options
    const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

    const fetchUsers = async () => {
        try {          
            const response = await axios.get("http://localhost:5226/api/General/GetMasterData");
            setInvestmentTypeData(response.data.investmentTypes);
            setUsersData(response.data.users);
            console.log(response);
        }
        catch (error) {
            console.error("error:", error);
        }
    }
    //
    const handleAsOfDateChange = (e) => {
        setAsOfDate(e.target.value);
        setPostData({
            ...postData,
            "AsOfDate": e.target.value,
        });
    };
    // Event handlers for form fields
    const handleInputChange = (e) => {

        setPostData({
            ...postData,
            [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value,
        });
    };



    // Form submission handler (you can customize this)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (postData.UserId == "") {
            alert("Please select user");
            return false;
        }
        postData.UserId=parseInt(postData.UserId);
        postData.AssetDetailId = 0;
        postData.InvestmentTypeId = 0;
        postData.AsOfDate = asOfDate;
        axios.post("http://localhost:5226/api/General/AddUpdateAssetDetails", postData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Investment Entity:
                <input type="text" name="InvestmentEntity" value={postData.investmentEntity} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Investment Type:
                <select name="InvestmentTypeId" value={postData.InvestmentTypeId} onChange={handleInputChange}>
                    <option value="">Select an option</option>
                    {investmentTypeData.map((option) => (
                        <option key={option.investmentTypeId} value={option.investmentTypeId}>
                            {option.investmentType}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Amount :
                <input type="number" name="Amount" value={postData.Amount} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Interest Rate :
                <input type="number" name="InterestRate" value={postData.InterestRate} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Interest Frequency :
                <input type="text" name="InterestFrequency" value={postData.InterestFrequency} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                User Id :
                <select name="UserId" value={postData.UserId} onChange={handleInputChange}>
                    <option value="">Select an option</option>
                    {usersData.map((option) => (
                        <option key={option.userId} value={option.userId}>
                            {option.userName}
                        </option>
                    ))}
                </select>
                {/* <input type="number" name="UserId" value={postData.UserId} onChange={handleInputChange} /> */}
            </label>
            <br />
            <label>
                Start Date:
                <input type="date" name="StartDate" value={postData.StartDate} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Maturity Date:
                <input type="date" name="MaturityDate" value={postData.MaturityDate} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                As Of Date:
                <input type="date" name="AsOfDate" value={asOfDate} onChange={handleAsOfDateChange} />
            </label>
            <br />
            <label>
                Remarks:
                <input type="text" name="Remarks" value={postData.Remarks} onChange={handleInputChange} />
            </label>

            <br />

            <button type="submit">Submit</button>
        </form>
    );
};