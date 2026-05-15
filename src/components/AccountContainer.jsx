import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions,setTransactions] = useState([])
  const [search,setSearch] = useState("")

  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[])

  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    .then(data=>setTransactions([...transactions,data]))
  }
  
  // Sort function here
  function onSort(sortBy){

    const sortedTransactions = [...transactions].sort((a, b) => {

      return a[sortBy].localeCompare(b[sortBy])

    })

    setTransactions(sortedTransactions)
    
  }

  // Filter using search here and pass new variable down

  const filteredTransactions = transactions.filter((transaction) => {

    return transaction.description.toLowerCase().includes(search.toLowerCase())

  })
  

  return (
    <div>
      <Search search={search} setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
