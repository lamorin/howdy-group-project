import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

export default function Vote (props) {
  const [state, setState] = useState({
    voteUpEnabled: true,
    voteDownEnabled: true,
    votes: props.votes
  })

  const clickUpArrowHandler = () => {
    if (state.voteUpEnabled) {
      // Aviso al padre
      props.voteHandler()
      setState({
        ...state,
        voteUpEnabled: false,
        voteDownEnabled: true
      })
    }
  }

  const clickDownArrowHandler = () => {
    if (props.votesState > 0 && state.voteDownEnabled) {
      props.unvoteHandler()
      setState({
        ...props,
        voteUpEnabled: true,
        voteDownEnabled: false
      })
    }
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
