import { history } from "./history"
import axios from "axios"

let accessToken = ''

const apiURL = 'http://79.143.31.221'
/*
const session = require('express-session')
const express = require('express')

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: parseInt(process.env.SESSION_MAX_AGE)
    }
}))*/

const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }

})


// ЛОГИН
export const loginForm = user => {
  return dispatch => {
    authAxios
      .post(`/user/login`, {
        login: user.login,
        password: user.password
      })
      .then(response => {
        console.log({response});
        var isLogged;

        //Если такой пользователь существует
        if (response.data) {
          accessToken = response.data.token;
          isLogged = response.data.response;
          if(isLogged){
            dispatch({
              type: "LOGIN_WITH_LOGIN",
              payload: { 
                isLogged, 
                loggedInWith: "login",
                name: "Кундакбаев Диар",
                accessToken: accessToken
              }
            })
            history.push("/dashboard")
          } else {
            console.log(response.data.errors);
          }

        }
      })
      .catch(err => console.log(err))
  }
}

//Выход
export const logoutWithLogin = () => {
    return dispatch => {
      dispatch({ type: "LOGOUT_WITH_LOGIN", payload: {} })
      history.push("/")
    }
}

// РЕГИСТРАЦИЯ
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
        .post("http://79.143.31.221/user/signup", {
          login: login,
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
          //avatar: avatar,
          phoneNumber: phoneNumber
        })
        .then(response => {
          var isLogged;

          if(response.data){
            isLogged = response.data.response;
            
            console.log(response.data);

            if(isLogged){
              dispatch({
                type: "LOGIN_WITH_LOGIN",
                payload: { 
                  isLogged, 
                  loggedInWith: "login",
                  name: lastName + " " + firstName
                }
              })
              history.push("/dashboard")
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
