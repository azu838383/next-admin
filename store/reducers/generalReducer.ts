import { GENERAL } from '../actions/actionTypes'

export interface GeneralState {
  theme: 'dark' | 'light'
  hamburger:boolean
  hamburgDelay:boolean
}

const initialState:GeneralState = {
  theme: 'dark',
  hamburger: true,
  hamburgDelay: false,
}

const generalReducer = (state = initialState, action: any): GeneralState => {
  switch (action.type) {
    case GENERAL.SET_THEME:
      return {
        ...state, theme: action.payload
      }
    case GENERAL.SET_SIDEBAR_STATE:
      return {
        ...state,
        hamburger: action.payload,
      }
    case GENERAL.SET_SIDEBAR_DSTATE:
      return {
        ...state,
        hamburgDelay: action.payload,
      }
    default:
      return state
  }
}

export default generalReducer


