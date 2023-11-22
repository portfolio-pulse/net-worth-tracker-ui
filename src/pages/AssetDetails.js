import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AssetForm from "../components/AssetForm";

export default function AssetDetails() {
    const columns = [
        {
            name: "Sr.No",
            selector: (row) => row.id,
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

    const handleDelete = (val) => {
        const newdata = data.filter((item) => item.id !== val);
        setFilter(newdata);
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

    // const { register, handleSubmit, formState: { errors } } = useForm();

    // const onSubmit = (data) => {
    //     console.log(data);
    // };

    return (
        <React.Fragment>
            <h1>Asset List</h1>
            <AssetForm></AssetForm>
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