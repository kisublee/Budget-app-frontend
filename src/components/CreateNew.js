import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import bgImage from "../assets/Grocery_shopping_ vector.jpg";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";

// Axios and Hooks
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateNew = () => {
  // States to take a new form
  const [transaction, setTransaction] = useState({
    category: "",
    amount: 0,
    date: "",
    source: "",
    description: "",
  });

  //URL KEY
  const URL = process.env.REACT_APP_API_URL;

  //Call useNavigate function
  const navigate = useNavigate();

  //Category
  const categories = [
    {
      value: "",
      label: "",
    },
    {
      value: "saving",
      label: "Saving",
    },
    {
      value: "grocery",
      label: "Grocery",
    },
    {
      value: "food",
      label: "Food",
    },
    {
      value: "gift",
      label: "Gift",
    },
    {
      value: "etc",
      label: "Etc",
    },
  ];

  const handleChange = (event) => {
    console.log(event.target.id, event.target.value);
    event.target.id === "amount"
      ? setTransaction({
          ...transaction,
          [event.target.id]: Number(event.target.value),
        })
      : setTransaction({
          ...transaction,
          [event.target.id]: event.target.value,
        });
  };
  console.log(transaction);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${URL}/transactions`, transaction).then(() => {
      navigate("/");
    });
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={12}> */}
        <Box
          sx={{
            bgcolor: "#17006A",
            position: "absolute",
            zIndex: 1,
            left: 0,
            right: 0,
            mx: 2,
            width: "300",
            mt: 25,
            p: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              fontFamily: "impact",
            }}
          >
            Add a new transaction
          </Typography>
        </Box>
        {/* </Grid> */}
        <Grid item xs={12} md={12}>
          <Box>
            <img src={bgImage} style={{ width: "100%", zIndex: -1 }} />
          </Box>
        </Grid>
        <CssBaseline />
        <FormControl sx={{ m: 2 }} required>
          <Grid item xs={6} md={6}>
            <InputLabel id="category">category</InputLabel>
            <NativeSelect
              id="category"
              value={transaction.category}
              onChange={handleChange}
              sx={{ minWidth: "15ch", bgcolor: "skyBlue", m: 1 }}
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "15ch", bgcolor: "skyBlue" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="date"
                label="MM-DD-YYYY"
                variant="outlined"
                onChange={handleChange}
                placeholder="Enter a date"
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
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
                onChange={handleChange}
                placeholder="$"
                type="number"
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "15ch", bgcolor: "skyBlue" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="source"
                label="source"
                variant="outlined"
                onChange={handleChange}
                placeholder="source"
                type="string"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "25ch",
                  bgcolor: "skyBlue",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="description"
                label="description"
                variant="outlined"
                onChange={handleChange}
                placeholder="description"
                type="string"
                multiline
                rows={8}
              />
            </Box>
          </Grid>
          <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
      </Grid>
    </Box>
  );
};

export default CreateNew;
