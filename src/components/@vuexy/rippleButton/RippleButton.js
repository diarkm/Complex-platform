import React from "react"
import PropTypes from "prop-types"
import { Button } from "reactstrap"
import Ripples from "react-ripples"

const RippleButton = ({ rippleColor, className, during, block, ...rest }) => (
  <Ripples
    color={rippleColor ? rippleColor : "rgba(255, 255, 255, .5)"}
    during={during}
    className={`${block ? "d-block" : ""}${className ?? ""}`}
  >
    <Button {...rest}  className= "w-100" />
  </Ripples>
)

RippleButton.propTypes = {
  ...Button.propTypes,
  rippleColor: PropTypes.string,
  during: PropTypes.number,
  className: PropTypes.string,
}

Button.Ripple = RippleButton
