import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Grid, NativeSelect, TextField } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate, Link } from "react-router-dom";
import Money from "../assets/money.png";
import FormControl from "@mui/material/FormControl";

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

  const clickHandler = () => {
    navigate(`/${id}`);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching API for One Single Image!");
      const res = await axios.get(`${URL}/transactions/${id}/`);

      setTransaction(res.data);
    };

    fetchData();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting");
    axios
      .patch(`${URL}/transactions/${id}`, transaction)
      .then(() => navigate(`/${id}`));
  };
  console.log(id);

  console.log(transaction);
  console.log(typeof transaction.amount);
  return (
    <Container>
      <Box sx={{ fontWeight: "bold" }}>
        <Typography variant="h5" sx={{ mt: 12, textAlign: "center" }}>
          Need to edit? let's do it now!
        </Typography>
      </Box>
      <Grid
        container
        spacing={0}
        sx={{
          mt: 5,
          minHeight: 700,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={5}>
          <FormControl required>
            <Card sx={{ width: "100%", height: "auto" }}>
              <CardMedia
                component="img"
                alt="video"
                height="auto"
                image={Money}
              />
              <CardContent>
                <Grid container sx={{ mb: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {/* {textFormatter(transaction)} */}
                    Category:
                  </Typography>

                  <NativeSelect
                    id="category"
                    value={transaction.category}
                    onChange={handleChange}
                    sx={{ minWidth: "15ch", bgcolor: "white", ml: 1 }}
                  >
                    {categories.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </NativeSelect>
                </Grid>
                <Grid container sx={{ mb: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {/* {textFormatter(transaction)} */}
                    Source:
                  </Typography>

                  <TextField
                    id="source"
                    variant="standard"
                    onChange={handleChange}
                    value={transaction.source}
                    sx={{ ml: 2.8 }}
                  />
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Amount:
                  </Typography>

                  <TextField
                    id="amount"
                    variant="standard"
                    onChange={handleChange}
                    value={transaction.amount.toString()}
                    type="number"
                    sx={{ ml: 2 }}
                  />
                </Grid>
                <Grid container sx={{ mb: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Date:
                  </Typography>
                  <TextField
                    id="date"
                    variant="standard"
                    onChange={handleChange}
                    value={transaction.date}
                    type="string"
                    sx={{ ml: 6 }}
                  />
                </Grid>
                <Grid container>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ overflow: "auto" }}
                  >
                    <strong>Description</strong>:
                  </Typography>
                  <TextField
                    id="description"
                    onChange={handleChange}
                    multiline
                    rows={4}
                    defaultValue={transaction.description}
                    variant="standard"
                    sx={{ ml: 1, width: 300 }}
                  />
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleSubmit}>
                  Submit
                </Button>

                <Button size="small" onClick={clickHandler}>
                  NVM. Back to List
                </Button>
              </CardActions>
            </Card>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditTransaction;
