import React, { useState } from 'react';
import Page from '../utils/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { register } from '../api/api';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/helpers';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 90px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '30%',
    height: '45vh',
    minWidth: '200px',
  },
  heading: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#ffff',
    textAlign: 'center',
    textDecoration: 'underline #cb19cd',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    margin: '0.5rem 0',
    border: 'none',
    height: '40px',
    borderRadius: '6px',
    outline: 'none',
    boxShadow: 'none',
    border: '1px solid #3F51B5',
    background: 'none',
    color: 'white',
    padding: '0 0.4rem',
  },
  btn: {
    color: 'white',
    margin: '0.5rem 0',
    height: '40px',
    borderRadius: '6px',
    backgroundColor: '#cb19cd',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#cb19cd' },
  },
});

function SignUp() {
  const classes = useStyles();
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (signUpData.email.trim().length === 0) {
      toast.error('Email is required !');
      return;
    }
    if (signUpData.password.trim().length === 0) {
      toast.error('Password is required !');
      return;
    }
    if (signUpData.name.trim().length === 0) {
      toast.error('Name is required !');
      return;
    }

    const payload = signUpData;

    try {
      const { data } = await register(payload);
      if (data.token) {
        localStorage.setItem('vote-it-token', data?.token);
        toast.success('Sign Up Successfull 🚀');
      }
    } catch (err) {
      console.log(err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Page title="Sign Up">
      <div className={classes.root}>
        <div className={classes.card}>
          <h1 className={classes.heading}>Sign Up</h1>
          <div className={classes.formWrapper}>
            <input
              onChange={(e) =>
                setSignUpData({ ...signUpData, name: e.target.value })
              }
              placeholder="Name"
              type="text"
              className={classes.input}
            />
            <input
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
              placeholder="Email"
              type="text"
              className={classes.input}
            />
            <input
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
              placeholder="Password"
              type="password"
              className={classes.input}
            />
            <Button onClick={() => handleSubmit()} className={classes.btn}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default SignUp;
