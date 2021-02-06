import React from "react"
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import axios from "axios"
import * as Icon from "react-feather"
import classnames from "classnames"
import ReactCountryFlag from "react-country-flag"
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent"
import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import { history } from "../../../history"
import { IntlContext } from "../../../utility/context/Internationalization"
import TokenStorage from '../../../api/tokenStorage';
import UserDataService from "../../../api/user-data-service"
import img from "../../../assets/img/portrait/small/avatar-s-11.jpg";

const handleNavigation = (e, path) => {
  e.preventDefault()
  history.push(path)
}

const UserDropdown = props => {
  const { logout, isAuthenticated } = useAuth0()

  const exit = () => {
    localStorage.removeItem('token');
    history.push('/');
  }
  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavigation(e, "/settings")}
      >
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Настройки</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        href="/settings"
        onClick={e => {
          e.preventDefault()
          if (isAuthenticated) {
            return logout({
              returnTo: window.location.origin + process.env.REACT_APP_PUBLIC_PATH
            })
          } else {
            const provider = props.loggedInWith
            if (provider !== null) {
              if (provider === "login") {
                return props.logoutWithLogin()
              }
            } else {
              history.push("/")
            }
          }

        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle" onClick={exit}>Выйти</span>
      </DropdownItem>
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
    shoppingCart: [],
    suggestions: [],
    user: null,
    userAvatar: img
  }

  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  componentDidMount() {
    this.getUserData();
  }

  
  async getUserData() {
    this.userDataService.getUserData()
      .then(res => {
        console.log('res.user', res.user);
        this.setState({user: res.user})
        if (res.user.avatar)
          this.setState({userAvatar: `/${res.user.avatar}`})
        else
          this.setState({userAvatar: img})
      })
      .catch(err => console.log(err))
    }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch
    })
  }

  removeItem = id => {
    let cart = this.state.shoppingCart

    let updatedCart = cart.filter(i => i.id !== id)

    this.setState({
      shoppingCart: updatedCart
    })
  }

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown })

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <IntlContext.Consumer>
          {context => {
            let langArr = {
              "en" : "English",
              "ru" : "Русский"
            }
            return (
              <Dropdown
                tag="li"
                className="dropdown-language nav-item"
                isOpen={this.state.langDropdown}
                toggle={this.handleLangDropdown}
                data-tour="language"
              >
                <DropdownToggle
                  tag="a"
                  className="nav-link"
                >
                  <ReactCountryFlag
                  className="country-flag"
                    countryCode={
                      context.state.locale === "en"
                        ? "us"
                        : context.state.locale
                    }
                    svg
                  />
                  <span className="d-sm-inline-block d-none text-capitalize align-middle ml-50">
                    {langArr[context.state.locale]}
                  </span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag="a"
                    onClick={e => context.switchLanguage("en")}
                  >
                    <ReactCountryFlag className="country-flag" countryCode="us" svg />
                    <span className="ml-1">English</span>
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    onClick={e => context.switchLanguage("ru")}
                  >
                    <ReactCountryFlag className="country-flag" countryCode="ru" svg />
                    <span className="ml-1">Русский</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )
          }}
        </IntlContext.Consumer>
        <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          <DropdownToggle tag="a" className="nav-link nav-link-label">
            <Icon.Bell size={21} />
            <Badge pill color="primary" className="badge-up">
              {" "}
              5{" "}
            </Badge>
          </DropdownToggle>
          <DropdownMenu tag="ul" right className="dropdown-menu-media">
            <li className="dropdown-menu-header">
              <div className="dropdown-header mt-0">
                <h3 className="text-white">5 новых</h3>
                <span className="notification-title">Уведомления системы</span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false
              }}
            >
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.PlusSquare
                      className="font-medium-5 primary"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="primary media-heading" tag="h6">
                      You have new order!
                    </Media>
                    <p className="notification-text">
                      Are your going to meet me tonight?
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      9 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.DownloadCloud
                      className="font-medium-5 success"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="success media-heading" tag="h6">
                      99% Server load
                    </Media>
                    <p className="notification-text">
                      You got new order of goods?
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      5 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.AlertTriangle
                      className="font-medium-5 danger"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="danger media-heading" tag="h6">
                      Warning Notification
                    </Media>
                    <p className="notification-text">
                      Server has used 99% of CPU
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Today
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.CheckCircle
                      className="font-medium-5 info"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="info media-heading" tag="h6">
                      Complete the task
                    </Media>
                    <p className="notification-text">
                      One of your task is pending.
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Last week
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.File className="font-medium-5 warning" size={21} />
                  </Media>
                  <Media body>
                    <Media heading className="warning media-heading" tag="h6">
                      Generate monthly report
                    </Media>
                    <p className="notification-text">
                      Reminder to generate monthly report
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Last month
                    </time>
                  </small>
                </Media>
              </div>
            </PerfectScrollbar>
            <li className="dropdown-menu-footer">
              <DropdownItem tag="a" className="p-1 text-center">
                <span className="align-middle">Читать больше уведомлений</span>
              </DropdownItem>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
              {this.state.user ? `${this.state.user.firstName} ${this.state.user.lastName}` : ''}
              </span>
              <span className="user-status">INVESTOR GIQ-S</span>
            </div>
            <span data-tour="user">
              <img
                src={this.state.userAvatar}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}
export default NavbarUser
