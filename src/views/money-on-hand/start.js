import React from 'react'
import { useScrollToTop } from '../../components/scroll-to-top/scroll-to-top';
import Hero from '../../components/hero/hero';

import hero from '../../img/Hero_2.png';
import { useStyles } from '../../theme';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Start() {
  const classes = useStyles()
  useScrollToTop();

  return (
    <>
      <Hero
        title='myMoney Calendar'
        subtitle='See how your money flows from week to week and learn how to avoid coming up short.'
        image={hero}
        alt='myMoney Calendar'
      />
      <br />
      <div className={classes['m-hero_subhead']}>
        <p>Enter your income, expenses, and cash-on-hand to build your calendar.</p>
        <p>It's okay to estimate.</p>
        <Link class={classes['no-underline']} to="/money-on-hand/sources">
          <Button variant="contained" color="secondary" size="large" disableElevation>
            Get Started
          </Button>
        </Link>
      </div>
    </>
  );
}
