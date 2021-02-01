import React from "react"
import { Button, Form, FormGroup, Input, Label, Row, Col, CustomInput } from "reactstrap"
import chroma from "chroma-js"

import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"


class InfoTab extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    console.log(checked)
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={e => e.preventDefault()}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="rek">Реквизиты</Label>
                <Input
                  type="textarea"
                  name="rek"
                  id="bio"
                  rows="3"
                  placeholder="XXXX XXXX XXXX 1234"
                />
              </FormGroup>
            </Col>
            <Col>
              <CustomInput
                className="custom-switch-success mr-1 mb-2"
                type="switch"
                id="success"
                name="success"
                onChange={this.handleChange}
                checked={this.state.checked}
                inline
              >
                <span className="mb-0 switch-label">Двухфакторная аутентификация</span>
              </CustomInput>
            </Col>
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple className="mr-50" type="submit" color="primary">
                Сохранить изменения
              </Button.Ripple>
              <Button.Ripple type="submit" color="danger">
                Отмена
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    )
  }
}
export default InfoTab
