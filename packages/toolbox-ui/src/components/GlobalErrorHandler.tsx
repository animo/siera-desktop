import type { ReactNode } from 'react'
import type React from 'react'

import { AriesFrameworkError } from '@aries-framework/core'
import { showNotification } from '@mantine/notifications'
import { useEffect } from 'react'

interface GlobalErrorHandlerProps {
  children?: ReactNode
}

export const GlobalErrorHandler = ({ children }: GlobalErrorHandlerProps) => {
  useEffect(() => {
    const onError = ({ reason }: PromiseRejectionEvent) => {
      if (!(reason instanceof AriesFrameworkError)) return

      showNotification({
        color: 'red',
        title: reason.name,
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
