// import TokenStorage from './tokenStorage'
import axios from "axios"

const apiURL = 'https://cabinet.giq-group.com/back/public'

class UserDataService {
  constructor() {
    this.accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJnb29nbGVfc2VjcmV0IjpudWxsLCIyZmFfY29uZmlybWVkIjpmYWxzZSwibGlmZVRpbWUiOjI0LCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJleHAiOjE2MTIwOTY2MTd9.UXu0qVCp56IIonI5Exf-vbsIxKe2BtBhODBiE1A4L2Q';
    this.client      = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: `${this.accessToken}`,
      }
    })
  }

  async updateUserData(userData) {
    console.log("UserDataService.updateUserData():", userData);
    return this.client.post('/user/settings', userData, {
      'Content-Type': 'application/json'
    })
      .then(response => {
        if (!response.ok) {
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
