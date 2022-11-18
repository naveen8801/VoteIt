import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftDiv: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  rightDiv: {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  heading: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#fff',
    marginLeft: '2rem',
    letterSpacing: '5px',
  },
  span: { fontFamily: 'Roboto', fontWeight: 700, color: '#cb19cd' },
  NavUi: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    listStyle: 'none',
    marginRight: '2rem',
  },
  Li: {
    padding: '1rem 1rem 1rem 0.5rem',
    margin: '1rem',
    color: '#fff',
    fontWeight: '700',
    '&:hover': {
      cursor: 'pointer',
      borderBottom: '3px solid #cb19cd',
    },
  },
});

function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <div className={classes.leftDiv}>
        <h1 className={classes.heading}>
          Vote<span className={classes.span}>It</span>
        </h1>
      </div>
      <div className={classes.rightDiv}>
        <ul className={classes.NavUi}>
          <li className={classes.Li} onClick={(e) => navigate('/home')}>
            Home
          </li>
          <li className={classes.Li} onClick={(e) => navigate('/about-us')}>
            About Us
          </li>
          <li className={classes.Li} onClick={(e) => navigate('/contact-us')}>
            Contact Us
          </li>
          <li className={classes.Li} onClick={(e) => navigate('/sign-in')}>
            Login
          </li>
          <li className={classes.Li} onClick={(e) => navigate('/sign-up')}>
            Sign Up
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
