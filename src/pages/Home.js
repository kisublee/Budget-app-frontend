// MUI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
//Axios and React Hooks
import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import LiveWallPaper from "../assets/wave_home_background.mp4";
import { Link } from "react-router-dom";
import BudgetIcon from "../assets/home_1_item.jpg";
import ArrowUpIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownIcon from "@mui/icons-material/ArrowDownward";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  // const [total, setTotal] = useState(0);
  const URL = process.env.REACT_APP_API_URL;

  // Function to keep the video playing automatically
  const vidRef = useRef(null);
  const handlePlayVideo = () => {
    vidRef.current.play();
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("we are hitting the useEffect for Home!");
      const res = await axios.get(`${URL}/transactions`);
      setTransactions(res.data);
    };
    fetchData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  let savingGoal = 0;
  let total = 0;

  const calTotal = transactions.map((each) => {
    return (total += Number(each.amount));
  });

  let totalForBuying = 0;

  const calTotalForBuying = transactions
    .filter((each) => each.category !== "saving")
    .map((each) => {
      return (totalForBuying += Number(each.amount));
    });

  let totalForSaving = 0;

  const calTotalForSaving = transactions
    .filter((each) => each.category === "saving")
    .map((each) => {
      return (totalForSaving += Number(each.amount));
    });

  const compareSavings = transactions.filter((each) => {
    if (each.category === "saving") {
      return each;
    }
  });
  console.log(compareSavings);
  // let latestSavingAmount = compareSavings[compareSavings.length - 1].amount;
  // let prevSavingAmount = compareSavings[compareSavings.length - 2].amount;

  // console.log(latestSavingAmount);
  // console.log(prevSavingAmount);

  const myProgress = (amount) => {
    if (amount >= savingGoal) {
      return "Excellent!";
    } else if (amount + savingGoal * 0.3 >= savingGoal) {
      return "Good!";
    } else {
      return "";
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            flexGrow: 1,
            mt: 10,
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ marginBottom: -3, fontWeight: "bold" }}
          >
            Hello, let's budget
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={12}>
              <Item sx={{ display: "flex" }}>
                <Grid item xs={6}>
                  <Typography component="div" sx={{ ml: 1 }}>
                    <Box
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: 15,
                        textAlign: "left",
                        color: "black",
                        fontWeight: 600,
                      }}
                    >
                      Total spending
                    </Box>
                  </Typography>
                  <Typography component="div" sx={{ ml: 1.2, mt: 0.5 }}>
                    <Box
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: 17,
                        textAlign: "left",
                        color: "black",
                        letterSpacing: 1,
                        fontWeight: "bold",
                        mt: 1.5,
                      }}
                    >
                      ${total}
                    </Box>
                  </Typography>
                  <Typography component="div" sx={{ ml: 1, mt: 0.5 }}>
                    <Box
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: 15,
                        textAlign: "left",
                        mt: 1.7,
                        fontWeight: 600,
                      }}
                    >
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#4876C7",
                        }}
                        to="/overview"
                      >
                        See all transactions
                      </Link>
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <img
                      src={BudgetIcon}
                      style={{
                        maxHeight: 100,
                      }}
                    />
                  </Box>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={6} md={6}>
              <Item sx={{ maxHeight: 150 }}>
                {" "}
                <Typography component="div" sx={{ ml: 1 }}>
                  <Box
                    sx={{
                      fontFamily: "sans-serif",
                      fontSize: 15,
                      textAlign: "left",
                      color: "black",
                      mt: 1,
                      fontWeight: 600,
                    }}
                  >
                    Spent
                  </Box>
                </Typography>
                <Typography component="div" sx={{ ml: 1.2, mt: 0.5 }}>
                  <Box
                    sx={{
                      fontFamily: "sans-serif",
                      fontSize: 17,
                      textAlign: "left",
                      color: "black",
                      letterSpacing: 1,
                      fontWeight: "bold",
                      mt: 1,
                    }}
                  >
                    ${totalForBuying}
                  </Box>
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={6} md={6}>
              <Item sx={{ maxHeight: 150 }}>
                <Typography component="div" sx={{ ml: 1, mt: 1 }}>
                  <Box
                    sx={{
                      fontFamily: "sans-serif",
                      fontSize: 15,
                      textAlign: "left",
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    Saving
                  </Box>
                </Typography>
                <Typography component="div" sx={{ ml: 1.2, mt: 0.5 }}>
                  <Box
                    sx={{
                      fontFamily: "sans-serif",
                      fontSize: 17,
                      textAlign: "left",
                      color: "black",
                      letterSpacing: 1,
                      mt: 1,
                    }}
                  >
                    <strong> ${totalForSaving} </strong>
                    <Box
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: 14,
                        textAlign: "right",
                        color: "black",
                        letterSpacing: 1,
                        display: "inline-block",
                      }}
                    >
                      {myProgress(totalForSaving)}
                    </Box>
                    <Box
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: 14,
                        textAlign: "right",
                        color: "black",
                        letterSpacing: 1,
                        display: "inline-block",
                      }}
                    >
                      {/* {latestSavingAmount > prevSavingAmount ? (
                        <>
                          <ArrowUpIcon />
                          <p>{latestSavingAmount - prevSavingAmount}</p>
                        </>
                      ) : (
                        <>
                          <ArrowDownIcon />
                          <p>{latestSavingAmount - prevSavingAmount}</p>
                        </>
                      )} */}
                    </Box>
                  </Box>
                </Typography>
              </Item>
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ mt: 3, fontWeight: "bold" }}
          >
            Your latest insights
          </Typography>
          <Grid item xs={12} md={12} sx={{ mt: 3, borderRadius: 10 }}>
            <Item sx={{ padding: 17, bgcolor: "#F2F9FE", boxShadow: 2 }}>
              for insights
            </Item>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
