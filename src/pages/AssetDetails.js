import React, { useEffect, useState } from "react";
import AssetForm from "../components/AssetForm";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Asset Name', width: 150 },
    { field: 'value', headerName: 'Asset Value ($)', width: 130 },
];

const rows = [
    { id: 1, name: 'Laptop', value: 1500 },
    { id: 2, name: 'Phone', value: 800 },
    { id: 3, name: 'Monitor', value: 300 },
];

const AssetDetails = () => {


    return (
        <div>
            <Box sx={{ height: 400, width: '100%' }}>
                <h1>Asset Report</h1>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
        </div>
    );
}

export default AssetDetails;