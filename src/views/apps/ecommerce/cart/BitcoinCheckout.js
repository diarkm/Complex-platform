import React from "react"
import { toast } from "react-toastify"
import {
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  CardTitle,
  Row,
  Col,
  Input,
  Label,
  FormGroup
} from "reactstrap"
import Radio from "../../../../components/@vuexy/radio/RadioVuexy"
import NumericInput from "react-numeric-input"
import {
  Star,
  X,
  Heart,
  ShoppingCart,
  Home,
  CreditCard,
  PlusSquare
} from "react-feather"
import { mobileStyle } from "../../../forms/form-elements/number-input/InputStyles"
import Breacrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import bankLogo from "../../../../assets/img/pages/eCommerce/advcash.png"
import bitcoinLogo from "../../../../assets/img/pages/eCommerce/Bitcoin_Logo.png"
import Wizard from "../../../../components/@vuexy/wizard/WizardComponent"
import { productsList } from "./cartData"
import { AvInput, AvGroup, AvFeedback } from "availity-reactstrap-validation"

import "../../../../assets/scss/pages/app-ecommerce-shop.scss"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"

class BitcoinCheckout extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Card>
              <CardHeader className="flex-column align-items-start">
                <CardTitle>Оплата биткоином</CardTitle>
                <p className="text-muted mt-25">
                Отправьте необходимую сумму нам на кошелек: 1Lsbk6pCqqxXW36qUHqeuVVNsknDwzPFcM
                </p>
              </CardHeader>
            </Card>
      </React.Fragment>
    )
  }
}

export default BitcoinCheckout
