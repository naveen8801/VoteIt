import React, { useState } from 'react';
import Page from '../utils/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { register } from '../api/api';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/helpers';
import { useDispatch } from 'react-redux';
import { setLogin, setUser } from '../action';

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

function SignUp() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (signUpData.email.trim().length === 0) {
      toast.error('Email is required !');
      setIsLoading(false);
      return;
    }
    if (signUpData.password.trim().length === 0) {
      toast.error('Password is required !');
      setIsLoading(false);
      return;
    }
    if (signUpData.name.trim().length === 0) {
      toast.error('Name is required !');
      setIsLoading(false);
      return;
    }

    const payload = signUpData;

    try {
      const { data } = await register(payload);
      if (data.token) {
        localStorage.setItem('vote-it-token', data?.token);
        dispatch(setLogin());
        toast.success('Sign Up Successfull 🚀');
      }
      if (data.data) {
        dispatch(setUser(data?.data));
      }
    } catch (err) {
      console.log(err);
      toast.error(getErrorMessage(err));
    }
    setIsLoading(false);
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
            <Button
              disabled={isLoading}
              onClick={() => handleSubmit()}
              className={classes.btn}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default SignUp;
