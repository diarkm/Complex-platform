import {Field, Form, Formik} from "formik";
import {Alert, Button, Col, FormFeedback, FormGroup, Label, Row} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import React from "react";

import { FormattedMessage } from "react-intl";

export default function GeneralForm (props){

  return(
    <Formik
      enableReinitialize={true}
      initialValues={{
        login: props.login,
        email: props.email,
        firstName: props.firstName ,
        lastName: props.lastName,
        phoneNumber: props.phoneNumber,
        disabled: true,
      }}
      validationSchema={props.schema}
      onSubmit={values => {
        let userData = {
          login: values.login,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
        }
        props.submit(userData)
      }}>
      {({errors, touched, values, dirty}) => (
        <Form className="mt-2">
          <Row>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="userName"><FormattedMessage id="Логин"/></Label>
                {values.login !== null ?
                  <Field
                    className='form-control'
                    name="login"
                    id="userName"
                    readOnly/> : <Skeleton height={35}/>
                }
              </FormGroup>
            </Col>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="email"><FormattedMessage id="Почта"/></Label>
                {values.email !== null ?
                  <Field
                    name="email"
                    className={`form-control
                    ${errors.email && touched.email && "is-invalid"}`}
                    id="email"
                  /> : <Skeleton height={35}/>
                }
                {errors.email && touched.email ? (
                  <FormFeedback>{errors.email}</FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="name"><FormattedMessage id="Имя"/></Label>
                {values.firstName !== null ?
                  <Field
                    className={`form-control
                    ${errors.firstName && touched.firstName && "is-invalid"}`}
                    id="name"
                    name="firstName"
                  /> :
                  <Skeleton height={35}/>
                }
                {errors.firstName && touched.firstName ? (
                  <FormFeedback>{errors.firstName}</FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="lastName"><FormattedMessage id="Фамилия"/></Label>
                {values.lastName !== null ?
                  <Field
                    className={`form-control
                          ${errors.lastName && touched.lastName && "is-invalid"}`}
                    id="lastName"
                    name="lastName"
                  /> :
                  <Skeleton height={35}/>
                }
                {errors.lastName && touched.lastName ? (
                  <FormFeedback>{errors.lastName}</FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="tel"><FormattedMessage id="Телефон"/></Label>
                {values.phoneNumber !== null ?
                  <Field
                    className={`form-control
                          ${errors.phoneNumber && touched.phoneNumber && "is-invalid"}`}
                    id="tel"
                    name="phoneNumber"
                  /> :
                  <Skeleton height={35}/>
                }
                {errors.phoneNumber && touched.phoneNumber ? (
                  <FormFeedback>{errors.phoneNumber}</FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col sm="12">
              <Alert
                className="mb-2"
                color="warning"
                isOpen={props.visible}
                toggle={() => props.dismissAlert()}
                style={{display:  props.confirmed === 0 ? 'block' : 'none'}}
              >
                <p className="mb-0">
                <FormattedMessage id="Ваша почта не подтверждена. Мы выслали вам код с дальнейшей инструкцией по активации"/>.<br></br>
                  <a href="#sendCode" className="text-primary" onClick={e => this.resendConfirmEmail()}><FormattedMessage id="Отправить код повторно"/></a>
                </p>
              </Alert>
            </Col>
            <Col className="d-flex justify-content-between flex-wrap" sm="12">
              <Button.Ripple  type="submit" color="primary" disabled={!(props.isFilePicked || dirty)}>
              <FormattedMessage id="Сохранить изменения"/>
              </Button.Ripple>
              <Button.Ripple onClick={() => props.refreshPage()} type="reset" color="danger">
              <FormattedMessage id="Отмена"/>
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
