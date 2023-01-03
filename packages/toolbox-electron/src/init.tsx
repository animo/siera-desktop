import type { FileSystem } from '@aries-framework/core'
import type Indy from 'indy-sdk'
import type { RequestInfo, RequestInit } from 'node-fetch'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './ui/App'

// Typings for the exposed indy and filesystem
declare global {
  interface Window {
    indy: typeof Indy
    configInformation: {
      platform: string
      configDir?: string
      unSupportedPlatform: boolean
    }
    fs: FileSystem
    nodeFetch: (
      url: Omit<RequestInfo, 'signal'>,
      init?: Omit<RequestInit, 'signal'>
    ) => Promise<{
      statusCode: number
      body: string
    }>
  }
}

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
