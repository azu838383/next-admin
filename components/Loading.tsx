import { LoadingOverlay } from '@mantine/core'
import get from 'lodash/get'
import React, { createContext, useContext, useState } from 'react'
import { type ToastPosition, toast, ToastContainer } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_LOADING_STATE = {
  children: null,
  visible: false,
}

const TOAST_TYPES = {
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warn',
}

export const LoadingContext = createContext({} as any)

export const useLoading = (): JSX.Element => {
  return useContext(LoadingContext)
}
const LoadingSpinner = ({ visible }: { visible: boolean }): JSX.Element => {
  return (
    <div>
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
    </div>
  )
}

const useBaseLoading = (): any => {
  const [loadingState, setLoadingState] = useState(DEFAULT_LOADING_STATE)

  const showLoadingSpinner = (): void => {
    setLoadingState({
      ...loadingState,
      visible: true,
    })
  }

  const hideLoadingSpinner = (): void => {
    setLoadingState({
      ...loadingState,
      visible: false,
    })
  }

  const addNotification = ({
    className,
    closingOn = 1,
    type,
    message,
    position,
  }: {
    className?: string
    closingOn?: number
    type: string
    message: string
    position?:ToastPosition 
  }): void => {
    toast[get(TOAST_TYPES, type, 'info')](message, {
      position: position ?? 'top-center',
      autoClose: closingOn * 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: twMerge(type === 'success' ? '!bg-[#259073] !text-white' : '', className),
      
    })
  }

  const handleError = (error: any): void => {
    hideLoadingSpinner();
  
    let errorMessage = 'An error occurred. Please try again later.';
    if (error.response) {
      if (error.response.status === 403) {
        errorMessage = 'You are not authorized to perform this action.';
      } else if (error.response.data) {
        errorMessage = error.response.data;
      }
    } else if (error.message && error.message.indexOf('Network error') >= 0) {
      errorMessage = 'Network error! Please try again later.';
    }
    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };
  return {
    loadingState,
    showLoadingSpinner,
    hideLoadingSpinner,
    addNotification,
    handleError,
  }
}

export const LoadingProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const loading = useBaseLoading()

  return (
    <LoadingContext.Provider value={loading}>
      {children}
      <LoadingSpinner {...loading.loadingState} />
      <ToastContainer />
    </LoadingContext.Provider>
  )
}
