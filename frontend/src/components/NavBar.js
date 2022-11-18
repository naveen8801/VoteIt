import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftDiv: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  rightDiv: {
    width: '50%',
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
  return (
    <div className={classes.root}>
      <div className={classes.leftDiv}>
        <h1 className={classes.heading}>
          Vote<span className={classes.span}>It</span>
        </h1>
      </div>
      <div className={classes.rightDiv}>
        <ul className={classes.NavUi}>
          <li className={classes.Li}>Home</li>
          <li className={classes.Li}>Contact Us</li>
          <li className={classes.Li}>Login</li>
          <li className={classes.Li}>Sign Up</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
