import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/Home"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginForm from "./screens/LoginScreen"
import RegisterForm from "./screens/RegisterScreen"
import { Box, CssBaseline } from "@material-ui/core"
import ProfileScreen from "./screens/ProfileScreen"

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Box style={{ marginTop: "0.5rem" }}>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/profile" component={ProfileScreen} />
        </Container>
      </Box>
      <Footer />
    </Router>
  )
}

export default App
