import React from 'react';
import Page from '../utils/Page';
import { makeStyles } from '@material-ui/core/styles';
import svg1 from './../assets/home.svg';
import ReactTypingEffect from 'react-typing-effect';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 90px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  h1: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '5px',
    fontSize: '6em',
  },
  span: { fontFamily: 'Roboto', fontWeight: 700, color: '#cb19cd' },
  desc: {
    fontFamily: 'Montserrat',
    fontWeight: 300,
    color: '#fff',
    textAlign: 'center',
    fontSize: '20px',
  },
});

function Home() {
  const classes = useStyles();

  return (
    <Page title="Home">
      <div className={classes.root}>
        <div className={classes.leftDiv}>
          <div style={{ minHeight: '250px' }}>
            <ReactTypingEffect
              typingDelay="100"
              cursor="_"
              speed="300"
              eraseSpeed="250"
              eraseDelay="3000"
              text={['Vote:It']}
              cursorRenderer={(cursor) => <h1>{cursor}</h1>}
              displayTextRenderer={(text, i) => {
                return (
                  <h1 className={classes.h1}>
                    {text.split(':')[0]}{' '}
                    <span className={classes.span}>{text.split(':')[1]}</span>
                  </h1>
                );
              }}
            />
          </div>

          {/* <h1 className={classes.h1}>
            Vote <span className={classes.span}>It</span>
          </h1> */}
          <p className={classes.desc}>
            A smart tool to create various types of polls and quizes and
            generate a small link to share it with participants. Admin
            dashboards supports realtime interective charts for better
            understanding of participants.
          </p>
        </div>
        <div className={classes.rightDiv}>
          <div style={{ width: '50%' }}>
            <img src={svg1} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Home;
