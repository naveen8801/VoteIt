import React, { useState } from 'react';
import Page from '../utils/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, OutlinedInput, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/helpers';
import { login } from '../api/api';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 90px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
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

function SignIn() {
  const classes = useStyles();
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (signInData.email.trim().length === 0) {
      toast.error('Email is required !');
      setIsLoading(false);
      return;
    }
    if (signInData.password.trim().length === 0) {
      toast.error('Password is required !');
      setIsLoading(false);
      return;
    }

    const payload = signInData;

    try {
      const { data } = await login(payload);
      if (data.token) {
        localStorage.setItem('vote-it-token', data?.token);
        toast.success('Sign In Successfull 🚀');
      }
    } catch (err) {
      console.log(err);
      toast.error(getErrorMessage(err));
    }
    setIsLoading(false);
  };

  return (
    <Page title="Sign In">
      <div className={classes.root}>
        <div className={classes.card}>
          <h1 className={classes.heading}>Sign In</h1>
          <div className={classes.formWrapper}>
            <input
              onChange={(e) =>
                setSignInData({ ...signInData, email: e.target.value })
              }
              placeholder="Email"
              type="text"
              className={classes.input}
            />
            <input
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
              placeholder="Password"
              type="password"
              className={classes.input}
            />
            <Button
              disabled={isLoading}
              onClick={() => handleSubmit()}
              className={classes.btn}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default SignIn;
