import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../action";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { ChevronDown, ChevronUp } from "react-feather";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftDiv: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  },
  rightDiv: {
    width: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  },
  heading: {
    fontFamily: "Roboto",
    fontWeight: 700,
    color: "#fff",
    marginLeft: "2rem",
    letterSpacing: "5px",
  },
  span: { fontFamily: "Roboto", fontWeight: 700, color: "#cb19cd" },
  NavUi: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    listStyle: "none",
    marginRight: "2rem",
  },
  Li: {
    padding: "1rem 1rem 1rem 0.5rem",
    margin: "1rem",
    color: "#fff",
    fontWeight: "700",
    "&:hover": {
      cursor: "pointer",
      borderBottom: "3px solid #cb19cd",
    },
  },
});

function NavBar({ user, isLogin, mainLoading }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <div className={classes.leftDiv}>
        <h1 className={classes.heading}>
          Vote<span className={classes.span}>It</span>
        </h1>
      </div>
      <div className={classes.rightDiv}>
        <ul className={classes.NavUi}>
          <li className={classes.Li} onClick={(e) => navigate("/")}>
            Home
          </li>
          <li className={classes.Li} onClick={(e) => navigate("/about-us")}>
            About Us
          </li>
          <li className={classes.Li} onClick={(e) => navigate("/contact-us")}>
            Contact Us
          </li>
          {!isLogin && (
            <>
              <li className={classes.Li} onClick={(e) => navigate("/sign-in")}>
                Sign In
              </li>
              <li className={classes.Li} onClick={(e) => navigate("/sign-up")}>
                Sign Up
              </li>
            </>
          )}
          {isLogin && (
            <li
              style={{ display: "flex" }}
              className={`${classes.Li}`}
              onClick={handleClick}
            >
              Hey {user?.name}
              {open ? <ChevronUp /> : <ChevronDown />}
            </li>
          )}
        </ul>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem disabled onClick={handleClose}>
            Profile
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              dispatch(setLogout());
              handleClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state?.user,
    isLogin: state?.isLogin,
    mainLoading: state?.mainLoading,
  };
};

export default connect(mapStateToProps)(NavBar);
