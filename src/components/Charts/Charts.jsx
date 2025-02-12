import { Line, Pie } from "@ant-design/charts";

import React from "react";

const Charts = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });
  const spendignData=sortedTransactions.filter((transaction)=>{ if(transaction.type=="expense"){
   return {tag:transaction.tag,amount:transaction.amount}
  }})
  let newSpending=[{tag:"food",amount:0},{tag:"education",amount:0},{tag:"office",amount:0}]
  spendignData.forEach(element => {
    if(element.tag=="food"){
        newSpending[0].amount+=element.amount;
    }
    else if(element.tag=="education"){
        newSpending[1].amount+=element.amount;
    }
    else{
        newSpending[2].amount+=element.amount;
    }
    
  });
  const config = {
    data:data,
    width:500,
    autoFit: false,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data:newSpending,

  width:500,
    angleField:"amount",
    colorField:"tag",
  };
  let chart;
let pieChart;
  return (
    <div className="Charts-wrapper">
      {" "}
      <div>
        <h2>Your Analytics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div>
        <h2>Your Spendings</h2>
    <Pie {...spendingConfig}
    onReady={(chartInstance)=>(pieChart=chartInstance)} />
        
       
      </div>
    </div>
  );
};

export default Charts;
