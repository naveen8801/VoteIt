import React from 'react';
import Page from '../utils/Page';
import { makeStyles } from '@material-ui/core/styles';
import svg from './../assets/undraw_engineering_team.svg';
import githubIcon from './../assets/github.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 90px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },
  leftDiv: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingLeft: '2rem',
  },
  rightDiv: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  heading: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#ffff',
    textAlign: 'center',
    textDecoration: 'underline #cb19cd',
  },
  desc: {
    fontFamily: 'Montserrat',
    fontWeight: 300,
    color: '#fff',
    textAlign: 'center',
    fontSize: '20px',
  },
  iconWraper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem 0',
  },
  logo: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

function AboutUs() {
  const classes = useStyles();
  return (
    <Page title="About Us">
      <div className={classes.root}>
        <div className={classes.leftDiv}>
          <h1 className={classes.heading}>About Us</h1>
          <p className={classes.desc}>
            We are young team of passionate and hardworking individauls. Always
            trying to make things easirer and effective for rest of the world.
            Feel free tu contribute to this project 🚀
          </p>
          <div className={classes.iconWraper}>
            <img
              onClick={(e) =>
                window.open('https://github.com/naveen8801/VoteIt', '_blank')
              }
              className={classes.logo}
              src={githubIcon}
            />
          </div>
        </div>
        <div className={classes.rightDiv}>
          <div style={{ width: '50%' }}>
            <img src={svg} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </Page>
  );
}

export default AboutUs;
