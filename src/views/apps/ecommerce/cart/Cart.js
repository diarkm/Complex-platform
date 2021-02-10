import React, {useState} from "react"
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
import { Redirect } from "react-router-dom"

import UserDataService from '../../../../api/user-data-service'

let UserAPI = new UserDataService()

const Checkout = () => {
  const [redirect, setredirect] = useState(null)
  const [localtrans, setlocaltrans] = useState({
    value: 0,
    count: 0
  })
  const [paymenttype, setpaymenttype] = useState(0)

  const currentTransactionKey = 'transactionCurrent'
  if(localtrans.value == 0 && localStorage.getItem(currentTransactionKey)) {
    setlocaltrans(JSON.parse(
      localStorage.getItem(currentTransactionKey)
    ))
  }

  const onSetTransaction = () => {
    UserAPI.setTransaction(localtrans)

    if (paymenttype === 1) {
      setredirect('/bitcoinCheckout')
    }
  }

  return (
    <React.Fragment>
      {redirect ? <Redirect to={redirect} /> : ''}
      <Row>
        <Col lg="7" md="7" sm="12">
          <Card>
            <CardHeader className="flex-column align-items-start">
              <CardTitle>Детали оплаты</CardTitle>
              <p className="text-muted mt-25">
              Выбери способ оплаты
              </p>
            </CardHeader>
            <CardBody className="d-block">
              <div className="mb-3">
                <div className="vx-radio-con vx-radio-primary">
                  <input onChange={() => setpaymenttype(0)} type="radio" name="bank" />
                  <span className="vx-radio">
                    <span className="vx-radio--border"></span>
                    <span className="vx-radio--circle"></span>
                  </span>
                  <img className="rounded-circle mx-1" src={bankLogo} alt="img-placeholder" height="40" />
                  <span>AdvCash</span>
                </div>
                <div className="vx-radio-con vx-radio-primary">
                  <input onChange={() => setpaymenttype(1)} type="radio" name="bank" />
                  <span className="vx-radio">
                    <span className="vx-radio--border"></span>
                    <span className="vx-radio--circle"></span>
                  </span>
                  <img className="mx-1" src={bitcoinLogo} alt="img-placeholder" height="40" />
                  <span>Bitcoin</span>
                </div>
              </div>
              <div className="customer-cvv mt-1">
                  <div className="form-inline">
                  <Button onClick={onSetTransaction} color="primary" className="ml-50 mb-50">
                    {" "}
                    Продолжить{" "}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="5" md="5" sm="12">
          <Card>
            <CardHeader>
              <CardTitle>Стоимость</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="detail d-flex justify-content-between">
                <div className="details title">Цена за 1 заказ</div>
                <div className="detail-amt">
                  <strong>${localtrans.value}</strong>
                </div>
              </div>
              <hr />
              <div className="detail d-flex justify-content-between">
                <div className="details title">Итого ({localtrans.count} шт.)</div>
                <div className="detail-amt text-success">
                  <strong>${localtrans.count * localtrans.value}</strong>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Checkout
