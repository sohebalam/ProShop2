import React, { useState, useContext, useEffect } from "react"
import Message from "../components/Message"
import {
  Grid,
  Button,
  Link,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { savePaymentMethod } from "../actions/cartActions"
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
export default function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push("/shipping")
  }

  const classes = useStyles()
  const [payment, setPayment] = useState("PayPal")

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(payment))
    history.push("/placeorder")
    console.log(payment)
  }

  return (
    <React.Fragment>
      <Box padding={6}>
        <Box marginBottom="2rem" display="flex" justifyContent="center">
          <CheckoutSteps step1 step2 step3 />
        </Box>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>

        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <FormControl component="fieldset">
            <RadioGroup
              name="Payment Method"
              value={payment}
              // onChange={(e) => setPayment(e.target.value)}
            >
              <FormControlLabel
                value="Paypal or Credit Card"
                control={<Radio />}
                label="PayPal or Credit Card"
                onChange={(e) => setPayment(e.target.value)}
              />

              <FormControlLabel
                value="Stripe"
                control={<Radio />}
                label="Stripe (Not Avaiable)"
                disabled
                onChange={(e) => setPayment(e.target.value)}
              />
            </RadioGroup>
          </FormControl>

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
