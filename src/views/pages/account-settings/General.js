import React from "react"
import { Button, Input, Media } from "reactstrap"
import UserDataService from "../../../api/user-data-service"
import img from "../../../assets/img/default-avatar.png"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import GeneralForm from "./GeneralForm";
import * as Yup from "yup";

import { FormattedMessage, useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}

const formSchema = Yup.object().shape({
  firstName: Yup.string().required("Введите ваше имя").min(2, 'Имя должна состоять минимум из 2 букв')
    .matches(/^[a-zA-Zа-яёА-ЯЁ]+$/u,'Неправильное имя'),
  lastName: Yup.string().required("Введите вашу фамилию").min(2,'Фамилия должна состоять минимум из 2 букв')
    .matches(/^[a-zA-Zа-яёА-ЯЁ]+$/u,'Фамилия неправильная'),
 email: Yup.string().email('Неправильная почта').required("Введите почту"),
 phoneNumber: Yup.string().required("Введите номер телефона")
   .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/,'Неправильный номер')
});

class General extends React.Component {
  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  state = {
    visible: true,
    login: null,
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    confirmed: 1,
    selectedFile: null,
    isFilePicked: false,
    avatarError: false
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

  handleImgChange(e) {
    if (!e.target.files.length) return
    let self = this
    const fileTm = e.target.files[0];
    const extFile = fileTm.type.split("/").pop();
    if ((extFile === 'jpg' || extFile === 'gif' || extFile === 'png' || extFile === 'jpeg')
      && ((fileTm.size/1024)/1024).toFixed(4) <= 1) {
      this.setState({
        selectedFile: e.target.files[0],
        isFilePicked: true,
        avatarError: false,
      })
      let reader = new FileReader();
      reader.onload = function (e) {
        self.setState({img: e.target.result})
      }
      reader.readAsDataURL(e.target.files[0])
    }else {
      this.setState({ avatarError: true });
    }
  }

  refreshPage() {
    window.location.reload();
  }

  handleSubmit = (userData) => {
    if (this.state.isFilePicked) userData.avatar = this.state.selectedFile
      this.userDataService.updateUserData(userData).then(res => {
        this.refreshPage()
      })
        .catch(err => console.log(err))
      this.onValidateSuccess('Данные успешно сохранены!')
  }

  resendConfirmEmail() {
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
            <Media className="mr-1 avatar" left href="#" style={{height:64,width:64,overflow:"hidden"}}>
              {this.state.img ?
                <Media
                  id="user-avatar"
                  object
                  src={this.state.img}
                  alt="User"
                  style={{borderRadius:0, width: "100%"}}
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
                  <FormattedMessage id="Загрузить"/>
                  <Input type="file" name="file" id="uploadImg" accept="image/x-png,image/gif,image/jpg"
                         onChange={(e) => this.handleImgChange(e)} hidden/>
                </Button.Ripple>
                <Button.Ripple color="flat-danger"><FormattedMessage id="Удалить"/></Button.Ripple>
              </div>
              <p className={`text-muted mt-50 `}>
                <small className={`${this.state.avatarError && 'text-danger' }`}><FormattedMessage id="Разрешается JPG, GIF или PNG. Максимальный размер: 1мб"/></small>
              </p>
            </Media>
          </Media>
          <GeneralForm
            {...this.state}
            submit ={this.handleSubmit}
            dismissAlert={this.dismissAlert}
            refreshPage={this.refreshPage}
            schema={formSchema}
          />
          <ToastContainer/>
        </SkeletonTheme>
      </React.Fragment>
    )
  }
}

export default withLocale(General)
