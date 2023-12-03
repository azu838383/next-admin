import { type ThunkDispatch } from 'redux-thunk'
import { type AnyAction } from 'redux'
import get from 'lodash/get'
import jwt from 'jsonwebtoken'
import { UserPayload } from '../reducers/userReducer'
import api from '../api'
import { AUTH, USER } from './actionTypes'
import { API_URL } from '@/libs/constants'
import encryptedLS from '@/libs/encryptedLS'
import { RootState } from '../reducers'

export const login = (data: any) => async (dispatch: ThunkDispatch<RootState, object, AnyAction>) => {
    const response = await api.post(`${API_URL}/api/login`, data)
    const whiteListReg = ['en' , 'id' , 'vi' , 'br' , 'kr']
    const token = get(response, 'data')
    if (data.AuthType === 'frontend') {
      const userPayload = decodeJwtFE(token)
      const creds = token
      encryptedLS.set('creds', creds)
      dispatch({
        type: AUTH.LOGIN,
        payload: true,
      })
      dispatch({
        type: USER.UPDATE_CURRENT_USER,
        payload: userPayload,
      })
      // i18n.changeLanguage(userPayload?.region??'en')
    }
  }


export const decodeJwtFE = (token: string): UserPayload | null => {
  try {
    const decoded = jwt.decode(token) as UserPayload;
    // Parse properties with specific data types
    decoded.id = Number(decoded.id)
    decoded.secretPin = Number(decoded.secretPin)
    decoded.sessionId = Number(decoded.sessionId)
    decoded.subscription = Number(decoded.subscription)
    return decoded;
  } catch (error) {
    return null;
  }
};

export const logout = () => async (dispatch: ThunkDispatch<object, object, AnyAction>) => {
  localStorage.removeItem('creds')
  dispatch({
    type: AUTH.LOGOUT,
    payload: null,
  })
  dispatch({
    type: 'RESET_STORE',
  })
}
