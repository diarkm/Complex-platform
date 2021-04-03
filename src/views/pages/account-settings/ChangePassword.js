import {Field, Form, Formik} from "formik"
import React from "react"
import {Button, Col, FormGroup, Row} from "reactstrap"
import * as Yup from "yup"
import UserDataService from "../../../api/user-data-service";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import {history} from "../../../history";
import {handleErrorFromBD, onValidationError} from "../authentication/AuthServices";

const formSchema = Yup.object().shape({
  oldpass:     Yup.string().required("Это поле должно быть заполнено")
    .min(8, "Пароль должен состоять минимум из 8 символов и одной буквы")
    .matches(/(?=.*[A-Za-z-яёА-ЯЁ])(?=.*\d)[A-Za-z-яёА-ЯЁ\d]{8,}$/i, "Пароль должен состоять минимум из 8 символов и одной буквы"),
  newpass:     Yup.string().required("Это поле должно быть заполнено")
    .min(8, "Пароль должен состоять минимум из 8 символов и одной буквы")
    .matches(/(?=.*[A-Za-z-яёА-ЯЁ])(?=.*\d)[A-Za-z-яёА-ЯЁ\d]{8,}$/i, "Пароль должен состоять минимум из 8 символов и одной буквы"),
  confirmpass: Yup.string()
                 .oneOf([Yup.ref("newpass"), null], "Пароли должны совпадать")
                 .required("Это поле должно быть заполнено")
})

class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    this.userDataService.getUserData()
      .then(res => this.setState(res.user))
      .catch(err => console.log(err))
  }

  onValidationSuccess = message => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  render() {
    return (
      <React.Fragment>
        <Row className="pt-1">
          <Col sm="12">
            <Formik
              initialValues={{
                oldpass:     "",
                newpass:     "",
                confirmpass: ""
              }}
              onSubmit={(values) => {
                this.userDataService.changePassword({
                  user_id:      1,
                  old_password: values.oldpass,
                  new_password: values.newpass,
                }).then(response => {
                  console.log(response);
                    if (!response.data.response) {
                      throw new Error(response.data.errors)
                    }
                  this.onValidationSuccess('Данные успешно сохранены!')
                }).catch((err) => onValidationError(handleErrorFromBD(err.message)))
              }}
              validationSchema={formSchema}
            >
              {({errors, touched}) => (
                <Form>
                  <FormGroup>
                    <Field
                      name="oldpass"
                      id="oldpass"
                      className={`form-control ${errors.oldpass &&
                                                 touched.oldpass &&
                                                 "is-invalid"}`}
                      placeholder="Старый пароль"
                      type="password"
                    />
                    {errors.oldpass && touched.oldpass ? (
                      <div className="text-danger">{errors.oldpass}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="newpass"
                      placeholder="Новый пароль"
                      type="password"
                      id="newpass"
                      className={`form-control ${errors.newpass &&
                                                 touched.newpass &&
                                                 "is-invalid"}`}
                    />
                    {errors.newpass && touched.newpass ? (
                      <div className="text-danger">{errors.newpass}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="confirmpass"
                      id="confirmpass"
                      className={`form-control ${errors.confirmpass &&
                                                 touched.confirmpass &&
                                                 "is-invalid"}`}
                      placeholder="Подтвердите пароль"
                      type="password"
                    />
                    {errors.confirmpass && touched.confirmpass ? (
                      <div className="text-danger">{errors.confirmpass}</div>
                    ) : null}
                  </FormGroup>
                  <div className="d-flex justify-content-start flex-wrap">
                    <Button.Ripple
                      className="mr-1 mb-1"
                      color="primary"
                      type="submit"
                    >
                      Сохранить изменения
                    </Button.Ripple>
                    <Button.Ripple
                      className="mb-1"
                      color="danger"
                      type="reset"
                      outline
                    >
                      Отмена
                    </Button.Ripple>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
        <ToastContainer />
      </React.Fragment>
    )
  }
}

export default ChangePassword
