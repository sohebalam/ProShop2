import React, { useEffect, useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import UpdateIcon from "@material-ui/icons/Update"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import Message from "../components/Message"
import { Grid, Button, CircularProgress, Box } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, updateUserDetails } from "../actions/userActions"
import { USER_UPDATE_RESET } from "../constants/userConstants"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ProfileScreen({ location, history }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState(null)

  const userDetails = useSelector((state) => state.userDetails)

  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)

  const { success } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_RESET })
        dispatch(getUserDetails("profile"))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not Match")
    } else {
      dispatch(updateUserDetails({ id: user._id, name, email, password }))
    }
  }

  return (
    <Grid container>
      <Grid item md={4}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <UpdateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="warning">{message}</Message>}
          {success && (
            <Message variant="success">{success} Profile Updated</Message>
          )}
          {loading && <CircularProgress />}
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ConfirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="ConfirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update User
            </Button>
          </form>
        </div>
      </Grid>

      <Grid item med={8}>
        <Box marginLeft="1rem">
          <Typography component="h1" variant="h4">
            Orders
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
