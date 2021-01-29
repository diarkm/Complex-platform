import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginForm } from "../../../../server"
import { connect } from "react-redux"
import { history } from "../../../../history"

const apiURL = 'http://cabinet.giq-group.com/back/public'

class LoginJWT extends React.Component {
  state = {
    login: "johndoe",
    password: "demodemo",
    remember: false
  }

  handleLogin = e => {
    e.preventDefault()
    //this.props.loginForm(this.state)
  }

  createToken = (token) => {
    this.storage.write(token, this.state.remember);
  }

  auth = async () => {
    try {
      const response = await axios.post(apiURL + '/user/login', {
        login: this.state.login,
        password: this.state.password,
        remember: this.remember
      });

      if (response.data.response === false)
        return alert('Вы ввели неверно логин или пароль');

      if (response.data["2FA"] === true) {
        this.setState({
          googleAuth: {
            active: true,
            token: response.data.token
          }
        });
        return;
      }

      this.createToken(response.data.token);
      history.push("/dashboard");
    } catch (e) {
      console.error(e);
      console.error('Произошла ошибка при аутентификации');
    }
  }

  googleAuth = async () => {
    try {
      const response = await axios.post(apiURL + '/user/login/2fa', {
        token: this.state.googleAuth.token,
        code: this.state.code
      });

      if (response.data.response === false)
        return alert('Неверно введен код подтверждения');

      this.createToken(response.data.token);
      history.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    if (this.storage.isValid())
      return history.push('/dashboard');
  }

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="johndoe"
                value={this.state.login}
                onChange={e => this.setState({ login: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Логин</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Пароль"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Пароль</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Запомнить меня"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
              <div className="float-right">
                <Link to="/forgot-password">Забыли пароль?</Link>
              </div>
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  history.push("/register")
                }}
              >
                Регистрация
              </Button.Ripple>
              <Button.Ripple color="primary" type="submit">
                Войти
              </Button.Ripple>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}
export default connect(mapStateToProps, { loginForm })(LoginJWT)
