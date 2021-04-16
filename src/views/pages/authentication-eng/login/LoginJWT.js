import React from "react"
import {Link} from "react-router-dom"
import {CardBody, FormGroup, Form, Input, Button, Label, FormFeedback, Row} from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import {Mail, Lock, Check} from "react-feather"
import {loginForm} from "../../../../server"
import {connect} from "react-redux"
import {history} from "../../../../history"
import axios from 'axios';
import TokenStorage from '../../../../api/tokenStorage';
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"
import {handleErrorFromBD} from "../AuthServices";

const apiURL = 'https://cabinet.giq-group.com/back/public'

class LoginJWT extends React.Component {
  storage = new TokenStorage()

  state = {
    login: "",
    password: "",
    remember: false,
    code: undefined,
    googleAuth: {
      active: false,
      token: undefined
    },
    loginError: false,
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

      if (!response.data.response) {
        if (response.data.errors === "User is not found") {
          this.setState({loginError: true});
        }
        return this.onValidationError(handleErrorFromBD(response.data.errors));
      }

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
      window.location.href = '/dashboard'
    } catch (e) {
      console.error(e);
      console.error('An error occurred while authenticating');
    }
  }

  onValidationError = errors => {
    toast.error(errors, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  googleAuth = async () => {
    try {
      const response = await axios.post(apiURL + '/user/login/2fa', {
        token: this.state.googleAuth.token,
        code: this.state.code
      }, {
        headers: {
          Authorization: `${this.state.googleAuth.token}`
        }
      });
      if (!response.data.response) {
        return this.onValidationError(handleErrorFromBD(response.data.errors));
      }
      this.createToken(response.data.token);
      window.location.href = '/dashboard'
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
                className={this.state.loginError ? "is-invalid" : ""}
                type="text"
                placeholder="Login"
                value={this.state.login}
                onChange={e => this.setState({login: e.target.value})}
                required
              />
              {this.state.loginError && (
                <FormFeedback>User is not found</FormFeedback>
              )}
              <div className="form-control-position">
                <Mail size={15}/>
              </div>
              <Label>Login</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({password: e.target.value})}
                required
              />
              <div className="form-control-position">
                <Lock size={15}/>
              </div>
              <Label>Password</Label>
            </FormGroup>
            {this.state.googleAuth.active &&
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="Confirmation code"
                value={this.state.code}
                onChange={e => this.setState({code: e.target.value})}
                required
              />
              <div className="form-control-position">
                <Lock size={15}/>
              </div>
              <Label>Confirmation code</Label>
            </FormGroup>
            }
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16}/>}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
              <div className="float-right">
                <Link to="/en/forgot-password">Forgot your password?</Link>
              </div>
            </FormGroup>
            <Row className="justify-content-between">
                {!this.state.googleAuth.active &&
                  <Button.Ripple className="mt-1 mx-1 auth-btn" color="primary" type="submit" onClick={this.auth} style={{}}>
                    Sign in
                  </Button.Ripple>
                }
                {this.state.googleAuth.active &&
                  <Button.Ripple className="mt-1 mx-1 auth-btn" color="primary" type="submit" onClick={this.googleAuth}>
                    Sign in
                  </Button.Ripple>
                }
                  <Button.Ripple
                    color="primary"
                    outline
                    className="mt-1 mx-1 auth-btn"
                    onClick={() => {
                      history.push("/en/register")
                    }}
                  >
                    Sign up
                  </Button.Ripple>
            </Row>
          </Form>
          <ToastContainer/>
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
export default connect(mapStateToProps, {loginForm})(LoginJWT)
