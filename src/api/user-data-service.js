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
    return this.client.get('/user')
      .then(response => {
        window.USER = response.data
        return response.data
      })
      .catch(error => {
        window.USER = null
        //this.handleError(error)
      })
  }

  async updateUserData(userData) {
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
    return this.client.post('/user/settings/resendConfirmEmail', {})
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getWalletsData() {
    return this.client.get('/user/wallet')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async createWallet(walletData) {
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
    let formData = this.getFormData(data)

    return this.client.post('/user/password/restore', formData)
      .then(response => {
        if (response) {
          console.log(response)
          return response.data
        }
        this.handleResponseError(response)
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async checkToken(data) {
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
    return this.client.get(`/public/userByLogin/${login}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getReferralData() {
    return this.client.get('/user/referral/refer')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getReferralTree() {
    return this.client.get('/user/referral/tree')
      .then(response => {
        console.log('TREE', response.data)
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async setTransaction ({ value = 1000, count = 1 }) {
    return this.client.post('/transaction/create', { value, count })
      .then(response => {
        return response.data
      })
  }

  async paymentCreate ({ sum, type, transaction_id }) {
    return this.client.post('/payment/create', { sum, type, transaction_id })
      .then(response => {
        return response.data
      })
  }

  async getTransactions(page = 1) {
    return this.client.get('/transaction')
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getAvailableDeposits () {

    return this.client.get(`/user/deposit/available`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async getDeposits(page = 1) {
    return this.client.get(`/user/deposit/get/${page}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async get2faQr() {
    return this.client.get(`/user/2fa/qr`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  async enable2fa(data) {
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
    return this.client.post(`/user/2fa/disable`, {})
      .then(response => {
        if(response.data.response === true)
          return response.data
        else
          console.log(response.data.errors)
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
