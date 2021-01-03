import React from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  Link,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { makeStyles } from "@material-ui/core/styles"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import PersonIcon from "@material-ui/icons/Person"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const classes = useStyles()
  return (
    <div>
      <Box component="div"></Box>
      <Box component="nav">
        <AppBar position="static" style={{ background: "#FF007F" }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              OFU
            </Typography>
            <Button>
              <Link style={{ color: "white" }} href="/cart">
                <ShoppingCartIcon style={{ marginRight: "0.25rem" }} />
                Cart
              </Link>
            </Button>
            <Button color="inherit" style={{ marginLeft: "0.5rem" }}>
              <Link style={{ color: "white" }} href="/login">
                <PersonIcon style={{ marginRight: "0.25rem" }} />
                Login
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default NavBar
