import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AssetForm from "../components/AssetForm";
import axios from "axios";

export default function AssetDetails() {
    const columns = [
        {
            name: "Select",
            cell: (row) => (
                <button className="btn btn-danger" onClick={() => handleSelect(row.assetDetailId)}>Select</button>
            )
        },
        {
            name: "Asset Id",
            selector: (row) => row.assetDetailId,
        },
        {
            name: "Investment Entity",
            selector: (row) => row.investmentEntity,
        },
        {
            name: "Amount",
            selector: (row) => row.amount,
        },
        {
            name: "Interest Rate",
            selector: (row) => row.interestRate,
        },
        {
            name: "Interest Frequency",
            selector: (row) => row.interestFrequency,
        },
        {
            name: "Remarks",
            selector: (row) => row.remarks,
        }

    ];
    const [data, setData] = useState([]);
    const [search, SetSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const [asset, setAssetData] = useState({});
    const [textboxValue, setTextboxValue] = useState('');

    const getProduct = async () => {
        try {
            //https://fakestoreapi.com/products
            const req = await fetch("http://localhost:5226/api/General/GetAssetDetails");
            const res = await req.json();
            setData(res);
            setFilter(res);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        const result = data.filter((item) => {
            return item.title.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    }, [search]);

    const handleSelect =  (assetId) => {
        // const newdata = data.filter((item) => item.id !== val);
        // setFilter(newdata);
        console.log(assetId);
        fetchAsset(assetId);
        setTextboxValue('New value from parent');
    }

    // useEffect(()=>{
    //     console.log(asset.amount);
    // },[asset]);

    const fetchAsset = async (assetId) => {
        try {
            const response = await axios.get("http://localhost:5226/api/General/GetAssetDetailById", {
                params: {
                    assetDetailId: assetId
                }
            });
            setAssetData(response.data);         
        }
        catch (error) {
            console.error("error:", error);
        }
    }

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#ccc"

            },
        },
    }

    return (
        <React.Fragment>
            <h1>Asset List</h1>

            <AssetForm textboxValue={textboxValue} setTextboxValue={setTextboxValue}></AssetForm>
            <DataTable
                customStyles={tableHeaderstyle}
                columns={columns}
                data={filter}
                pagination
                selectableRows
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                actions={
                    <button className="btn btn-success">Export Pdf</button>
                }
                subHeader
                subHeaderComponent={
                    <input type="text"
                        className="w-25 form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => SetSearch(e.target.value)}

                    />
                }
                subHeaderAlign="right"

            />
        </React.Fragment>
    );
}