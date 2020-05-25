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
    console.log('...HOLA...')
    if (state.voteUpEnabled) {
      props.voteHandler(props.postId)
      setState({
        ...state,
        votes: state.votes + 1,
        voteUpEnabled: state.votes,
        voteDownEnabled: true
      })
    }
  }

  const clickDownArrowHandler = () => {
    if (state.votes > 0 && state.voteDownEnabled) {
      props.unvoteHandler(props.postId)
      setState({
        ...props,
        votes: state.votes - 1,
        voteUpEnabled: true,
        voteDownEnabled: false
      })
    }
  }

  return (
    <Grid
      item
      xs={1}
      style={{
        textAlign: 'center'
      }}
    >
      <KeyboardArrowUp color='primary' onClick={clickUpArrowHandler} />
      <Typography color='textPrimary'>{state.votes}</Typography>
      <KeyboardArrowDown color='primary' onClick={clickDownArrowHandler} />
    </Grid>
  )
}
