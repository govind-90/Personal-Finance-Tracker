import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { Card, Modal } from 'antd'
import Cards from '../components/Cards/Cards'
import AddExpense from '../components/Modals/AddExpense'
import AddIncome from '../components/Modals/AddIncome'
import moment from 'moment'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../Firebase'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase'
import {  query, where, getDocs } from "firebase/firestore";
import TransactionTable from '../components/TransactionsTable/TransactionTable'
import Charts from '../components/Charts/Charts'
import Notransaction from './Notransaction'


const DashBorad = () => {
  const [income,setIncome]=useState(0);
  const[expense,setExpense]=useState(0);
  const [totalBal,setTotalBal]=useState(0);
  const [tranasaction,setTransaction]=useState([]);
  const [loading,setLoading]=useState(false);

  const [user]=useAuthState(auth);
  const [isExpenseModalVisible,setIsExpenseModalVisible]=useState(false);
  const [isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);
  const showExpenseModal=()=>{
    setIsExpenseModalVisible(true);
  }
  const showIncomeModal=()=>{
    setIsIncomeModalVisible(true);
  }
  const handleExpenseCancel=()=>{
    setIsExpenseModalVisible(false);
}
const handleIncomeCancel=()=>{
  setIsIncomeModalVisible(false);
}
const onFinish=(values,type)=>{
  const newTransaction={
    type:type,
    date:values.date.format("YYYY-MM-DD"),
    amount:parseFloat(values.amount),
    tag:values.tag,
    name:values.name
  }
  addTransaction(newTransaction);
  

}
async function addTransaction(transaction,many){
  try{
const docRef=await addDoc(collection(db,`users/${user.uid}/transactions`),transaction);
console.log("Document written with ID",docRef.id);
 if(!many)toast.success("Transaction Added")
 setTransaction(prev => [...prev, transaction]);  // Update state here
 calculateBalance([...tranasaction, transaction]); 
  }catch(e){
    console.log("Error adding document ",e);
  if (!many) toast.error("Couldn't add transaction ");
  }
  

}
useEffect(()=>{
  //get all docs from the collection
  fetchTransaction();
},[user])
useEffect(()=>{
  calculateBalance(tranasaction);
},[tranasaction])
const calculateBalance = (tranasactionArray) => {
  let incomeTotal = 0;
  let expensesTotal = 0;
  tranasactionArray.forEach((transaction) => {
    if (transaction.type === "income") {
      incomeTotal += transaction.amount;
    } else {
      expensesTotal += transaction.amount;
    }
  });

  setIncome(incomeTotal);
  setExpense(expensesTotal);
  setTotalBal(incomeTotal - expensesTotal);
};
async function fetchTransaction(){
  setLoading(true);
  if(user){
    const q = query(collection(db, `users/${user.uid}/transactions`));

const querySnapshot = await getDocs(q);
let tranasactionArray=[];
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  tranasactionArray.push( doc.data());
});
setTransaction(tranasactionArray);
//claculateBalance(tranasactionArray)
console.log("transciotn arry",tranasactionArray);
calculateBalance(tranasactionArray)
toast.success("Transactions Fetched")

  }
  setLoading(false);
}
let sortedTransactions=tranasaction.sort((a,b)=>{
  return new Date(a.data)-new Date(b.date);
})

  return (
   <div>
    <div><Header />{loading?(<p>Loading...</p>):(<>
    <Cards income={income} expense={expense} totalBal={totalBal} showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal}  />
    
   <AddExpense  isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>
   <AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}/>


    
  </> ) }</div>
  {tranasaction.length>0?<Charts sortedTransactions={sortedTransactions}  />:<><Notransaction /></>}
  
  <TransactionTable tranasaction={tranasaction} addTransaction={addTransaction} fetchTransaction={fetchTransaction} />
  
  </div>

  )
}

export default DashBorad