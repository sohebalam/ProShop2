import React, { useEffect } from "react"
import Image from "material-ui-image"
import Message from "../components/Message"
import {
  Grid,
  Button,
  Link,
  Typography,
  Box,
  Card,
  List,
  CardMedia,
  makeStyles,
  CardContent,
  CardActions,
  CircularProgress,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getOrderDetails } from "../actions/orderActions"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const OrderScreen = ({ match }) => {
  const classes = useStyles()

  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [orderId])

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <Message varian="warning">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Grid container>
        <Grid item md={8}>
          <Card>
            <Box padding="1rem">
              <Box>
                <Typography>
                  <Box>
                    <strong>Name: </strong> {order.user.name},{" "}
                  </Box>
                  <Box>
                    <strong>Email: </strong>
                    <a href={`mailto: ${order.user.email}`}>
                      {" "}
                      {order.user.email}
                    </a>
                  </Box>
                </Typography>
                <Typography>
                  <strong> Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  , {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </Typography>
                <Typography>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Paid on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="warning">Not Delivered</Message>
                  )}
                </Typography>
              </Box>
              <hr />
              <Box>
                <Typography>
                  <strong>Payment Method: </strong> {order.paymentMethod},
                </Typography>
                <Typography>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="warning">Not Paid</Message>
                  )}
                </Typography>
              </Box>
              <hr />
              <Box>
                <Typography>
                  <strong>Order Items:</strong>{" "}
                  {order.orderItems === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <Typography>
                      {order.orderItems.map((item, index) => (
                        <List key={index}>
                          <Grid container item>
                            <Grid item md={1} style={{ padding: "0rem" }}>
                              <Image src={item.image} title={item.title} />
                            </Grid>
                            <Grid item style={{ padding: "0.5rem" }}>
                              <Link href={`/product/${item.product}`} />
                              {item.name}
                            </Grid>
                            <Grid item md={4} style={{ padding: "0.5rem" }}>
                              {item.qty} x £{item.price} = £
                              {item.qty * item.price}
                            </Grid>
                          </Grid>
                        </List>
                      ))}
                    </Typography>
                  )}{" "}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid md={4}>
          <Card className={classes.root} style={{ marginLeft: "1rem" }}>
            <CardContent>
              <Grid container style={{ padding: "0.25rem" }}>
                <Box style={{ marginInlineStart: "2.5rem" }}>
                  <Typography
                    variant="h4"
                    component="h4"
                    color="textPrimary"
                    gutterBottom
                  >
                    Order Summary
                  </Typography>
                </Box>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Price of Items:
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Shipping Price:
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Tax:
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Total:
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.itemsPrice}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.shippingPrice}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.taxPrice}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.taxPrice}
                  </Typography>
                </Grid>
              </Grid>

              <CardActions>{/* <Button /> */}</CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderScreen
