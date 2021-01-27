import React from "react"
import { Form, FormGroup, Input, Label, Button, CustomInput } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
import { signupForm } from "../../../../server"
import { history } from "../../../../history"
import axios from 'axios';
import TokenStorage from '../../../../api/tokenStorage';

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
    accept: false
  }

  signup = async () => {
    if (!this.state.accept)
      return alert('Примите условия соглашения');

    if (this.state.password != this.state.confirmPass)
      return alert('Введите вверные пароли');

    try {
      let fd = new FormData();
      for (let item in Object.values(this.state)) {
        fd.append(Object.keys(this.state)[item], this.state[Object.keys(this.state)[item]]);
      }

      const response = await axios.post('/user/signup', fd);
      if (response.data.response) {
        alert('Вы успешно зарегестрировали свой аккаунт! Пройдите авторизацию');
        history.push('/');
      } else return alert(response.data.errors);
    } catch (e) {
      console.error(e);
    }
  }

  handleRegister = e => {
    e.preventDefault()
    /*this.props.signupForm(
      this.state.login,
      this.state.firstName,
      this.state.lastName,
      this.state.password,
      this.state.confirmPass,
      this.state.email,
      this.state.avatar,
      this.state.phoneNumber
    )*/
  }

  componentDidMount() {
    if (this.storage.isValid())
      return history.push('/dashboard');
  }

  render() {
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Логин"
            required
            value={this.state.login}
            onChange={e => this.setState({ login: e.target.value })}
          />
          <Label>Логин</Label>
        </FormGroup>
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
        <FormGroup>
          <CustomInput
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
