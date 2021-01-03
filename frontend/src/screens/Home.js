import {
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core"
import React, { useEffect } from "react"
import Product from "../components/Product"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import Message from "../components/Message"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 340,
  },
  media: {
    height: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
  removeSidePadding: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}))

const Home = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <Typography variant="h3" component="h2">
        Latest Products
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid key={product._id} item sm={12} md={6} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default Home
