import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router";
import SideDrawer from "../sideDrawer";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, userName, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        color="secondary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

        {isAuthenticated ? (
            <>
              <Typography sx={{ mr: 2 }}>
                Welcome {userName}
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  signout();
                  navigate("/");
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </>
          )}
          
        </Toolbar>
      </AppBar>
      <Offset />
      <SideDrawer open={drawerOpen} onClose={toggleDrawer} />
    </>
  );
};

export default SiteHeader;