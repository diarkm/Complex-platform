import React from "react"
import { Col, Row, Input, Card, CardBody, Button } from "reactstrap"


class ReferralLink extends React.Component {
  render() {
    return (
      <Card>
        <CardBody className="m-3">
          <div className="text-center">
            <h4>Ваша ссылка для приглашения</h4>
            <p>Скопируйте ссылку и получайте бонусы за приглашенных рефералов!</p>
            <Row className="justify-align-center">
              <Col lg="10" md="10" sm="12">
                <Input type="text" id="basicInput" value="https://giq-group.com/?ref=johndoe" />
              </Col>
              <Col lg="2" md="2" sm="12">
                <Button.Ripple color="primary">Скопировать</Button.Ripple>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default ReferralLink
