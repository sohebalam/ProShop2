import React, { useState, useContext, useEffect } from "react"
import Message from "../components/Message"
import { Grid, Button, Link, CircularProgress, Box } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { saveAddress } from "../actions/cartActions"
import CheckoutSteps from "../components/checkoutSteps"

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
export default function AddressForm({ history }) {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { shippingAddress } = cart

  const classes = useStyles()
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveAddress({ address, city, postalCode, country }))
    history.push("/payment")
  }

  return (
    <React.Fragment>
      <Box padding={6}>
        <Box marginBottom="2rem" display="flex" justifyContent="center">
          <CheckoutSteps step1 step2 />
        </Box>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="Address"
                name="Address"
                label="Address"
                fullWidth
                autoComplete="address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                id="City"
                name="City"
                label="City"
                fullWidth
                autoComplete="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Postal Code"
                name="Postal Code"
                label="Postal Code"
                fullWidth
                autoComplete="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label="Use this address for payment details"
              />
            </Grid>
          </Grid>
          <Box marginTop="2rem">
            <Button type="submit" variant="contained">
              Continue
            </Button>
          </Box>
        </form>
      </Box>
    </React.Fragment>
  )
}
