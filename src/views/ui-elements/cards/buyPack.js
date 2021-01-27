import React from "react"
import { Col, Row, Card, CardBody } from "reactstrap"
import { ContextLayout } from "../../utility/context/Layout"
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
            <ContextLayout.Consumer>
            {context => (
              <Row className="justify-align-center">
                <Col>
                  <Slider
                    min={20}
                    defaultValue={20}
                    marks={{ 20: 20, 40: 40, 60: 60, 100: 100 }}
                    step={null}
                  />
                </Col>
              </Row>)}
              </ContextLayout.Consumer>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default buyPack
