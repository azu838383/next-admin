import axios, {type Axios, type AxiosRequestHeaders } from 'axios'
import {  store } from '.'
import { logout } from './actions/authActions'
import { API_URL } from '@/libs/constants'
import encryptedLS from '@/libs/encryptedLS'

const api = (baseUrl?:string): Axios  => {

  const defaultOptions = {
    baseURL: baseUrl ?? API_URL,
    headers: {
      // 'Content-Type': 'application/json',
    },
  }
  
  // Create instance
  const instance = axios.create(defaultOptions)
  // Set the AUTH token (put from localStorage) for any request
  instance.interceptors.request.use((config) => {
    const rootUrl = window.location.origin
    const token = encryptedLS.get('creds')
    if (token) {
      const headers = { ...config.headers } as AxiosRequestHeaders
      headers.Authorization = token ? `Bearer ${token as string}` : ''
      headers['X-Root-Domain'] = rootUrl
      config.headers = headers
    }
    return config
  })
  

  instance.interceptors.response.use(
    async function (response: any) {
      return await Promise.resolve(response)
    },
    async function (error: any) {
      // const { access_token: token } = encryptedLS.get('creds');
      // check if session expired
       if (error.response.status === 401) {
         localStorage.removeItem( 'creds')
         store.dispatch(logout())

      } 
      return await Promise.reject(error)
    },
  )
  return instance
}

export default api()
