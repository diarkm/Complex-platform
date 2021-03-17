import $ from "jquery"
import React from "react"
import {Alert, Button, Col, Form, FormGroup, Input, Label, Media, Row} from "reactstrap"
import UserDataService from "../../../api/user-data-service"
import img from "../../../assets/img/default-avatar.png"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

class General extends React.Component {
  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  state = {
    visible:      true,
    login:        '',
    email:        '',
    firstName:    '',
    lastName:     '',
    phoneNumber:  '',
    confirmed: 1,
    selectedFile: null,
    isFilePicked: false,
  }

  componentDidMount() {
    this.getUserData();
  }

  onValidateSuccess = message => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  getUserData() {
    this.userDataService.getUserData()
      .then(res => {
        this.setState(res.user)
        if (res.user.avatar)
          this.setState({img: `/back/storage/app/${res.user.avatar}`})
        else
          this.setState({img: img})
      })
      .catch(err => console.log(err))
  }

  dismissAlert = () => {
    this.setState({
      visible: false
    })
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  handleImgChange(e) {
    if (!e.target.files.length) return
    let self = this
    this.setState({
      selectedFile: e.target.files[0],
      isFilePicked: true
    })
    let reader    = new FileReader();
    reader.onload = function (e) {
      self.setState({img: e.target.result})
    }
    reader.readAsDataURL(e.target.files[0])
  }

  checkData(userData){
    if(userData.email.length == 0) return false
    if(userData.firstName.length == 0) return false
    if(userData.lastName.length == 0) return false
    if(userData.phoneNumber.length == 0) return false
    return true
  }

  refreshPage(){
    window.location.reload();
  }

  handleSubmit(event) {
    let userData = {
      login:       this.state.login,
      email:       this.state.email,
      firstName:   this.state.firstName,
      lastName:    this.state.lastName,
      phoneNumber: this.state.phoneNumber,
    }
    if (this.state.isFilePicked) userData.avatar = this.state.selectedFile
    if(this.checkData(userData)){
      this.userDataService.updateUserData(userData).then(res => {
        this.refreshPage()
      })
        .catch(err => console.log(err))
        this.onValidateSuccess('Данные успешно сохранены!')
      event.preventDefault();
    }
  }

  resendConfirmEmail(){
    this.userDataService.resendConfirmEmail()
      .then(res => {
              window.location.href = '/confirm';
            })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <React.Fragment>
        <SkeletonTheme color="#283046" highlightColor="#3F4860">
          <Media>
            <Media className="mr-1" left href="#">
              {this.state.img ? 
                <Media
                  id="user-avatar"
                  className="rounded-circle"
                  object
                  src={this.state.img}
                  alt="User"
                  height="64"
                  width="64"
                /> : <Skeleton circle={true} height={64} width={64}/>
              }
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
                  <Input type="file" name="file" id="uploadImg" onChange={(e) => this.handleImgChange(e)} hidden/>
                </Button.Ripple>
                <Button.Ripple color="flat-danger">Удалить</Button.Ripple>
              </div>
              <p className="text-muted mt-50">
                <small>Разрешается JPG, GIF или PNG. Максимальный размер: 1мб</small>
              </p>
            </Media>
          </Media>
          <Form className="mt-2" onSubmit={e => this.handleSubmit(e)}>
            <Row>
              <Col lg="6" md="6" sm="12">
                <FormGroup>
                  <Label for="userName">Логин</Label>
                  {this.state.login ? 
                    <Input id="userName"
                          value={this.state.login}
                          readOnly/> : <Skeleton height={35}/>
                  }
                </FormGroup>
              </Col>
              <Col lg="6" md="6" sm="12">
                <FormGroup>
                  <Label for="email">Почта</Label>
                  {this.state.email ? 
                    <Input id="email" value={this.state.email}
                          onChange={(e) => this.handleChange({email: e.target.value})}/> : <Skeleton height={35}/>
                  }
                </FormGroup>
              </Col>
              <Col lg="6" md="6" sm="12">
                <FormGroup>
                  <Label for="name">Имя</Label>
                  {this.state.firstName ? 
                  <Input id="name" value={this.state.firstName}
                        onChange={(e) => this.handleChange({firstName: e.target.value})}/> : <Skeleton height={35}/>
                  }
                </FormGroup>
              </Col>
              <Col lg="6" md="6" sm="12">
                <FormGroup>
                  <Label for="lastName">Фамилия</Label>
                  {this.state.lastName ?
                  <Input id="lastName" value={this.state.lastName}
                        onChange={(e) => this.handleChange({lastName: e.target.value})}/> : <Skeleton height={35}/>
                  }
                </FormGroup>
              </Col>
              <Col lg="6" md="6" sm="12">
                <FormGroup>
                  <Label for="tel">Телефон</Label>
                  {this.state.phoneNumber ?
                  <Input id="tel" value={this.state.phoneNumber}
                        onChange={(e) => this.handleChange({phoneNumber: e.target.value})}/> : <Skeleton height={35}/>
                  }
                </FormGroup>
              </Col>
              <Col sm="12">
                <Alert
                  className="mb-2"
                  color="warning"
                  isOpen={this.state.visible}
                  toggle={this.dismissAlert}
                  style={{display: this.state.confirmed == 0 ? 'block' : 'none' }}
                >
                  <p className="mb-0">
                    Ваша почта не подтверждена. Мы выслали вам код с дальнейшей инструкцией по активации.<br></br>
                    <a className="text-primary" onClick={e => this.resendConfirmEmail()}>Отправить код повторно</a>
                  </p>
                </Alert>
              </Col>
              <Col className="d-flex justify-content-start flex-wrap" sm="12">
                <Button.Ripple className="mr-50" type="submit" color="primary">
                  Сохранить изменения
                </Button.Ripple>
                <Button.Ripple onClick={this.refreshPage} type="reset" color="danger">
                  Отмена
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
          <ToastContainer />
        </SkeletonTheme>
      </React.Fragment>
    )
  }
}

export default General
