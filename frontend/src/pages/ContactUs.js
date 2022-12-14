import React from 'react';
import Page from '../utils/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
    resize: 'none',
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

function ContactUs() {
  const classes = useStyles();
  return (
    <Page title="Contact Us">
      <div className={classes.root}>
        <div className={classes.card}>
          <h1 className={classes.heading}>Contact Us</h1>
          <div className={classes.formWrapper}>
            <input placeholder="Name" type="text" className={classes.input} />
            <input placeholder="Email" type="text" className={classes.input} />
            <textarea
              style={{ height: '80px' }}
              rows={20}
              placeholder="Your Query"
              className={classes.input}
            />
            <Button className={classes.btn}>Send</Button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default ContactUs;
