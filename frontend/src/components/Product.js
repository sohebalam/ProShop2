import { Card } from "@material-ui/core"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Rating from "./Rating"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
})

const Product = ({ product }) => {
  const classes = useStyles()
  return (
    <Card style={{ height: "100%", padding: "0.75rem" }}>
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="h2"
              style={{ color: "black" }}
            >
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Typography>
            <Typography
              gutterBottom
              style={{ marginTop: "0.5rem", color: "black" }}
              variant="h5"
              component="h2"
            >
              £{product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default Product
