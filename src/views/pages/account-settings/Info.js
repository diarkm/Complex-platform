import "flatpickr/dist/themes/light.css";
import React from "react"
import {Button, Col, CustomInput, Form, FormGroup, Input, Label, Row} from "reactstrap"
import UserDataService from "../../../api/user-data-service"
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"


class InfoTab extends React.Component {
  constructor() {
    super();
    this.state           = {
      checked: false, wallet: ''
    };
    this.userDataService = new UserDataService()
  }

  componentDidMount() {
    this.getWalletsData();
  }

  getWalletsData() {
    this.userDataService.getWalletsData()
      .then(res => {
        console.log('res', res);
        if (res.wallets.length) {
          this.setState(res.wallets[0])
        }
      })
      .catch(err => console.log(err))
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  handleSwitchChange(changeObject) {
    this.setState(changeObject);
  }

  handleSubmit(event) {
    let walletData = {
      wallet: this.state.wallet,
      wallet_id:  this.state.wallet_id || null,
    }
    this.userDataService.updateWalletData(walletData).then(res => console.log('OK', res))
      .catch(err => console.log(err))
    event.preventDefault();
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
              onChange={(e) => this.handleSwitchChange({checked: e.target.checked})}
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
                  placeholder="XXXX XXXX XXXX 1234"
                />
              </FormGroup>
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

export default InfoTab
