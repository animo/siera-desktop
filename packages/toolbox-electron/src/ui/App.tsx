import type { ReactNode } from 'react'

import { ToolboxApp } from '@animo/toolbox-ui/src/ToolboxApp'
import { AgentContext } from '@animo/toolbox-ui/src/contexts/AgentContext'
import { AgentManagerProvider, useAgentManager } from '@animo/toolbox-ui/src/contexts/AgentManagerContext'
import { routes } from '@animo/toolbox-ui/src/routes'
import React from 'react'
import { createMemoryRouter } from 'react-router-dom'

import { ElectronAgentDependenciesProvider } from '../providers/ElectronAgentDependenciesProvider'

const agentDependenciesProvider = new ElectronAgentDependenciesProvider()

const AgentContextWrapper = ({ children }: { children?: ReactNode }) => {
  const { currentAgentId, agents } = useAgentManager()

  const agentRecord = agents.find((agent) => agent.id === currentAgentId)

  return (
    <>
      <AgentContext agentRecord={agentRecord} agentDependenciesProvider={agentDependenciesProvider}>
        {children}
      </AgentContext>
    </>
  )
}

// Because Electron doesn't support url routing we use the routing in memory
export const router = createMemoryRouter(routes)

export const App = () => {
  return (
    <>
      <AgentManagerProvider>
        <AgentContextWrapper>
          <ToolboxApp router={router} />
        </AgentContextWrapper>
      </AgentManagerProvider>
    </>
  )
}
