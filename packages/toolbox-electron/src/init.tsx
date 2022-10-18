import type { Agent, FileSystem } from '@aries-framework/core'
import type Indy from 'indy-sdk'
import type { PropsWithChildren } from 'react'

import './index.css'
import AgentProvider from '@aries-framework/react-hooks'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { agentInitializer } from './agent'

// Typings for the exposed indy and filesystem
declare global {
  interface Window {
    indy: typeof Indy
    fs: FileSystem
  }
}

export const AgentContext: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [agent, setAgent] = useState<Agent>()

  useEffect(() => {
    ;(async () => setAgent(await agentInitializer()))()
  }, [])

  return <AgentProvider agent={agent}>{children}</AgentProvider>
}

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <AgentContext>
      <App />
    </AgentContext>
  </React.StrictMode>
)
