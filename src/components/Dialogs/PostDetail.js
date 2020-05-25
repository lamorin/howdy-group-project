import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Button,
  Grid,
  styled,
  Typography,
  TextField
} from '@material-ui/core'

import Vote from './Vote'

import PostReplyList from './PostReplyList.js'

//Need to figure out how to keep text width fixed on screen size change?? Also need to understand nesting. For example should we combine the paper and box? Also how do we do fullheight for paper?

const MyTextField = styled(TextField)({
  marginTop: 10,
  marginBottom: 10,
  //how to make width same width as text box?
  width: '100%'
})

//Post Detail Page which allows users to reply to a saved post.

export default function PostDetail (props) {
  const [postState, setPostState] = useState(props.post)
  const [votesState, setVotesState] = useState(props.post.votes)
  const [replies, setReplies] = useState(
    props.comments.filter(comment => props.match.params.id === `${comment.id}`)
  )
  const [textFieldState, setTextFieldState] = useState({
    text: ''
  })

  const addReply = reply => {
    const newReplies = [...replies, reply]
    setReplies(newReplies)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!replies) return

    const newReply = {
      id: 69,
      PostId: postState.id,
      username: 'username999',
      reply: textFieldState.text,
      notification: true
    }

    addReply(newReply)
    setTextFieldState({ text: '' })
  }

  const handleChange = event => {
    setTextFieldState({ text: event.target.value })
  }

  const removeReplyFunc = arg => {
    const newReplyAfterRemovals = replies.filter(reply => reply.id !== arg)
    setReplies(newReplyAfterRemovals)
  }

  const vote = () => {
    props.voteHandler(props.post)
    setVotesState(props.post.votes)
  }

  const unvote = () => {
    props.unvoteHandler(props.post)
    setVotesState(props.post.votes)
  }

  return (
    <Container maxWidth='lg'>
      <Grid>
        <Grid item xs={12}>
          <Typography
            style={{ margin: '1em' }}
            component='div'
            variant='body1'
            color='textPrimary'
          >
            <Link to='/'>Home Page</Link>
          </Typography>
        </Grid>
        <Grid container alignItems={'flex-start'}>
          <Grid item xs={1}>
            <Vote
              voteHandler={vote}
              unvoteHandler={unvote}
              votesState={votesState}
              postId={postState.id}
            ></Vote>
          </Grid>
          <Grid item xs={11}>
            <Container disableGutters={true}>
              <Typography
                color='textPrimary'
                style={{
                  display: 'inline-block',
                  fontSize: '2em',
                  lineHeight: '1.1',
                  marginBottom: '0.25em'
                }}
              >
                {postState.title}
              </Typography>

              <Typography
                component='div'
                variant='body1'
                color='textPrimary'
                // className={classes.typoBody}
              >
                {postState.postText}
              </Typography>

              <form
              // onSubmit={handleSubmit}
              //form may not be necessary here since we have textfield.
              >
                <TextField
                  id='outlined-basic'
                  // className={classes.textField}
                  // label="Comment"
                  name='reply'
                  variant='outlined'
                  //label='Reply'
                  value={textFieldState.text}
                  onChange={handleChange}
                  placeholder='Write something'
                  fullWidth
                  margin={'normal'}
                />

                <Button
                  variant='outlined'
                  size='medium'
                  color='primary'
                  // className={classes.button}
                  onClick={handleSubmit} //when does this needd to be refactored as a function call?
                >
                  Submit
                </Button>

                {/*How do I filter the prop? so that the post array isn't sent to postreplies?*/}
              </form>

              <PostReplyList
                // handleSubmit = {handleSubmit}
                oldReply={replies}
                removeReplyFunc={removeReplyFunc}
              />
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
