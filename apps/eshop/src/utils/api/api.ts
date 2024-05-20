'use client'
import axios, { type AxiosInstance } from 'axios'
import Cookies from 'universal-cookie'

export const apiSetup = async () => {
  const api: AxiosInstance = axios.create({
    baseURL: 'https://beachlimodb.vercel.app/api',
  })
  const cookie = new Cookies()
  const accessToken = cookie.get('token')
  if (accessToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken.token}`
  }

  return api
}
//added latest add
