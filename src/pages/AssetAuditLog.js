import React, { useEffect, useState } from "react";
import AssetForm from "../components/AssetForm";
//import axios from "axios";
import { Bars } from "react-loader-spinner";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


const AssetAuditLog = () => {

    const columns = [
        { field: 'id', headerName: 'AssetId', width: 100 },
        { field: 'investmentEntity', headerName: 'InvestmentEntity', width: 100 },
        { field: 'investmentType', headerName: 'Type', width: 100 },
        { field: 'amount', headerName: 'Amount', width: 100 },
        { field: 'interestRate', headerName: 'InterestRate', width: 100 },
        { field: 'interestFrequency', headerName: 'InterestFrequency', width: 100 },
        { field: 'userId', headerName: 'UserId', width: 100 },
        { field: 'startDate', headerName: 'StartDate', width: 100 },
        { field: 'maturityDate', headerName: 'MaturityDate', width: 100 },
        { field: 'asOfDate', headerName: 'AsOfDate', width: 100 },
        { field: 'remarks', headerName: 'Remarks', width: 100 },
    ];


    const [data, setData] = useState([]);
    const [page, setPageSize] = useState([25]);
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Bearer Token: ", localStorage.getItem("loginToken"));
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://networthtrackerapi20240213185304.azurewebsites.net/api/General/getAssetDetails', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("loginToken")}`
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
                else if(response.status===401){
                    navigate('/login'); 
                }
            }
            catch (error) {
                console.log("Error fetching data: ", error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Box sx={{ height: 400, width: '100%' }}>
                <h1>Asset Report</h1>
                {loading ? (
                <Bars height="50" width="50" color="#4fa94d" ariaLabel="loading" />
            ) : (
                <Box sx={{ height: 500, maxWidth: '100%', overflowX: 'auto' }}> {/* Set maxWidth to fit the screen */}
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        pagination
                        sx={{
                            minWidth: '600px',  // Minimum width to ensure horizontal scrollability
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    />
                </Box>
            )}
            </Box>
        </div>
    );
}

export default AssetAuditLog;