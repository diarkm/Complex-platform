import * as firebase from "firebase/app"
import { history } from "../../../history"
import "firebase/auth"
import "firebase/database"
import axios from "axios"
import { config } from "../../../authServices/firebase/firebaseConfig"

// Init firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

let firebaseAuth = firebase.auth()

const apiURL = 'http://cabinet.giq-group.com/back/public'

export const signupWithFirebase = (email, password, name) => {
  return dispatch => {
    let userEmail = null,
      loggedIn = false
    // userName = null

    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        firebaseAuth.onAuthStateChanged(user => {
          result.user.updateProfile({
            displayName: name
          })
          if (user) {
            userEmail = user.email
            // let userName = user.displayName
            loggedIn = true
            dispatch({
              type: "SIGNUP_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
                isSignedIn: loggedIn
              }
            })
            dispatch({
              type: "LOGIN_WITH_EMAIL",
              payload: {
                email: userEmail,
                name
              }
            })
          }
        })
        history.push("/")
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const signupForm = (
    login,
    firstName,
    lastName,
    password,
    confirmPass,
    email,
    avatar,
    phoneNumber
) => {
  return dispatch => {
    if(password == confirmPass) {
      axios
        .post(apiURL + "/user/signup", {
          login: login,
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
          //avatar: avatar,
          phoneNumber: phoneNumber
        })
        .then(response => {
          var isOkay;

          if(response.data){
            isOkay = response.data.response;
            
            console.log(response.data.errors);

            if(isOkay){
              dispatch({
                type: "SIGNUP_WITH_EMAIL",
                payload: { 
                  isOkay, 
                  loggedInWith: "login",
                  name: lastName + " " + firstName
                }
              })
              history.push("/")
            } else {
              console.log(response.data.errors);
            }
          }
        })
    } else {
      console.log("Пароли не совпадают")
    }
  }
}

export const signupWithJWT = (email, password, name) => {
  return dispatch => {
    axios
      .post("/api/authenticate/register/user", {
        email: email,
        password: password,
        name: name
      })
      .then(response => {
        var loggedInUser

        if(response.data){

          loggedInUser = response.data.user

          localStorage.setItem("token", response.data.token)

          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" }
          })

          history.push("/")
        }

      })
      .catch(err => console.log(err))

  }
}
