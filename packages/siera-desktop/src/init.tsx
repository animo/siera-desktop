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
      version: string
      platform: string
      configDir?: string
      github: {
        owner: string
        repository: string
      }
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

const attachPlausible = () => {
  const PLAUSIBLE_DOMAIN = 'siera-desktop.animo.id'

  const script = document.createElement('script')
  script.setAttribute('data-domain', PLAUSIBLE_DOMAIN)
  script.setAttribute('src', 'https://plausible.io/js/plausible.js')
  document.head.appendChild(script)
}

if (process.env.NODE_ENV === 'production') {
  attachPlausible()
}

const root = createRoot(document.getElementById('root') as HTMLElement)

// When StrictMode is enabled, React will double-render the components
// and compare the results. If they are not equal, it will throw an error.
// This can also trigger some weird behavior in the UI, especially when using useEffects.
// This weird behavior is caused by the fact that the useEffects are called twice.
// This will not happen in production.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
