import type { Agent, FileSystem } from '@aries-framework/core'
import type Indy from 'indy-sdk'
import type { PropsWithChildren } from 'react'

import AgentProvider from '@aries-framework/react-hooks'
import React, { useEffect, useState } from 'react'
import '../public/index.css'
import { createRoot } from 'react-dom/client'

import { agentInitializer } from './infrastructure/adapters'
import { App } from './ui/App'

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
    ;(async () =>
      setAgent(
        await agentInitializer({
          label: 'agent',
          walletConfig: { id: 'id01', key: 'key01' },
        })
      ))()
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
