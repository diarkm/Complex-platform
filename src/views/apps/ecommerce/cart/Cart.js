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
import bankLogo from "../../../../assets/img/pages/eCommerce/bank.png"
import Wizard from "../../../../components/@vuexy/wizard/WizardComponent"
import { productsList } from "./cartData"
import { AvInput, AvGroup, AvFeedback } from "availity-reactstrap-validation"

import "../../../../assets/scss/pages/app-ecommerce-shop.scss"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    steps: [
      {
        title: <CreditCard size={22} />,
        content: (
          <div className="list-view product-checkout">
            <div className="payment-type">
              <Card>
                <CardHeader className="flex-column align-items-start">
                  <CardTitle>Payment options</CardTitle>
                  <p className="text-muted mt-25">
                    Be sure to click on correct payment option
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="vx-radio-con vx-radio-primary">
                      <input type="radio" name="bank" />
                      <span className="vx-radio">
                        <span className="vx-radio--border"></span>
                        <span className="vx-radio--circle"></span>
                      </span>
                      <img src={bankLogo} alt="img-placeholder" height="40" />
                      <span>US Unlocked Debit Card 12XX XXXX XXXX 0000</span>
                    </div>
                    <div className="card-holder-name mt-75">John Doe</div>
                    <div className="card-expiration-date mt-75">11/2020</div>
                  </div>
                  <div className="customer-cvv mt-1">
                    <div className="form-inline">
                      <Label for="cvv">Enter CVV:</Label>
                      <AvInput
                        type="number"
                        className="input-cvv ml-75 mb-50"
                        id="cvv"
                        name="cvv"
                        required
                      />
                      <Button color="primary" className="ml-50 mb-50">
                        {" "}
                        Continue{" "}
                      </Button>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <ul className="other-payment-options list-unstyled">
                    <li className="py-25">
                      <Radio
                        label="Credit / Debit / ATM Card"
                        color="primary"
                        defaultChecked={false}
                        name="paymentType"
                      />
                    </li>
                    <li className="py-25">
                      <Radio
                        label="Net Banking"
                        color="primary"
                        defaultChecked={false}
                        name="paymentType"
                      />
                    </li>
                    <li className="py-25">
                      <Radio
                        label="EMI (Easy Installment)"
                        color="primary"
                        defaultChecked={false}
                        name="paymentType"
                      />
                    </li>
                    <li className="py-25">
                      <Radio
                        label="Cash On Delivery"
                        color="primary"
                        defaultChecked={false}
                        name="paymentType"
                      />
                    </li>
                  </ul>
                  <hr />
                  <div className="gift-card">
                    <p>
                      <PlusSquare size={22} />
                      <span className="align-middle ml-25">Add Gift Card</span>
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="amount-payable checkout-options">
              <Card>
                <CardHeader>
                  <CardTitle>Price Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="detail">
                    <div className="details title">Price of 3 items</div>
                    <div className="detail-amt">
                      <strong>$699.30</strong>
                    </div>
                  </div>
                  <div className="detail">
                    <div className="details title">Delivery Charges</div>
                    <div className="detail-amt discount-amt">
                      <strong>Free</strong>
                    </div>
                  </div>
                  <hr />
                  <div className="detail">
                    <div className="details title">Amount Payable</div>
                    <div className="detail-amt">
                      <strong>$699.30</strong>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )
      }
    ]
  }
  
  render() {
    const { steps, activeStep } = this.state
    return (
      <React.Fragment>
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
                    <input type="radio" name="bank" />
                    <span className="vx-radio">
                      <span className="vx-radio--border"></span>
                      <span className="vx-radio--circle"></span>
                    </span>
                    <img src={bankLogo} alt="img-placeholder" height="40" />
                    <span>AdvCash</span>
                  </div>
                  <div className="vx-radio-con vx-radio-primary">
                    <input type="radio" name="bank" />
                    <span className="vx-radio">
                      <span className="vx-radio--border"></span>
                      <span className="vx-radio--circle"></span>
                    </span>
                    <img src={bankLogo} alt="img-placeholder" height="40" />
                    <span>Bitcoin</span>
                  </div>
                </div>
                <div className="customer-cvv mt-1">
                    <div className="form-inline">
                    <Button color="primary" className="ml-50 mb-50">
                      {" "}
                      Continue{" "}
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
                <div className="detail">
                  <div className="details title">Цена за 1 заказ</div>
                  <div className="detail-amt">
                    <strong>$699.30</strong>
                  </div>
                </div>
                <div className="detail">
                  <div className="details title">Delivery Charges</div>
                  <div className="detail-amt discount-amt">
                    <strong>Free</strong>
                  </div>
                </div>
                <hr />
                <div className="detail">
                  <div className="details title">Amount Payable</div>
                  <div className="detail-amt">
                    <strong>$699.30</strong>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Checkout
