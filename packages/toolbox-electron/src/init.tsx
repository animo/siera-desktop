import type { FileSystem } from '@aries-framework/core'
import type Indy from 'indy-sdk'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './ui/App'

// Typings for the exposed indy and filesystem
declare global {
  interface Window {
    indy: typeof Indy
    fs: FileSystem
  }
}

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
