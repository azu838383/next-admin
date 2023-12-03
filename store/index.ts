import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import storageDefault from 'reduxjs-toolkit-persist/lib/storage'
import rootReducer from './reducers'

const persistConfig = {
  timeout: 500,
  key: 'mining-clan',
  storage: storageDefault,
  // storage: storageSession,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)
