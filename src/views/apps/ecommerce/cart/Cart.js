import React, {useState} from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  CardTitle,
  Row,
  Col,
} from "reactstrap"
import bankLogo from "./payment-logos/Smartpay.png"
import bitcoinLogo from "../../../../assets/img/pages/eCommerce/Bitcoin_Logo.png"

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
  const [transaction, settransaction] = useState(null)

  const paymentTypes = [
    ['btc', 'BitCoin'],
    ['card', 'Visa / MasterCard'],
    ['webmoney', 'WebMoney (WMK)'],
    ['webmoney_z', 'WebMoney (WMZ)'],
    ['qiwi', 'Qiwi-кошелек'],
    ['w1', 'WalletOne'],
    ['yandex', 'Yandex.Деньги'],
    ['ekzt', 'E-KZT'],
    ['onay', 'Карты ONAY']
  ]

  const currentTransactionKey = 'transactionCurrent'
  if(localtrans.value === 0 && localStorage.getItem(currentTransactionKey)) {
    setlocaltrans(JSON.parse(
      localStorage.getItem(currentTransactionKey)
    ))
  }

  const onSetTransaction = async () => {
    let transaction = await UserAPI.setTransaction(localtrans)

    if(transaction.response && transaction.transaction_id)
      settransaction(transaction.transaction_id)

    if (paymenttype === 1) {
      setredirect('/bitcoinCheckout')
    }
  }

  const onSetPayment = async () => {
    let payment = await UserAPI.paymentCreate({
      sum: localtrans.value * localtrans.count,
      type: paymenttype,
      transaction_id: transaction
    })

    if(payment.response && payment.link)
      window.open(payment.link,'_blank');
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
              {!transaction ? <div className="mb-3">
                <div className="vx-radio-con vx-radio-primary">
                  <input onChange={() => setpaymenttype(0)} type="radio" name="bank" />
                  <span className="vx-radio">
                    <span className="vx-radio--border"></span>
                    <span className="vx-radio--circle"></span>
                  </span>
                  <img className="rounded-circle mx-1" src={bankLogo} alt="img-placeholder" height="35" />
                  <span>SmartPay</span>
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
              </div> : <div className="mb-3">

                {paymentTypes.map((item, i) => {
                  return <div key={i} className="vx-radio-con vx-radio-primary">
                    <input onChange={() => setpaymenttype(item[0])} type="radio" name="bank" />
                    <span className="vx-radio">
                      <span className="vx-radio--border"></span>
                      <span className="vx-radio--circle"></span>
                    </span>
                    <img className="rounded-circle mx-1" src={require(`./payment-logos/${item[0]}.png`)} alt="img-placeholder" width="35" />
                    <span>{item[1]}</span>
                  </div>
                })}

              </div>}

              <div className="customer-cvv mt-1">
                  <div className="form-inline">
                  <Button onClick={() => !transaction ? onSetTransaction() : onSetPayment()} color="primary" className="ml-50 mb-50">
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
