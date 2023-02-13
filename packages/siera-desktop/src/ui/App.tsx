import type { ReactNode } from 'react'

import { DefaultConfiguration, InMemoryConfigRepository } from '@animo/siera-core'
import { SieraUiApp } from '@animo/siera-ui/src/SieraUiApp'
import { AgentContext } from '@animo/siera-ui/src/contexts/AgentContext'
import { AgentManagerProvider, useCurrentAgentRecord } from '@animo/siera-ui/src/contexts/AgentManagerContext'
import { ConfigProvider } from '@animo/siera-ui/src/contexts/ConfigProvider'
import { RuntimeInformationProvider } from '@animo/siera-ui/src/contexts/RuntimeInformationContext'
import { UpdateInformationProvider } from '@animo/siera-ui/src/contexts/UpdateInformation'
import { routes } from '@animo/siera-ui/src/routes'
import React from 'react'
import { createMemoryRouter } from 'react-router-dom'

import { fetchUpdateInformation } from '../GithubService'
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

const hasAutomaticUpdateSupport = ['darwin', 'win32']
const checkForUpdates = async () => {
  if (hasAutomaticUpdateSupport.includes(window.configInformation.platform)) return

  const { version, github } = window.configInformation

  // Make sure the version starts with a v, because we release the updates with a v on Github
  let currentVersion = version
  if (!currentVersion.startsWith('v')) {
    currentVersion = `v${currentVersion}`
  }

  const updateInformation = await fetchUpdateInformation(github.owner, github.repository)
  // If the current version is the same as the latest version, we don't need to update
  if (updateInformation.version === currentVersion) return

  // If the current version is newer than the latest version, we just return the update information
  return updateInformation
}

export const App = () => {
  return (
    <RuntimeInformationProvider
      information={{
        appType: 'desktop',
        version: window.configInformation.version,
      }}
    >
      <UpdateInformationProvider checkUpdate={checkForUpdates}>
        <ConfigProvider configRepository={configRepository}>
          <AgentManagerProvider>
            <AgentContextWrapper>
              <SieraUiApp router={router} />
            </AgentContextWrapper>
          </AgentManagerProvider>
        </ConfigProvider>
      </UpdateInformationProvider>
    </RuntimeInformationProvider>
  )
}
