import React from "react"
import { Alert } from "@material-ui/lab"

const Message = ({ variant, children }) => {
  return (
    <div>
      <Alert variant={variant}>{children}</Alert>
    </div>
  )
}
Message.defaultProps = {
  variant: "info",
}

export default Message
