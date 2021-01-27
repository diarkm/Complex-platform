import React from "react"
import { Col, Row, Input, Card, CardBody, Button } from "reactstrap"
import Slider from "rc-slider"


class buyPack extends React.Component {
    
  state = {
    value: 20
  }

  onSliderChange = value => {
    this.setState({ value })
  }

  render() {
    return (
      <Card>
        <CardBody className="m-3">
          <div className="text-center">
            <h4>Вложить в депозит</h4>
            <p>Выберите на какую сумму вы хотите приобрести пакет и приобретаемое количество</p>
            <Row className="justify-align-center">
              <Col>
                <Slider
                    min={20}
                    defaultValue={20}
                    marks={{ 20: 20, 40: 40, 60: 60, 100: 100 }}
                    step={null}
                    onChange={this.onSliderChange}
                />
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default buyPack
