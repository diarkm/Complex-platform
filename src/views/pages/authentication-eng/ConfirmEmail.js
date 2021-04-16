import React from "react"
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap"
import AuthenticationService from "../../../api/authentication-service";
import fgImg from "../../../assets/img/pages/forgot-password.png"
import "../../../assets/scss/pages/authentication.scss"
import {history} from "../../../history"


class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props)
    this.authenticationService = new AuthenticationService()
  }

  state = {
    code: '',
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  async onSubmit() {
    await new Promise((r) => setTimeout(r, 500));
    this.authenticationService.confirmEmail(this.state.code)
      .then(res => {
        console.log('OK', res)
        history.push("/dashboard")
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center"
              >
                <img src={fgImg} alt="fgImg"/>
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-1">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">Email confirmation required</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                  We have sent you a confirmation code by email
                  </p>
                  <CardBody className="pt-1 pb-0">
                    <Form>
                      <FormGroup className="form-label-group">
                        <Input type="text"
                               placeholder="Code"
                               value={this.state.code}
                               onChange={(e) => this.handleChange({code: e.target.value})}
                               required/>
                        <Label>Code</Label>
                      </FormGroup>
                      <div className="float-md-left d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          outline
                          className="px-75 btn-block"
                          onClick={() => history.push("/en")}
                        >
                          Back
                        </Button.Ripple>
                      </div>
                      <div className="float-md-right d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          className="px-75 btn-block"
                          onClick={e => {
                            e.preventDefault()
                            this.onSubmit()
                          }}
                        >
                          Confirm
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default ConfirmEmail
