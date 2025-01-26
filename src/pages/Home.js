import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Legend, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 }
];

const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "Amount": 15340
    },
    {
        "name": "Page B",
        "uv": 3000,
        "Amount": 1398
    },
    {
        "name": "Page C",
        "uv": 2000,
        "Amount": 9800
    },
    {
        "name": "Page D",
        "uv": 2780,
        "Amount": 3908
    },
    {
        "name": "Page E",
        "uv": 1890,
        "Amount": 4800
    },
    {
        "name": "Page F",
        "uv": 2390,
        "Amount": 3800
    },
    {
        "name": "Page G",
        "uv": 3490,
        "Amount": 4300
    }
]


export default function Home() {
    const navigate = useNavigate();
    const handleRefreshDatabase = async () => {
        try {
            const response = await fetch('https://networthtrackerapi20240213185304.azurewebsites.net/api/Auth/reloadDatabase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("loginToken")}`
                }
            });
            if (response.ok) {
                //const result = await response.json();
                console.log("Response: "+response);
                alert("Database Refresh Success");
                //setData(result);
            }
            else if (response.status === 401) {
                navigate('/login');
            }
        }
        catch (error) {
            console.log("Error fetching data: ", error);
        }
    }

    return (
        <>
            {/* <p>This is Home page.</p> */}
            <button onClick={handleRefreshDatabase}>Refresh Database</button>
            <PieChart width={1000} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>


            <BarChart width={730} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Amount" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
        </>
    );
}