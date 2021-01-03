import React, { useEffect, useState } from "react"
import {
  Grid,
  Card,
  Button,
  CardMedia,
  Link,
  makeStyles,
  Typography,
  CardActions,
  CardContent,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  NativeSelect,
  Box,
} from "@material-ui/core"
import Rating from "../components/Rating"
import { listProductDetails } from "../actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
}))

const ProductScreen = ({ match, history }) => {
  const classes = useStyles()
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)

  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match.params.id])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Button variant="outlined" style={{ background: "white" }}>
        <Link href="/" style={{ background: "white", color: "black" }}>
          Go Back
        </Link>
      </Button>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Grid container style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Grid item md={6}>
            <Grid item>
              <CardMedia
                image={product.image}
                title={product.title}
                className={classes.media}
              />{" "}
            </Grid>
          </Grid>
          <Grid item md={3} style={{ padding: "1rem" }}>
            <Typography component="h5" variant="h5">
              {product.name}
            </Typography>
            <Typography style={{ marginTop: "1rem" }}>
              <Rating
                value={product.rating}
                text={` ${product.numReviews} reviews`}
              />
            </Typography>
            <Typography style={{ marginTop: "1rem" }}>
              <strong>Price: ${product.price}</strong>
            </Typography>
            <Typography style={{ marginTop: "1rem" }}>
              Description: {product.description}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Card className={classes.root}>
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  <strong>Price: ${product.price}</strong>
                </Typography>
                <Typography variant="h5" component="h2">
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </Typography>

                {product.countInStock > 0 && (
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ marginTop: "1rem" }}
                  >
                    {" "}
                    QTY:
                    <NativeSelect
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </NativeSelect>
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
                  disabled={product.countInStock === 0}
                  fullWidth
                  onClick={addToCartHandler}
                >
                  Add to Card
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ProductScreen
