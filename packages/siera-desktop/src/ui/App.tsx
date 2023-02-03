import type { ReactNode } from 'react'

import { DefaultConfiguration, InMemoryConfigRepository } from '@animo/siera-core'
import { SieraUiApp } from '@animo/siera-ui/src/SieraUiApp'
import { AgentContext } from '@animo/siera-ui/src/contexts/AgentContext'
import { AgentManagerProvider, useCurrentAgentRecord } from '@animo/siera-ui/src/contexts/AgentManagerContext'
import { ConfigProvider } from '@animo/siera-ui/src/contexts/ConfigProvider'
import { routes } from '@animo/siera-ui/src/routes'
import React from 'react'
import { createMemoryRouter } from 'react-router-dom'

import { ElectronConfigFileRepository } from '../adapters/ElectronConfigFileRepository'
import { ElectronAgentDependenciesProvider } from '../providers/ElectronAgentDependenciesProvider'

const agentDependenciesProvider = new ElectronAgentDependenciesProvider()

const AgentContextWrapper = ({ children }: { children?: ReactNode }) => {
  const agentRecord = useCurrentAgentRecord()

  return (
    <AgentContext agentRecord={agentRecord} agentDependenciesProvider={agentDependenciesProvider}>
      {children}
    </AgentContext>
  )
}

// Because Electron doesn't support url routing we use the routing in memory
export const router = createMemoryRouter(routes)

const configRepository = (function () {
  if (!window.configInformation.configDir) {
    return new InMemoryConfigRepository(DefaultConfiguration)
  }

  return new ElectronConfigFileRepository(window.configInformation.configDir)
})()

export const App = () => {
  return (
    <ConfigProvider configRepository={configRepository}>
      <AgentManagerProvider>
        <AgentContextWrapper>
          <SieraUiApp router={router} />
        </AgentContextWrapper>
      </AgentManagerProvider>
    </ConfigProvider>
  )
}
