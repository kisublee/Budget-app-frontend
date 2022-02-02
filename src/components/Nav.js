import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { debounce } from "../utilities/Debounce";
import { useState, useEffect } from "react";

export default function Nav() {
  //States for making Navbar appear and disappear on scroll
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  //States
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  //Media Query for mobile view
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 60) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const navbarStyles = {
    position: "fixed",
    width: "100%",
    transition: "top 0.6s",
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      menuTitle: "Goal",
      pageURL: "/goal",
    },
    {
      menuTitle: "List",
      pageURL: "/list",
    },
    {
      menuTitle: "Create",
      pageURL: "/create",
    },
    {
      menuTitle: "Account",
      pageURL: "/account",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, ...navbarStyles, top: visible ? "0" : "-60px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              {" "}
              Bi-Budget{" "}
            </Link>
          </Typography>
          {isMobile ? (
            <div>
              <IconButton
                size="large"
                aria-label="menu bar"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {menuItems.map((menuItem) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <Link
                      to={pageURL}
                      style={{ textDecoration: "none", color: "black" }}
                      key={menuTitle}
                    >
                      <MenuItem
                        onClick={() => handleMenu(pageURL)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "lightBlue",
                            color: "white",
                            opacity: [0.9, 0.8, 0.7],
                          },
                        }}
                      >
                        {menuTitle}
                      </MenuItem>
                    </Link>
                  );
                })}
              </Menu>{" "}
            </div>
          ) : (
            <div>
              {menuItems.map((menuItem) => {
                const { menuTitle, pageURL } = menuItem;
                return (
                  <Link
                    to={pageURL}
                    style={{ textDecoration: "none", color: "black" }}
                    key={menuTitle}
                  >
                    <Button
                      variant="text"
                      sx={{ color: "white" }}
                      onClick={() => handleMenu(pageURL)}
                    >
                      {menuTitle}
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
