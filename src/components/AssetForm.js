import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bars } from "react-loader-spinner";

export default function AssetForm({ onButtonClick, passedData }) {


    // State variables for form fields
    const [investmentId, setInvestmentId] = useState(0);
    const [investmentEntity, setInvestmentEntityValue] = useState('');
    const [investmentType, setinvestmentTypeValue] = useState('');
    const [amount, setAmountValue] = useState('');
    const [interestRate, setInterestRate] = useState(null);
    const [interestFrequency, setInterestFrequency] = useState('');
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [maturityDate, setMaturityDate] = useState(null);
    const [asOfDate, setAsOfDate] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [investmentTypeData, setInvestmentTypeData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [isSubmitClicked, setSubmitClicked] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isFixedIncomeVisible, setIsFixedIncomeVisible] = useState(true);
    const [dictionary, setDictionary] = useState({});
    const addDictionary = (investmentTypeId, assetClassId) => {
        setDictionary((prevDictionary) => ({
            ...prevDictionary,
            [investmentTypeId]: assetClassId,
        }));
    };


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
            const today = new Date();
            const defaultDate = today.toISOString().substr(0, 10);
            setAsOfDate(defaultDate);
        };
        onLoad();
    }, []);

    useEffect(() => {
        if (passedData.amount != undefined) {
            //console.log("Assets passed from parent: ", passedData.amount);
            console.log("Assets passed from parent: ", passedData);
            setInvestmentId(passedData.assetDetailId);
            setInvestmentEntityValue(passedData.investmentEntity);
            setinvestmentTypeValue(passedData.investmentType.investmentTypeId);
            setAmountValue(passedData.amount);
            if (passedData.interestRate == null) {
                setInterestRate('');
            }
            else {
                setInterestRate(passedData.interestRate);
            }
            setInterestFrequency(passedData.interestFrequency);
            setUserId(passedData.userId);
            if (passedData.investmentType.investmentAssetClass.assetClassId == 2) { //fixed income
                setIsFixedIncomeVisible(true);
            }
            else {
                setIsFixedIncomeVisible(false);
            }
            if (passedData.startDate != null) {
                setStartDate(passedData.startDate.split("T")[0]);
            }
            else {
                setStartDate('');
            }

            if (passedData.maturityDate != null) {
                setMaturityDate(passedData.maturityDate.split("T")[0]);
            }
            else {
                setMaturityDate('');
            }

            if (passedData.asOfDate != null) {
                setAsOfDate(passedData.asOfDate.split("T")[0]);
            }
            else {
                setAsOfDate('');
            }

            setRemarks(passedData.remarks);
        }

    }, [passedData]);

    useEffect(() => {
        const onSubmit = async () => {
            if (isSubmitClicked) {
                setIsLoading(true);
                if (postData.UserId != "") {
                    await axios.post("http://localhost:5226/api/General/AddUpdateAssetDetails", postData)
                        .then(response => {
                            console.log(response.data);
                            if (response.data != null) {
                                alert("Sucess");
                            }
                        })
                        .catch(error => {
                            console.error("Error: ", error);
                            alert("Operation failed!!");
                        });
                    await onButtonClick();
                }
                setSubmitClicked(false);
                setIsLoading(false);
            }
        };

        onSubmit();
    }, [isSubmitClicked]);


    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5226/api/General/GetMasterData");
            setInvestmentTypeData(response.data.investmentTypes);
            setUsersData(response.data.users);

            response.data.investmentTypes.forEach((type, index) => {
                addDictionary(type.investmentTypeId, type.assetClassId);
            });


            //console.log(response);
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
        if (dictionary[e.target.value] == 2) { //fixed income instruments
            setIsFixedIncomeVisible(true);
        }
        else {
            setIsFixedIncomeVisible(false);
        }
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
        setMaturityDate(e.target.value || null);
    };
    const handleAsOfDate = (e) => {
        setAsOfDate(e.target.value || null);
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
        setStartDate(defaultDate);
        setMaturityDate(defaultDate);
        setAsOfDate(defaultDate);
        setRemarks('');
    };

    // Form submission handler (you can customize this)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (investmentId == "") {
        //     setInvestmentId(0);
        // }

        setPostData({
            "AssetDetailId": investmentId == "" ? 0 : investmentId,
            "InvestmentEntity": investmentEntity,
            "InvestmentTypeId": investmentType,
            "Amount": amount,
            "InterestRate": interestRate == "" ? null : interestRate,
            "InterestFrequency": interestFrequency,
            "UserId": userId,
            "StartDate": startDate == '' ? null : startDate,
            "MaturityDate": maturityDate == '' ? null : maturityDate,
            "AsOfDate": asOfDate == '' ? null : asOfDate,
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
            {isFixedIncomeVisible &&
                <label>
                    Interest Rate :
                    <input type="number" name="InterestRate" value={interestRate} onChange={handleInterestRate} />
                </label>}
            <br />
            {isFixedIncomeVisible &&
                <label>
                    Interest Frequency :
                    <input type="text" name="InterestFrequency" value={interestFrequency} onChange={handleInterestFrequency} />
                </label>}
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
            {isFixedIncomeVisible &&
                <label>
                    Start Date:
                    <input type="date" name="StartDate" value={startDate} onChange={handleStartDate} />
                </label>}
            <br />
            {isFixedIncomeVisible &&
                <label>
                    Maturity Date:
                    <input type="date" name="MaturityDate" value={maturityDate} onChange={handleMaturityDate} />
                </label>}
            <br />
            {!isFixedIncomeVisible &&
                <label>
                    As Of Date:
                    <input type="date" name="AsOfDate" value={asOfDate} onChange={handleAsOfDate} />
                </label>}
            <br />
            <label>
                Remarks:
                <input type="text" name="Remarks" value={remarks} onChange={handleRemarks} />
            </label>

            <br />

            <button type="submit">Save</button>
            <button onClick={clear}>Clear</button>
            {isLoading ? (<div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                /></div>) : ""}
        </form>
    );
};