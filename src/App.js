import "prismjs/themes/prism-tomorrow.css"
import React from "react"
import "react-perfect-scrollbar/dist/css/styles.css"
import {setPrincipal, setAuthenticated, resetPrincipal} from './api/principal-storage'
import UserDataService from './api/user-data-service'
import "./components/@vuexy/rippleButton/RippleButton"
import Router from "./Router"

const userDataService = new UserDataService()

const App = props => {
  userDataService.getUserData()
    .then(res => {
      setPrincipal(res.user)
      setAuthenticated(true)
    })
    .catch(err => {
      console.log(err)
      resetPrincipal()
    })

  return <Router/>
}

export default App
