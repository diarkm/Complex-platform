import React from "react"
import { Col, Row, Card, CardBody, Button } from "reactstrap"
import Slider from "rc-slider"
import NumericInput from "react-numeric-input"
import { mobileStyle } from "../../forms/form-elements/number-input/InputStyles"

import { Redirect } from "react-router-dom"

const sliderObj = {values:{1: 500, 2: 1000, 3: 5000, 4: 10000, 5: 50000, 6: 100000, 7: 500000, 8: 1000000}}

class buyPack extends React.Component {

  state = {
    value: 1000,
    amount: 1,
    redirect: ''
  }

  onSliderChange = value => {
    this.setState({ value: sliderObj.values[value] })
  }

  onNumericInputChange = value => {
    this.setState({ amount: value })
  }

  onTransactionSend = async () => {
    let data = {
      value: this.state.value,
      count: this.state.amount
    }

    localStorage.setItem('transactionCurrent', JSON.stringify(data))
    this.setState(() => ({ redirect: '/checkout' }))
  }

  render() {
    if(this.state.redirect)
      return <Redirect to={this.state.redirect} />

    return (
      <Card>
        <CardBody className="m-3">
          <div className="text-center">
            <h4>Вложить в депозит</h4>
            <p>Выберите на какую сумму вы хотите приобрести пакет и приобретаемое количество</p>
            <Row className="justify-align-center">
              <Col>
                  <h2 className='mb-2 text-success'>${this.state.value}</h2>
                  <Slider
                    min={1}
                    max={8}
                    defaultValue={2}
                    marks={{1: 500, 2: 1000, 3: 5000, 4: 10000, 5: 50000, 6: 100000, 7: 500000, 8: 1000000}}
                    step={null}
                    reverse={this.props.rtl === "rtl"}
                    onChange={this.onSliderChange}
                  />
              </Col>
            </Row>
            <Row className="w-50 mt-3 justify-align-center mx-auto">
              <Col lg="6" md="6" sm="12">
                <p className="mr-1 d-inline">Кол-во</p>
                <NumericInput
                  min={1}
                  max={100}
                  mobile
                  onChange={this.onNumericInputChange}
                  style={mobileStyle}
                />
              </Col>
              <Col className="mt-sm-1 mt-lg-0 mt-md-0" lg="6" md="6" sm="12">
                <h3>Итого: ${this.state.value * this.state.amount}</h3>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Button.Ripple onClick={this.onTransactionSend} color="primary">Вложить</Button.Ripple>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default buyPack
