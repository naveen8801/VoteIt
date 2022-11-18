import React from 'react';
import Page from '../utils/Page';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 90px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function AboutUs() {
  const classes = useStyles();
  return (
    <Page title="About Us">
      <div className={classes.root}>About Us</div>
    </Page>
  );
}

export default AboutUs;
