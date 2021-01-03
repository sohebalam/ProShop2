import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import {
  CardMedia,
  Grid,
  Link,
  Typography,
  makeStyles,
  NativeSelect,
  Button,
  Card,
  Paper,
} from "@material-ui/core"
import { addToCart, removeFromCart } from "../actions/cartActions"
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "8rem",
  },
}))

const CartScreen = ({ match, location, history }) => {
  const classes = useStyles()

  const productId = match.params.id

  const qty = location.search ? Number(location.search.split("=")[1]) : 1
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, qty, productId])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping")
  }

  return (
    <Grid container>
      <Grid item md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Grid container>
            {cartItems.map((item) => (
              <Grid container key={item.product} style={{ height: "10rem" }}>
                <Card style={{ width: "100%", marginTop: "1rem" }}>
                  <Grid container xs={12} item style={{ padding: "0.75rem" }}>
                    <Grid item md={3}>
                      <CardMedia image={item.image} className={classes.media} />
                    </Grid>
                    <Grid item md={3} style={{ padding: "0.75rem" }}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Grid>
                    <Grid item md={2} style={{ padding: "0.75rem" }}>
                      ${item.price}
                    </Grid>
                    <Grid item md={2} style={{ padding: "0.75rem" }}>
                      <Typography variant="body2" component="p" padding={2}>
                        {" "}
                        QTY:{" "}
                        <NativeSelect
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </NativeSelect>
                      </Typography>
                    </Grid>
                    <Grid item style={{ padding: "1rem", marginTop: "1rem" }}>
                      <Button
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Grid md={3}>
        <Card style={{ marginLeft: "1rem", width: "100%" }}>
          <Grid container style={{ padding: "1rem" }}>
            <Grid item style={{ marginLeft: "1rem" }}>
              <h3>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h3>
              TOTAL PRICE: £
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </Grid>
            <Grid item style={{ marginLeft: "1rem", marginTop: "1rem" }}>
              <Button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                variant="contained"
              >
                Proceed To Checkout
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CartScreen
