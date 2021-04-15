import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap"

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
