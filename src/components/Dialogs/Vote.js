import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

export default function Vote(props) {

  const clickUpArrowHandler = () => {
    props.voteHandler()
  }

  const clickDownArrowHandler = () => {
    props.unvoteHandler()
  }

  return (
    <Grid
      item
      lg={2}
      style={{
        textAlign: 'center'
      }}
    >
      <span style={{ cursor: 'pointer' }}>
        <KeyboardArrowUp
          color='primary'
          onClick={clickUpArrowHandler}
        ></KeyboardArrowUp>{' '}
      </span>
      <Typography color='textPrimary'>{props.votesState}</Typography>
      <span style={{ cursor: 'pointer' }}>
        <KeyboardArrowDown color='primary' onClick={clickDownArrowHandler} />
      </span>
    </Grid>
  )
}
