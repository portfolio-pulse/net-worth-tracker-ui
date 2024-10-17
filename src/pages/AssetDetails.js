import React, { useEffect, useState } from "react";
import AssetForm from "../components/AssetForm";
//import axios from "axios";
import { Bars } from "react-loader-spinner";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";


const AssetDetails = () => {

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

    const [page,setPageSize]=useState([25]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://networthtrackerapi20240213185304.azurewebsites.net/api/General/getAssetDetails');
                const result = await response.json();
                setData(result);
            }
            catch (error) {
                console.log("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Box sx={{ height: 400, width: '100%' }}>
                <h1>Asset Report</h1>
                <DataGrid rows={data} columns={columns} pageSize={page} onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} rowsPerPageOptions={[5,10,25,50]} />
            </Box>
        </div>
    );
}

export default AssetDetails;