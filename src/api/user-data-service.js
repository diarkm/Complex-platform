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

  async createWallet(walletData) {
    console.log("UserDataService.createWallet():", walletData);
    let formData = this.getFormData(walletData)
    return this.client.post('/user/wallet/add', formData, {
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

  async restorePassword(data) {
    console.log("UserDataService.restorePassword():", data);
    let formData = this.getFormData(data)

    return this.client.post('/user/password/restore', formData)
      .then(response => {
        if (!response.response) {
          this.handleResponseError(response)
        }
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async checkToken(data) {
    console.log("UserDataService.checkToken():", data);
    let formData = this.getFormData(data)

    return this.client.post('/password/restore/check', formData)
      .then(response => {
        if (!response.response) {
          this.handleResponseError(response)
        }
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async setNewPassword(data) {
    console.log("UserDataService.setNewPassword():", data);
    let formData = this.getFormData(data)

    return this.client.post('/password/restore/set', formData)
      .then(response => {
        if (!response.response) {
          this.handleResponseError(response)
        }
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getReferrerByLogin(login) {
    console.log("UserDataService.getReferralData()");
    return this.client.get(`/public/userByLogin/${login}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getReferralData() {
    console.log("UserDataService.getReferralData()");
    return this.client.get('/user/referral/refer')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getReferralTree() {
    console.log("UserDataService.getReferralTree()");
    return this.client.get('/user/referral/tree')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getTransactions(page = 1) {
    console.log("UserDataService.getTransactions()", page);
    return this.client.get('/transaction')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getDeposits(page = 1) {
    console.log("UserDataService.getDeposits()");
    return this.client.get(`/user/deposit/get/${page}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async get2faQr() {
    console.log("UserDataService.get2faQr()");
    return this.client.get(`/user/2fa/qr`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async enable2fa(data) {
    console.log("UserDataService.enable2fa()", data);
    let formData = this.getFormData(data)
    return this.client.post(`/user/2fa/enable`, formData)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async disable2fa() {
    console.log("UserDataService.disable2fa()");
    return this.client.post(`/user/2fa/disable`, {})
      .then(response => {
        return response.data
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
