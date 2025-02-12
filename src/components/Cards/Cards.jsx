import React from 'react'
import "./style.css"
import { Card, Row } from 'antd'

import Button from './../Button/Button';


const Cards = ({showIncomeModal,showExpenseModal, income, expense, totalBal}) => {
  return (
    <div><Row className='my-row'>
      
      <Card className='my-card' bordered={true}><h2>Current Balance</h2><p>₹ {totalBal} </p>
      <Button  text="Reset Balance" blue={true}/>
      
      </Card>
      <Card className='my-card' bordered={true}><h2>Total Income</h2><p>₹ {income} </p>
      <Button onClick={showIncomeModal}  text="Add Income" blue={true}/>
      
      </Card>
      <Card className='my-card' bordered={true}><h2>Total Expenses</h2><p>₹ {expense} </p>
      <Button onClick={showExpenseModal}  text="Add Expenses" blue={true}/>
      
      </Card>
      </Row></div>
  )
}

export default Cards
