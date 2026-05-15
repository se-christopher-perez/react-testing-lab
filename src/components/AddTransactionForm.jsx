import React, { useState } from "react";

function AddTransactionForm({ postTransaction }) {

  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")


  function submitForm(e) {

    e.preventDefault()

    const newTransaction = {
      date: date,
      description: description,
      category: category,
      amount: amount
    }
    postTransaction(newTransaction)

  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={(e) => { submitForm(e) }}>
        <div className="inline fields">
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
          <input type="number" placeholder="Amount" step="0.01" onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
