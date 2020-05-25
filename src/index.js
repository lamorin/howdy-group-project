import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// import red from "@material-ui/core/colors/red";

// import "./index.css";
import App from './App'

const theme = createMuiTheme({
  // palette: {
  //   primary: red
  // }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App></App>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
