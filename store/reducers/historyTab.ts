import { HISTORY } from "@/store/actions/actionTypes";

export interface IHistoryPage {
    label: string
    route: string
}

interface StateHistoryPage {
    lists: IHistoryPage[]
    pageTitle: string
}

const initialState : StateHistoryPage= {
    lists:[
        {
            label: 'Dashboard',
            route: '/dashboard'
        }
    ],
    pageTitle: ''
}


const historyReducer = (state=initialState, action:any): StateHistoryPage =>{
    switch (action.type) {
        case HISTORY.ADD_PAGE_TO_HISTORY:
            {
            const isPageInHistory = state.lists.some(item => item.route === action.payload.route);
            if (isPageInHistory) {
                return state; // Page is already in history, so return the current state
            } else {
                return {
                    ...state,
                    lists: [...state.lists, action.payload]
                }
            }
        }
        case HISTORY.REMOVE_PAGE_FROM_HISTORY: 
           return{
            ...state,
            lists: state.lists.filter((e)=>e !== action.payload)
           }
        case HISTORY.REMOVE_ALL_FROM_HISTORY: 
           return{
            ...state,
            lists: [{
                label: 'Dashboard',
                route: '/Dashboard'
            }]
           }
        case HISTORY.SET_PAGE_TITLE:
        return {
            ...state,
            pageTitle: action.payload,
        }
        default:
            return state
    }
}

export default historyReducer