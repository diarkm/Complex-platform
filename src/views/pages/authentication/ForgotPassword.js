import React from "react"
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap"
import UserDataService from "../../../api/user-data-service"
import fgImg from "../../../assets/img/pages/forgot-password.png"
import "../../../assets/scss/pages/authentication.scss"
import "react-toastify/dist/ReactToastify.css"
import {history} from "../../../history"
import {toast, ToastContainer} from "react-toastify"
import { forgotPasswordFormSchema, onValidationError, onValidationSuccess} from "./AuthServices";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  state = {
    email: '',
    showSuccess: false,
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  handleSubmit(event) {
    forgotPasswordFormSchema.validate(this.state)
      .then((val) => {
        let data = {
          email: val.email,
        }
        this.userDataService.restorePassword(data)
          .then(res => {
            onValidationSuccess('Отправили ссылку для восстановления')
            console.log('OK', res)
          })
          .catch(err => console.log(err))
      })
      .catch((err)=> {
      onValidationError(err.errors[0])
    })
        event.preventDefault();
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
                      <h4 className="mb-0">Забыли пароль?</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Введите свою почту и мы вышлем вам письмо с дальнейшими инструкциями
                  </p>
                  <CardBody className="pt-1 pb-0">
                    <Form onSubmit={e => this.handleSubmit(e)}>
                      <FormGroup className="form-label-group">
                        <Input type="text" placeholder="Email"
                               value={this.state.email}
                               onChange={(e) => this.handleChange({email: e.target.value})}
                               required/>
                        <Label>Почта</Label>
                      </FormGroup>
                      <div className="float-md-left d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          outline
                          className="px-75 btn-block"
                          onClick={() => history.push("/")}
                        >
                          Назад
                        </Button.Ripple>
                      </div>
                      <div className="float-md-right d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          className="px-75 btn-block"
                        >
                          Восстановить пароль
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <ToastContainer/>
      </Row>
    )
  }
}

export default ForgotPassword
