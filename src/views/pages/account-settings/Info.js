import "flatpickr/dist/themes/light.css";
import React from "react"
import QRImage from 'react-qr-image'
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import {getPrincipal} from "../../../api/principal-storage"
import UserDataService from "../../../api/user-data-service"
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"

class InfoTab extends React.Component {
  constructor() {
    super();
    this.state           = {
      checked:        false,
      wallet:         '',
      qr:             '',
      add2faModal:    false,
      remove2faModal: false,
      block:          true,
      googleCode:     '',
      googleSecret:   '',
    };
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

  componentDidMount() {
    this.getWalletsData()
    let principal = getPrincipal()
    if (principal.google_secret) this.setState({checked: true})
  }

  getWalletsData() {
    this.userDataService.getWalletsData()
      .then(res => {
        if (res.wallets.length) {
          this.setState(res.wallets[0])
        } else {
          this.setState({block: false})
        }
      })
      .catch(err => console.log(err))
  }

  handleChange(changeObject) {

    this.setState(changeObject);
  }

  handleSwitchChange(checked) {
    this.setState({checked: checked});
    if (checked) {
      this.userDataService.get2faQr()
        .then(res => {
          this.setState({qr: res.url.qr})
          this.setState({googleSecret: res.url.secretKey})
          this.setState({add2faModal: true})
        })
        .catch(err => console.log(err))
    } else {
      this.setState({remove2faModal: true})
    }
  }

  handleSubmit(event) {
    let walletData = {
      wallet:    this.state.wallet,
      wallet_id: this.state.wallet_id || null,
    }
      this.userDataService.createWallet(walletData)
        .then(res => {
          this.setState({block: true})
        })
        .catch(err => console.log(err))
      this.onValidationSuccess('Изменения успешно сохранены')
      event.preventDefault();
  }

  enable2fa() {
    let googleData = {
      secret: this.state.googleSecret,
      code:   this.state.googleCode,
    }
    if(googleData.code.length==0){
      this.setState({checked: false});
      this.setState({add2faModal: false});
      return;
    } else {
      this.userDataService.enable2fa(googleData)
        .then(res => {
          if (res.response === false){
            this.onValidationError('Вы ввели неверный код');
            return
          }
          else
            this.onValidationSuccess('Вы успешно активировали двухфакторную аутентификацию')
          this.setState({add2faModal: false})
        })
        .catch(err => console.log(err))
    }
  }

  disable2fa() {
    let googleData = {
      code:   this.state.googleCode,
    }
    this.userDataService.disable2fa(googleData)
      .then(res => {
        this.setState({remove2faModal: false})
      })
      .catch(err => console.log(err))
      this.onValidationSuccess('Вы деактивировали двухфакторную аутентификацию')
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <CustomInput
              className="custom-switch-success mr-1 mb-2"
              type="switch"
              id="success"
              name="success"
              onChange={(e) => this.handleSwitchChange(e.target.checked)}
              checked={this.state.checked}
              inline
            >
              <span className="mb-0 switch-label">Двухфакторная аутентификация</span>
            </CustomInput>
          </Col>
        </Row>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="rek">Реквизиты</Label>
                <Input
                  type="text"
                  name="rek"
                  id="bio"
                  rows="3"
                  value={this.state.wallet}
                  onChange={(e) => this.handleChange({wallet: e.target.value})}
                  disabled={this.state.block}
                  placeholder="XXXX XXXX XXXX 1234"
                />
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple className="mr-50" type="submit" color="primary" disabled={this.state.block}>
                Сохранить изменения
              </Button.Ripple>
              <Button.Ripple type="submit" color="danger">
                Отмена
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
        <Modal
          isOpen={this.state.add2faModal}
          toggle={this.toggleModal}
          className="modal-dialog-centered "
        >
          <ModalHeader toggle={this.toggleModal}>
            Просканируйте код
          </ModalHeader>
          <ModalBody  className="d-flex flex-column align-items-center">
            <p className="text-center">
              Для подтверждения двухфакторной аутентификации необходимо
              скачать приложение Authenticator и просканировать код ниже
            </p>
            <QRImage  text={this.state.qr}/>
            <Row className="mt-sm-1">
              <Col sm="12">
                <Form>
                  <FormGroup>
                    <Label for="rek">Введите код из приложения</Label>
                    <Input
                      style={{ width: 100 }}
                      type="text"
                      name="code"
                      id="code"
                      rows="2"
                      value={this.state.googleCode}
                      onChange={(e) => this.handleChange({googleCode: e.target.value.slice(0,6)})}
                      placeholder="000 000"
                    />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.enable2fa()}>
              ОК
            </Button>
            <Button color="danger" onClick={(e) => { this.setState({add2faModal: false}); this.setState({checked: false}) }}>
              Закрыть
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.remove2faModal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>
            Для отключения двухфакторной аутентификации
            введите код из приложения
          </ModalHeader>
          <ModalBody>
          <Row>
            <Col sm="12">
              <Form>
                <FormGroup>
                  <Label for="rek">Введите код из приложения</Label>
                  <Input
                    style={{ width: 100 }}
                    type="text"
                    name="code"
                    id="code_"
                    rows="3"
                    value={this.state.googleCode}
                    onChange={(e) => this.handleChange({googleCode: e.target.value})}
                    placeholder="000 000"
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.disable2fa()}>
              Отключить
            </Button>
            <Button color="danger" onClick={(e) => { this.setState({add2faModal: false}); this.setState({checked: false})}}>
              Закрыть
            </Button>
          </ModalFooter>
        </Modal>
        <ToastContainer />
      </React.Fragment>
    )
  }
}

export default InfoTab
