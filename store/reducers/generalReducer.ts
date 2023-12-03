import { GENERAL } from '../actions/actionTypes'


export interface GeneralState {
  theme: 'dark' | 'light'
}


const initialState:GeneralState = {
  theme: 'dark'
} 


const generalReducer = (state = initialState, action: any): GeneralState => {
  switch (action.type) {
      case GENERAL.SET_THEME:
        return {
          ...state,
          theme: action.payload
        }
    default:
      return state
  }
}

export default generalReducer


