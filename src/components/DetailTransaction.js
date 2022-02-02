import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Money from "../assets/money.png";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";

const DetailTransaction = () => {
  const [transaction, setTransaction] = useState([]);
  const { id } = useParams();
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("we are hitting the useEffect for Home!");
      const res = await axios.get(`${URL}/transactions/${id}`);
      setTransaction(res.data);
    };
    fetchData();
  }, []);

  //   const textFormatter = (str) => {
  //     if (str) {
  //       return (
  //         str.source.split("").slice(0, 1).toString().toUpperCase() +
  //         str.source.split("").slice(1).join("").toLowerCase()
  //       );
  //     }
  //   };

  console.log(id);
  const clickHandler = () => {
    navigate(`/list`);
  };

  return (
    <Container>
      <Box sx={{ fontWeight: "bold" }}>
        <Typography variant="h5" sx={{ mt: 12, textAlign: "center" }}>
          Let's take a close look
        </Typography>
      </Box>
      <Grid
        container
        spacing={0}
        sx={{
          mt: 5,
          height: 650,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={5}>
          <Card sx={{ width: "100%", height: "auto" }}>
            <CardMedia
              component="img"
              alt="video"
              height="auto"
              image={Money}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {/* {textFormatter(transaction)} */}
                Category: {transaction.category}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {/* {textFormatter(transaction)} */}
                Source: {transaction.source}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Amount: ${transaction.amount}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Date: {transaction.date}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ overflow: "auto" }}
              >
                <strong>Description</strong>: {transaction.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/${id}/edit`} style={{ textDecoration: "none" }}>
                <Button size="small">Edit</Button>
              </Link>
              <Button size="small" onClick={clickHandler}>
                Back to List
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailTransaction;
