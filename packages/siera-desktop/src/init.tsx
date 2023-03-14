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
  // It's using the local script because the script from plausible.io is disabled on localhost by default
  // For more information, see https://plausible.io/docs/script-extensions#all-our-script-extensions
  const PLAUSIBLE_SCRIPT_URL = 'https://plausible.io/js/plausible.local.js'

  const script = document.createElement('script')
  script.setAttribute('data-domain', PLAUSIBLE_DOMAIN)
  script.setAttribute('src', PLAUSIBLE_SCRIPT_URL)
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
