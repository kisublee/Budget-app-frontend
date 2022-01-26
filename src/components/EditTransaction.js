import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const EditTransaction = () => {
  const { id } = useParams;

  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    category: "",
    amount: 0,
    date: "",
    source: "",
    description: "",
  });
  console.log(id);

  useEffect(() => {
    axios
      .get(`${URL}/transactions/${id}`)
      .then((res) => setTransaction(res.data));
  }, []);

  return <h1>{transaction.source}</h1>;
};

export default EditTransaction;
