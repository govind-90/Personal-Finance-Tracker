import { Radio, Select, Table } from 'antd';
import Item from 'antd/es/list/Item';
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react'
import searchImg from "../../assets/serach.svg"
import papaparse, { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';

const TransactionTable = ({tranasaction,addTransaction,fetchTransaction}) => {
const [search,setSearch]=useState("")
const [typeFilter,setTypefilter]=useState("")
const [sortKey,setSortKey]=useState("");


    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
      ];
      let filteredTranasactions=tranasaction.filter((item)=>{
      return  item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
      })



      let sortedTransactons=filteredTranasactions.sort((a,b)=>{
        if(sortKey==='date'){
            return new Date(a.date)-new Date(b.date);
        }
        else if(sortKey==="amount"){
            return a.amount-b.amount;
        }
        else {
            return 0;
        }
      })
      function exportToCsv(){
        var csv = unparse({
            "fields": ["name", "type","tag","amount","date"],
          data:  tranasaction,
            
        });
        var data = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
var url = window.URL.createObjectURL(data);
let tempLink = document.createElement('a');
tempLink.href =url;
tempLink.download="transactions.csv"
document.body.appendChild(tempLink);
tempLink.click();
document.body.removeChild(tempLink);


    }
    function importFromCsv(event){
        event.preventDefault();
        try{
            parse(event.target.files[0],{
                header:true,
                complete:async function (results){
                    //results.data is an array of the object corresponding to csv rows
                    for(const transaction of results.data){
                        
                        const  newTransaction={
                            ...transaction,
                            amount:parseFloat(transaction.amount)
                        }
                        console.log("transactions in improtfrom csv file",transaction);
                        await addTransaction(newTransaction,true)
                    };
                    

                },
            })
            toast.success("All Transactions Added")
            fetchTransaction();
        }catch(e){
            toast.error(e.message);

        }

    }
  return (
    // <>
    // <div className='input-flex'>
    //     <img src={searchImg} width="16" />
    //     <input value={search} onChange={(e)=>{
    //     setSearch(e.target.value); 
    // }} placeholder='Serach by name'/>
    
    // </div>
    // <>
    // <Select className="select-input" onChange={(value)=>{setTypefilter(value)}}
    // value={typeFilter}
    // placeholder="Filter"
    // allowClear >
    // <Option value=''>All</Option>
    // <Option value='income'>Income</Option>
    // <Option value='expense'>Expense</Option>



    // </Select>
    // <Radio.Group className='input-radio' onChange={(e)=>setSortKey(e.target.value)}
    // value={sortKey}>


    //     <Radio.Button value="">No Sort</Radio.Button>
    //     <Radio.Button value="date">Sort by Date</Radio.Button>
    //     <Radio.Button value="amount">Sort by Amount</Radio.Button>
    // </Radio.Group>
    // <div><Table dataSource={sortedTransactons} columns={columns} /></div>
    // </>
    // </>
    <div
      style={{
        width: "100%",
        padding: "0rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchImg} width="16" />
          <input
          value={search}
            placeholder="Search by Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypefilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      {/* <Select
        style={{ width: 200, marginRight: 10 }}
        onChange={(value) => setSelectedTag(value)}
        placeholder="Filter by tag"
        allowClear
      >
        <Option value="food">Food</Option>
        <Option value="education">Education</Option>
        <Option value="office">Office</Option>
      </Select> */}
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportToCsv}>
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            /> 
          </div>
        </div>

        <Table columns={columns} dataSource={sortedTransactons} />
      </div>
    </div>

  )
}

export default TransactionTable