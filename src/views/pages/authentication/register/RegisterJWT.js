import React from "react"
import {FormGroup, Input, Label, Button, CustomInput, Alert, Row, Col, FormFeedback} from "reactstrap"
import UserDataService from "../../../../api/user-data-service";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import {Check} from "react-feather"
import {connect} from "react-redux"
import {signupForm} from "../../../../server"
import {history} from "../../../../history"
import axios from 'axios';
import TokenStorage from '../../../../api/tokenStorage';
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"
import "../../../../assets/scss/pages/register.scss"
import {handleErrorFromBD, normalizePhoneInput, onValidationError, registerFormSchema} from "../AuthServices";
import {Formik, Field, Form} from "formik";

class RegisterJWT extends React.Component {
  storage = new TokenStorage()
  state = {
    ref_id: '',
    showError: false,
    errorMessage: '',
    showSuccess: false,
  }

  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  handleImage = (e,setField, setError) => {
    e.preventDefault();
    const fileTm = e.target.files[0];
    setField('avatar',fileTm);
  }

  signup = async (values) => {
    registerFormSchema.validate(values)
      .then((valid) => {
        let fd = new FormData();
        for (let item in Object.values(valid)) {
          let $keyItem = Object.keys(valid)[item]

          if (valid[$keyItem])
            fd.append($keyItem, valid[$keyItem])
        }
        axios.post('https://cabinet.giq-group.com/back/public/user/signup', fd)
          .then((response) => {
            if (response.data.response) {
              this.setState({showSuccess: true})
              setTimeout(() => history.push('/'), 2000)
            } else{
              console.log(response.data.errors);
              return onValidationError(handleErrorFromBD(response.data.errors));
            }
          }).catch((err) => console.log(err))
      }).catch((err) => {
      onValidationError(err.errors[0])
    })
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
      <Formik
        initialValues={{
          login: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPass: "",
          email: "",
          avatar: "",
          phoneNumber: "",
          showPhoneNumber: "",
          accept: false,
        }}
        validationSchema={registerFormSchema}
        onSubmit={values => {
          console.log(values);
          this.signup(values);
        }}
      >
        {({errors, touched, values, setFieldValue, setFieldError}) => (
          <Form>
            <Alert color="success" style={{display: this.state.showSuccess ? 'block' : 'none', marginBottom: 20}}>
              Вы успешно зарегестрировали свой аккаунт!
            </Alert>
            <Alert color="primary" style={{display: this.state.refererName ? 'block' : 'none'}}>
              <strong>Ваш спонсор: </strong>{this.state.refererName ? this.state.refererName : ''}
            </Alert>
            <Alert color="danger" style={{display: this.state.showError ? 'block' : 'none'}}>
              {this.state.errorMessage}
            </Alert>
            <Row>
              <Col lg="6" md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Field
                    className={`form-control
                    ${errors.login && touched.login && "is-invalid"}`}
                    name="login"
                    type="text"
                    placeholder="Логин"
                  />
                  <Label>Логин</Label>
                {errors.login && touched.login ? (
                  <FormFeedback>{errors.login} </FormFeedback>
                ) : null}
                </FormGroup>
              </Col>
              <Col lg="6" md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Field
                    className={`form-control
                    ${errors.showPhoneNumber && touched.showPhoneNumber && "is-invalid"}`}
                    name="showPhoneNumber"
                    type="tel"
                    placeholder="+7 777 777 7777"
                    onChange={e => {
                        setFieldValue('showPhoneNumber', normalizePhoneInput(e.target.value, values.phoneNumber));
                        setFieldValue('phoneNumber', e.target.value.replace(/[^\d+]/g, ''));
                    }}
                  />
                  <Label>Телефон</Label>
                  {errors.showPhoneNumber && touched.showPhoneNumber ? (
                    <FormFeedback>{errors.showPhoneNumber}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col lg="12" md="12" sm="12">
                <FormGroup className="form-label-group">
                  <Field
                    className={`form-control
                    ${errors.email && touched.email && "is-invalid"}`}
                    name="email"
                    type="email"
                    placeholder="Почта"
                  />
                  <Label>Почта</Label>
                  {errors.email && touched.email ? (
                    <FormFeedback>{errors.email}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6" md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Field
                    className={`form-control
                    ${errors.password && touched.password && "is-invalid"}`}
                    name="password"
                    type="password"
                    placeholder="Пароль"
                  />
                  <Label>Пароль</Label>
                  {errors.password && touched.password ? (
                    <FormFeedback>{errors.password}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col lg="6" md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Field
                    className={`form-control
                    ${errors.confirmPass && touched.confirmPass && "is-invalid"}`}
                    name="confirmPass"
                    type="password"
                    placeholder="Подтвердите пароль"
                  />
                  <Label>Подтвердите пароль</Label>
                  {errors.confirmPass && touched.confirmPass ? (
                    <FormFeedback>{errors.confirmPass}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6" md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Field
                    className={`form-control
                    ${errors.firstName && touched.firstName && "is-invalid"}`}
                    name="firstName"
                    type="text"
                    placeholder="Имя"
                  />
                  <Label>Имя</Label>
                  {errors.firstName && touched.firstName ? (
                    <FormFeedback>{errors.firstName}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col lg="6" md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Field
                    className={`form-control
                    ${errors.lastName && touched.lastName && "is-invalid"}`}
                    name="lastName"
                    type="text"
                    placeholder="Фамилия"
                  />
                  <Label>Фамилия</Label>
                  {errors.lastName && touched.lastName ? (
                    <FormFeedback>{errors.lastName}</FormFeedback>
                  ) : null}

                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <CustomInput
                required={false}
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                label="Выберите файл"
                id="exampleCustomFileBrowser"
                name="avatar"
                onChange={e => {
                  this.handleImage(e, setFieldValue, setFieldError);
                  console.log(e.target.value)
                }}
              />
              {errors.avatar ? (
                <div className="text-danger small">{errors.avatar}</div>
              ) : null}
            </FormGroup>
            <FormGroup className="mt-1">
              <Checkbox
                color={`primary`}
                icon={<Check className="vx-icon" size={16}/>}
                label=" Я прочитал и принимаю пользовательское соглашение."
                defaultChecked={false}
                onClick={e => {
                  setFieldValue('accept', true)
                }}
                error={errors.accept}
              />
              {errors.accept &&
              (
                <div className="text-danger small">{errors.accept}</div>
              )
              }
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
              <Button.Ripple color="primary" type="submit">
                Регистрация
              </Button.Ripple>
            </div>
            <ToastContainer/>
          </Form>
        )}
      </Formik>
    )
  }

}

const mapStateToProps = state => {
  return {
  values: state.auth.register
}
}
export default connect(mapStateToProps,
{
  signupForm
}
)(RegisterJWT)
