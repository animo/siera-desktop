import type { ReactNode } from 'react'
import type React from 'react'

import { AriesFrameworkError } from '@aries-framework/core'
import { showNotification } from '@mantine/notifications'
import { useEffect } from 'react'

import { FetchUpdateInformationError } from '../errors/FetchUpdateInformationError'

interface GlobalErrorHandlerProps {
  children?: ReactNode
}

const allowedErrors = [AriesFrameworkError, FetchUpdateInformationError]

export const GlobalErrorHandler = ({ children }: GlobalErrorHandlerProps) => {
  useEffect(() => {
    const onError = ({ reason }: PromiseRejectionEvent) => {
      if (!allowedErrors.some((ErrorType) => reason instanceof ErrorType)) return

      showNotification({
        color: 'error',
        title: reason.constructor.name,
        message: reason.message,
      })
    }
    window.addEventListener('unhandledrejection', onError)
    return () => {
      window.removeEventListener('unhandledrejection', onError)
    }
  }, [])

  return children as React.ReactElement
}
