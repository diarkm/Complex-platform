import React from "react"
import {
  Alert,
  Button,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col
} from "reactstrap"
import img from "../../../assets/img/portrait/small/avatar-s-11.jpg"
class General extends React.Component {
  state = {
    visible: true
  }

  dismissAlert = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <Media>
          <Media className="mr-1" left href="#">
            <Media
              className="rounded-circle"
              object
              src={img}
              alt="User"
              height="64"
              width="64"
            />
          </Media>
          <Media className="mt-25" body>
            <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline
              >
                Загрузить
                <Input type="file" name="file" id="uploadImg" hidden />
              </Button.Ripple>
              <Button.Ripple color="flat-danger">Удалить</Button.Ripple>
            </div>
            <p className="text-muted mt-50">
              <small>Разрешается JPG, GIF или PNG. Максимальный размер: 1мб</small>
            </p>
          </Media>
        </Media>
        <Form className="mt-2" onSubmit={e => e.preventDefault()}>
          <Row>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="userName">Логин</Label>
                <Input id="userName" defaultValue="johny_01" />
              </FormGroup>
            </Col>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="email">Почта</Label>
                <Input id="email" defaultValue="john@admin.com" />
              </FormGroup>
            </Col>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="name">Имя</Label>
                <Input id="name" defaultValue="John" />
              </FormGroup>
            </Col>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="lastName">Фамилия</Label>
                <Input id="lastName" defaultValue="Doe" />
              </FormGroup>
            </Col>
            <Col lg="6" md="6" sm="12">
              <FormGroup>
                <Label for="tel">Телефон</Label>
                <Input id="tel" defaultValue="+7 777 777 7777" />
              </FormGroup>
            </Col>
            <Col sm="12">
              <Alert
                className="mb-2"
                color="warning"
                isOpen={this.state.visible}
                toggle={this.dismissAlert}
              >
                <p className="mb-0">
                  Ваша почта не подтверждена. Мы выслали вам код с дальнейшей инстукцией по активации.<br></br>
                  <span className="text-primary"> Отправить код повторно</span>
                </p>
              </Alert>
            </Col>
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple className="mr-50" type="submit" color="primary">
                Сохранить изменения
              </Button.Ripple>
              <Button.Ripple type="submit" color="danger">
                Отмена
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    )
  }
}
export default General
