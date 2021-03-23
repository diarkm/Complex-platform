import React from "react"
import { Form, FormGroup, Input, Label, Button, CustomInput, Alert, Row, Col } from "reactstrap"
import UserDataService from "../../../../api/user-data-service";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
import { signupForm } from "../../../../server"
import { history } from "../../../../history"
import axios from 'axios';
import TokenStorage from '../../../../api/tokenStorage';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"
import "../../../../assets/scss/pages/register.scss"

class RegisterJWT extends React.Component {
  storage = new TokenStorage()

  state = {
    login: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
    email: "",
    avatar: "",
    phoneNumber: "",
    accept: false,
    ref_id: '',
    showError: false,
    errorMessage: ''
  }

  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  onValidationError = errors => {
    toast.error(errors, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  onValidationSuccess = message => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  signup = async () => {
    if (!this.state.accept){
      this.onValidationError('Пожалуйста примите пользовательское соглашение');
      return
    }

    if (this.state.password != this.state.confirmPass){
      this.onValidationError('Пароли не совпадают');
      return
    }

    if (this.state.login.length == 0) {
      this.onValidationError('Введите логин');
      return
    }

    if (this.state.email.length == 0) {
      this.onValidationError('Введите почту');
      return
    }

    if (this.state.phoneNumber.length == 0) {
      this.onValidationError('Введите номер телефона');
      return
    }

    if (this.state.firstName.length == 0 || this.state.lastName.length == 0) {
      this.onValidationError('Введите имя и фамилию');
      return
    }

    try {
      let fd = new FormData();
      for (let item in Object.values(this.state)) {
        let $keyItem = Object.keys(this.state)[item]

        if(this.state[$keyItem])
          fd.append($keyItem, this.state[$keyItem])
      }

      const response = await axios.post('https://cabinet.giq-group.com/back/public/user/signup', fd);
      if (response.data.response) {
        alert('Вы успешно зарегестрировали свой аккаунт! Пройдите авторизацию');
        history.push('/');
      } else return this.onValidationError(response.data.errors);
    } catch (e) {
      console.error(e);
    }
  }

  handleRegister = e => {
    e.preventDefault()
  }

  componentDidMount() {
    if (this.storage.isValid())
      return history.push('/dashboard');
    this.setState({referer: this.props.referer, ref_id: this.props.referer})
    if (this.props.referer) {
      this.getReferrerByLogin(this.props.referer)
    }
  }

  getReferrerByLogin(login) {
    this.userDataService.getReferrerByLogin(login)
      .then(res => {
        this.setState({refererName: res.user ? `${res.user.firstName} ${res.user.lastName}` : null})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        <Alert color="primary" style={{display: this.state.refererName ? 'block' : 'none' }}>
          <strong>Ваш спонсор: </strong>{this.state.refererName ? this.state.refererName : ''}
        </Alert>
        <Alert color="danger" style={{display: this.state.showError ? 'block' : 'none' }}>
          {this.state.errorMessage}
        </Alert>
        <Row>
          <Col lg="6" md="6" sm="12">
            <FormGroup className="form-label-group">
              <Input
                type="text"
                placeholder="Логин"
                required
                value={this.state.login}
                onChange={e => this.setState({ login: e.target.value.replace(/[^\w\s]/gi, "") })}
              />
              <Label>Логин</Label>
            </FormGroup>
          </Col>
          <Col lg="6" md="6" sm="12">
            <FormGroup className="form-label-group">
              <Input
                type="tel"
                placeholder="+7 777 777 7777"
                required
                value={this.state.phoneNumber}
                onChange={e => this.setState({ phoneNumber: e.target.value })}
              />
              <Label>Телефон</Label>
            </FormGroup>
          </Col>
          <Col lg="12" md="12" sm="12">
            <FormGroup className="form-label-group">
              <Input
                type="email"
                placeholder="Почта"
                required
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Label>Почта</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="6" sm="12">
            <FormGroup className="form-label-group">
              <Input
                type="password"
                placeholder="Пароль"
                required
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <Label>Пароль</Label>
            </FormGroup>
          </Col>
          <Col lg="6" md="6" sm="12">
            <FormGroup className="form-label-group">
              <Input
                type="password"
                placeholder="Подтвердите пароль"
                required
                value={this.state.confirmPass}
                onChange={
                  e => { this.setState({ confirmPass: e.target.value }) }
                }
              />
              <Label>Подтвердите пароль</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="6" sm="12">
            <FormGroup className="form-label-group">
              <Input
                type="text"
                placeholder="Имя"
                required
                value={this.state.firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
              />
              <Label>Имя</Label>
            </FormGroup>
          </Col>
          <Col lg="6" md="6" sm="12">
            <FormGroup className="form-label-group">
              <Input
                type="text"
                placeholder="Фамилия"
                required
                value={this.state.lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
              />
              <Label>Фамилия</Label>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <CustomInput
            required={false}
            type="file"
            label="Выберите файл"
            id="exampleCustomFileBrowser"
            name="customFile"
            onChange={e => {this.setState({avatar: e.target.files[0]}); console.log(e.target.value)}}
            />
        </FormGroup>
        <FormGroup className="mt-1">
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label=" Я прочитал и принимаю пользовательское соглашение."
            defaultChecked={false}
            onClick={e => {this.setState({accept: true})}}
          />
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              history.push("/")
            }}
          >
            Войти
          </Button.Ripple>
          <Button.Ripple color="primary" type="button" onClick={this.signup}>
            Регистрация
          </Button.Ripple>
        </div>
        <ToastContainer />
      </Form>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.register
  }
}
export default connect(mapStateToProps, { signupForm })(RegisterJWT)
