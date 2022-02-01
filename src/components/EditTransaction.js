import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
const EditTransaction = () => {
  const { id } = useParams();
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

  // useEffect(() => {
  //   axios
  //     .get(`${URL}/transactions/${id}`)
  //     .then((res) => setTransaction(res.data));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching API for One Single Image!");
      const res = await axios.get(`${URL}/transactions/${id}/`);

      setTransaction(res.data);
      console.log(res.data);
    };

    fetchData();
  }, []);

  console.log(transaction);

  return (
    <Grid item xs={6} md={6} sx={{ mt: 30 }}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "15ch", bgcolor: "skyBlue" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="amount"
          label="amount"
          variant="outlined"
          // onChange={handleChange}
          placeholder="$"
          type="number"
        />
      </Box>
    </Grid>
  );
};

export default EditTransaction;
