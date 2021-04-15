import axios from "axios"
import {apiURL} from './config'
import TokenStorage from './tokenStorage'

class AuthenticationService {
  constructor() {
    this.tokenStorage = new TokenStorage()
    this.accessToken  = this.tokenStorage.get()
    this.client       = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: `${this.accessToken}`,
      }
    })
  }

  getFormData(values) {
    let formData = new FormData()
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key])
      }
    }
    return formData
  }

  async confirmEmail(code) {
    console.log("AuthenticationService.confirmEmail():", code)
    let formData = this.getFormData({code: code})

    return this.client.post('/user/confirm', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (!response.response) {
          this.handleResponseError(response)
        }
        return response
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status)
  }

  handleError(error) {
    throw new Error("Server error = " + error.message)
  }
}

export default AuthenticationService

