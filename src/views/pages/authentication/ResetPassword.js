import React from "react"
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap"
import UserDataService from "../../../api/user-data-service"
import resetImg from "../../../assets/img/pages/reset-password.png"
import "../../../assets/scss/pages/authentication.scss"
import {history} from "../../../history"

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.setState({token: this.props.match.params.token})
    this.userDataService = new UserDataService()
  }

  state = {
    token:           '',
    password:        '',
    confirmPassword: '',
  }

  componentDidMount() {
    this.checkToken();
  }

  async checkToken() {
    let data = {
      token: this.state.token,
    }
    this.userDataService.checkToken(data)
      .then(res => {
        console.log('OK', res)
        history.push("/")
      })
      .catch(err => console.log(err))
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  handleSubmit(event) {
    let data = {
      token:        this.state.token,
      new_password: this.state.password,
    }
    this.userDataService.setNewPassword(data)
      .then(res => {
        console.log('OK', res)
        history.push("/")
      })
      .catch(err => console.log(err))
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
                className="d-lg-block d-none text-center align-self-center px-5"
              >
                <img className="px-5 mx-2" src={resetImg} alt="resetImg"/>
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-50">
                  <CardHeader className="pb-1 pt-1">
                    <CardTitle>
                      <h4 className="mb-0">Восстановить пароль</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Ваш новый пароль должен отличаться от предыдущих
                  </p>
                  <CardBody className="pt-1">
                    <Form onSubmit={e => this.handleSubmit(e)}>
                      <FormGroup className="form-label-group">
                        <Input
                          type="password"
                          placeholder="Пароль"
                          value={this.state.email}
                          onChange={(e) => this.handleChange({password: e.target.value})}
                          required
                        />
                        <Label>Пароль</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group">
                        <Input
                          type="password"
                          placeholder="Подтвердите пароль"
                          value={this.state.email}
                          onChange={(e) => this.handleChange({confirmPassword: e.target.value})}
                          required
                        />
                        <Label>Подтвердите пароль</Label>
                      </FormGroup>
                      <div className="d-flex justify-content-between flex-wrap flex-sm-row flex-column">
                        <Button.Ripple
                          block
                          className="btn-block"
                          color="primary"
                          outline
                          onClick={e => {
                            e.preventDefault()
                            history.push("/")
                          }}
                        >
                          Назад
                        </Button.Ripple>
                        <Button.Ripple
                          block
                          color="primary"
                          type="submit"
                          className="btn-block mt-1 mt-sm-0"
                        >
                          Изменить пароль
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

export default ResetPassword
