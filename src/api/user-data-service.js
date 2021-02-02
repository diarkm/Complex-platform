import axios from "axios"
import {apiURL} from './config'
import TokenStorage from './tokenStorage'

class UserDataService {
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

  async changePassword(userData) {
    console.log("UserDataService.changePassword():", userData)
    let formData = this.getFormData(userData)
    return this.client.post('/user/settings/password/change', formData, {
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

  async getUserData() {
    console.log("UserDataService.getUserData()");
    return this.client.get('/user')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async updateUserData(userData) {
    console.log("UserDataService.updateUserData():", userData);
    let formData = this.getFormData(userData)
    return this.client.post('/user/settings', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (!response.response) {
          this.handleResponseError(response)
        }
        return response.json()
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async resendConfirmEmail() {
    console.log("UserDataService.resendConfirmEmail()");
    return this.client.post('/user/settings/resendConfirmEmail', {})
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getWalletsData() {
    console.log("UserDataService.getUserData()");
    return this.client.get('/user/wallet')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async updateWalletData(walletData) {
    console.log("UserDataService.updateWalletData():", walletData);
    let formData = this.getFormData(walletData)
    return this.client.post('/user/wallet/edit', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (!response.response) {
          this.handleResponseError(response)
        }
        return response.json()
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

export default UserDataService
