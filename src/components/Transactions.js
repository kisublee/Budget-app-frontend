import axios from "axios";
import { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      console.log("we are hitting the useEffect for Home!");
      const res = await axios.get(`${URL}/transactions`);
      setTransactions(res.data);
    };
    fetchData();
  }, []);

  console.log(transactions);

  return (
    <article>
      {transactions.map((transaction, index) => {
          return (
         <div key={index}>
        <h1>{transaction.source}</h1>
        <h1>{transaction.category}</h1>
        <h1>$:{transaction.amount}</h1>
        <h1>{transaction.date}</h1>
        </div>
          )
      })}
    </article>
  );
};

export default Transactions;
