import { Button, Typography, Link, Box } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../actions/userActions"
import PersonIcon from "@material-ui/icons/Person"
import AssignmentIcon from "@material-ui/icons/Assignment"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const UserLoggedIn = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  const registerHandler = () => {}
  const loginHandler = () => {}

  return (
    <>
      <Button>
        <Link style={{ color: "white" }} href="/cart">
          <ShoppingCartIcon style={{ marginRight: "0.25rem" }} />
          Cart
        </Link>
      </Button>
      {userInfo ? (
        <>
          <Box
            style={{
              marginRight: "0.25rem",
              marginLeft: "0.75rem",
              marginTop: "0.75",
            }}
          >
            <Typography style={{ marginTop: "0.25rem" }}>
              {" "}
              Hello {userInfo.name}{" "}
            </Typography>
          </Box>
          <Box style={{ marginTop: "0.25rem" }}>
            <Button
              color="inherit"
              onClick={logoutHandler}
              style={{ marginRight: "0.5rem" }}
            >
              <ExitToAppIcon style={{ marginRight: "0.25rem" }} />
              LogOut
            </Button>
          </Box>
        </>
      ) : (
        <>
          {" "}
          <Button color="inherit" onClick={registerHandler}>
            <Link style={{ color: "white" }} href="/register">
              <AssignmentIcon style={{ marginRight: "0.25rem" }} />
              Register
            </Link>
          </Button>
          <Button color="inherit" onClick={loginHandler}>
            <Link style={{ color: "white" }} href="/login">
              <PersonIcon style={{ marginRight: "0.25rem" }} />
              Login
            </Link>
          </Button>
        </>
      )}
    </>
  )
}
export default UserLoggedIn
