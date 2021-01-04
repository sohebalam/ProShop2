import React from "react"
import { Alert } from "@material-ui/lab"

const Message = ({ variant, children }) => {
  return (
    <div>
      <Alert severity={variant}>{children}</Alert>
    </div>
  )
}
// Message.defaultProps = {
//   variant: "warning",
// }

export default Message
