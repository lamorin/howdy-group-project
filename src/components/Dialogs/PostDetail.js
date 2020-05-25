import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Paper,
  Button,
  Grid,
  styled,
  Typography,
  TextField,
  Box,
  makeStyles
} from '@material-ui/core'

import Vote from './Vote'

import PostReplyList from './PostReplyList.js'

const MyPaper = styled(Paper)({
  margin: 15
})

//Need to figure out how to keep text width fixed on screen size change?? Also need to understand nesting. For example should we combine the paper and box? Also how do we do fullheight for paper?
const MyBox = styled(Box)({
  marginLeft: 400,
  marginRight: 400,
  paddingTop: 15,
  paddingBottom: 15
})

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(1)
  }
}))

const MyTextField = styled(TextField)({
  marginTop: 10,
  marginBottom: 10,
  //how to make width same width as text box?
  width: '100%'
})

//Post Detail Page which allows users to reply to a saved post.

export default function PostDetail (props) {
  const classes = useStyles()
  const [postState, setPostState] = useState(props.post)
  const [formState, setformState] = useState({ text: '' })
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
    props.voteHandler(postState.id)
    setPostState(postState)
  }

  const unvote = () => {
    props.unvoteHandler(postState.id)
    setPostState(postState)
  }

  return (
    <Container maxWidth='lg'>
      <Grid>
        <Grid>
          <Typography
            style={{ margin: '1em' }}
            component='div'
            variant='body1'
            color='textPrimary'
          >
            <Link to='/'>Home Page</Link>
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Vote
            voteHandler={vote}
            unvoteHandler={unvote}
            votes={postState.votes}
            postId={postState.id}
          ></Vote>
          <Grid item xs={10}>
            <Container>
              <Container>
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
              </Container>
              <Container>
                <Typography
                  component='div'
                  variant='body1'
                  color='textPrimary'
                  // className={classes.typoBody}
                >
                  {postState.postText}
                </Typography>
              </Container>

              <form
              // onSubmit={handleSubmit}
              //form may not be necessary here since we have textfield.
              >
                <Container>
                  <MyTextField
                    id='outlined-basic'
                    // className={classes.textField}
                    // label="Comment"
                    name='reply'
                    variant='outlined'
                    //label='Reply'
                    value={textFieldState.text}
                    onChange={handleChange}
                    placeholder='Write something'
                  />
                </Container>
                <Container>
                  <Button
                    variant='outlined'
                    size='medium'
                    color='primary'
                    // className={classes.button}
                    onClick={handleSubmit} //when does this needd to be refactored as a function call?
                  >
                    Submit
                  </Button>
                </Container>

                {/*How do I filter the prop? so that the post array isn't sent to postreplies?*/}
              </form>
              <Container>
                <PostReplyList
                  // handleSubmit = {handleSubmit}
                  oldReply={replies}
                  removeReplyFunc={removeReplyFunc}
                />
              </Container>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
