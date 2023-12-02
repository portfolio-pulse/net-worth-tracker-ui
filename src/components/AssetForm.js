import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AssetForm(asset) {


    // State variables for form fields
    const [investmentId, setInvestmentId] = useState(0);
    const [investmentEntity, setInvestmentEntityValue] = useState('');
    const [investmentType, setinvestmentTypeValue] = useState('');
    const [amount, setAmountValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [interestFrequency, setInterestFrequency] = useState('');
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [maturityDate, setMaturityDate] = useState(null);
    const [asOfDate, setAsOfDate] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [investmentTypeData, setInvestmentTypeData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [isSubmitClicked, setSubmitClicked] = useState(false);


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
        "Remarks": ''
    });


    useEffect(() => {
        const onLoad = async () => {
            //api to populate users
            await fetchUsers();
            if (asset && asset.passedData.amount) {
                console.log("Assets passed from parent: ", asset.passedData.amount);
                setInvestmentId(asset.passedData.assetDetailId);
                setInvestmentEntityValue(asset.passedData.investmentEntity);
                setinvestmentTypeValue(asset.passedData.investmentTypeId);
                setAmountValue(asset.passedData.amount);
                setInterestRate(asset.passedData.interestRate);
                setInterestFrequency(asset.passedData.interestFrequency);
                setUserId(asset.passedData.userId);
                setStartDate(convertUtcToYYYYMMDD(asset.passedData.startDate));
                setMaturityDate(convertUtcToYYYYMMDD(asset.passedData.maturityDate));
                setAsOfDate(convertUtcToYYYYMMDD(asset.passedData.asOfDate));
                setRemarks(asset.passedData.remarks);
            }
            else {
                const today = new Date();
                const defaultDate = today.toISOString().substr(0, 10);
                setAsOfDate(defaultDate);
            }
        };
        onLoad();
    }, [asset]);

    useEffect(() => {
        const onSubmit = async () => {
            if (isSubmitClicked) {
                if (postData.UserId != "") {
                    await axios.post("http://localhost:5226/api/General/AddUpdateAssetDetails", postData)
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.error("Error: ", error);
                        });
                }
                setSubmitClicked(false);
            }
        };

        onSubmit();
    }, [isSubmitClicked, postData]);

    const convertUtcToYYYYMMDD = (utcDate) => {
        const dateObject = new Date(utcDate);
        const year = dateObject.getUTCFullYear();
        const month = `0${dateObject.getUTCMonth() + 1}`.slice(-2);
        const day = `0${dateObject.getUTCDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
    };
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
    };
    //
    const handleAsOfDateChange = (e) => {

        setAsOfDate(e.target.value);

    };

    const handleInvestmentId = (e) => {
        setInvestmentId(e.target.value);
    };
    // Event handlers for form fields
    const handleInvestmentEntity = (e) => {
        setInvestmentEntityValue(e.target.value);
    };
    const handleInvestmentType = (e) => {
        setinvestmentTypeValue(e.target.value);
    };
    const handleAmount = (e) => {
        setAmountValue(e.target.value);
    };
    const handleInterestRate = (e) => {
        setInterestRate(e.target.value);
    };
    const handleInterestFrequency = (e) => {
        setInterestFrequency(e.target.value);
    };
    const handleUser = (e) => {
        setUserId(e.target.value);
    };
    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };
    const handleMaturityDate = (e) => {
        setMaturityDate(e.target.value);
    };
    const handleAsOfDate = (e) => {
        setAsOfDate(e.target.value);
    };
    const handleRemarks = (e) => {
        setRemarks(e.target.value);
    };


    const clear = async (e) => {
        e.preventDefault();
        const today = new Date();
        const defaultDate = today.toISOString().substr(0, 10);

        setInvestmentId(0);
        setInvestmentEntityValue('');
        setinvestmentTypeValue(0);
        setAmountValue('');
        setInterestRate('');
        setInterestFrequency('');
        setUserId(0);
        setStartDate('');
        setMaturityDate('');
        setAsOfDate(defaultDate);
        setRemarks('');
    };

    // Form submission handler (you can customize this)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (investmentId == "") {
            setInvestmentId(0);
        }
        // if(startDate==""){
        //     setStartDate(null);
        // }
        // if(maturityDate==""){
        //     setMaturityDate(null);
        // }
        // if(asOfDate==""){
        //     setAsOfDate(null);
        // }
        setPostData({
            "AssetDetailId": investmentId,
            "InvestmentEntity": investmentEntity,
            "InvestmentTypeId": investmentType,
            "Amount": amount,
            "InterestRate": interestRate,
            "InterestFrequency": interestFrequency,
            "UserId": userId,
            "StartDate": startDate,
            "MaturityDate": maturityDate,
            "AsOfDate": asOfDate,
            "Remarks": remarks
        });
        setSubmitClicked(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input type="number" name="InvestmentId" hidden="true" value={investmentId} onChange={handleInvestmentId} />
            </label>
            <label>
                Investment Entity:
                <input type="text" name="InvestmentEntity" value={investmentEntity} onChange={handleInvestmentEntity} />
            </label>
            <br />
            <label>
                Investment Type:
                <select name="InvestmentTypeId" value={investmentType} onChange={handleInvestmentType}>
                    <option value="0">Select an option</option>
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
                <input type="number" name="Amount" value={amount} onChange={handleAmount} />
            </label>
            <br />
            <label>
                Interest Rate :
                <input type="number" name="InterestRate" value={interestRate} onChange={handleInterestRate} />
            </label>
            <br />
            <label>
                Interest Frequency :
                <input type="text" name="InterestFrequency" value={interestFrequency} onChange={handleInterestFrequency} />
            </label>
            <br />
            <label>
                User Id :
                <select name="UserId" value={userId} onChange={handleUser}>
                    <option value="0">Select an option</option>
                    {usersData.map((option) => (
                        <option key={option.userId} value={option.userId}>
                            {option.userName}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Start Date:
                <input type="date" name="StartDate" value={startDate} onChange={handleStartDate} />
            </label>
            <br />
            <label>
                Maturity Date:
                <input type="date" name="MaturityDate" value={maturityDate} onChange={handleMaturityDate} />
            </label>
            <br />
            <label>
                As Of Date:
                <input type="date" name="AsOfDate" value={asOfDate} onChange={handleAsOfDate} />
            </label>
            <br />
            <label>
                Remarks:
                <input type="text" name="Remarks" value={remarks} onChange={handleRemarks} />
            </label>

            <br />

            <button type="submit">Save</button>
            <button onClick={clear}>Clear</button>
        </form>
    );
};