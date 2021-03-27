import React, { Suspense, lazy } from "react"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"

import partnership from "./views/pages/MyPages/Partnership"
import reports from "./views/pages/MyPages/analyze"
import referrals from "./views/pages/MyPages/ReferralsPage"
import wallet from "./views/pages/MyPages/Wallet"
import buyPackages from "./views/pages/MyPages/buyPackage"
import myOrders from "./views/pages/MyPages/MyOrders"
import { ContextLayout } from "./utility/context/Layout"
import ConfirmEmail from './views/pages/authentication/ConfirmEmail'

// Route-based code splitting
import analyticsDashboard from "./views/dashboard/analytics/AnalyticsDashboard"
import UserDataService from "./api/user-data-service"

const checkout = lazy(() => import("./views/apps/ecommerce/cart/Cart"))
const bitcoinCheckout = lazy(() => import("./views/apps/ecommerce/cart/BitcoinCheckout"))

const accountSettings = lazy(() =>
  import("./views/pages/account-settings/AccountSettings")
)
const error404 = lazy(() => import("./views/pages/misc/error/404"))
const Login = lazy(() => import("./views/pages/authentication/login/Login"))
const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
)
const resetPassword = lazy(() =>
  import("./views/pages/authentication/ResetPassword")
)
const register = lazy(() =>
  import("./views/pages/authentication/register/Register")
)
const politics = lazy(() =>
  import("./views/pages/Politics")
)
// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

const AuthRoutes = [
  {path: '/dashboard', exact: true, component: analyticsDashboard},
  {path: '/partner', exact: true, component: partnership},
  {path: '/reports', exact: true, component: reports},
  {path: '/referrals', exact: true, component: referrals},
  {path: '/buyPackages', exact: true, component: buyPackages},
  {path: '/wallet', exact: true, component: wallet},
  {path: '/cart', exact: true, component: myOrders},

  {path: '/settings', component: accountSettings},
  {path: '/confirm', exact: true, fullLayout: true, component: ConfirmEmail},
  {path: '/checkout', component: checkout},
  {path: '/bitcoinCheckout', component: bitcoinCheckout}
]
const AuthComponentRedirect = () => {
  window.location.href = '/'
  return Login
}

class AppRouter extends React.Component {
  state = {
    user: window.USER,
    checkUserInit: false
  }

  constructor () {
    super()

    this.userDataService = new UserDataService()
  }

  async componentDidMount () {
    await this.userDataService.getUserData()
    this.setState(() => ({ checkUserInit: true, user: window.USER }))
  }

  render() {
    const { user, checkUserInit } = this.state

    if(!checkUserInit) return <Spinner />

    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Login} fullLayout />
          <AppRoute exact path="/register" component={register} fullLayout />
          <AppRoute path="/register/:referer" component={register} fullLayout />
          <AppRoute
            path="/forgot-password"
            component={forgotPassword}
            fullLayout
          />
          <AppRoute
            path="/reset-password"
            component={resetPassword}
            fullLayout
          />
          <AppRoute
            path="/reset-password/:token"
            component={resetPassword}
            fullLayout
          />

          {AuthRoutes.map((route, i) => {
            let routeComponent = user ? route.component : AuthComponentRedirect

            return <AppRoute
              key={i}
              path={route.path}
              component={routeComponent}
              exact={route.exact}
              fullLayout={route.fullLayout}
            />
          })}

          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
