import type { AgentConfigRecord, ConfigFileRepository, ToolboxConfig } from '@animo/toolbox-core'
import type { ReactNode } from 'react'

import React, { createContext, useContext, useEffect, useState } from 'react'

type ConfigContext = {
  config?: ToolboxConfig
  loading: boolean
  addAgent: (agent: AgentConfigRecord) => Promise<void>
}

const configContext = createContext<ConfigContext>({ loading: true } as ConfigContext)

export const useConfig = (): ConfigContext => {
  return useContext(configContext)
}

interface ConfigProviderProps {
  children: ReactNode
  configRepository: ConfigFileRepository
}

export const ConfigProvider = ({ children, configRepository }: ConfigProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState<ToolboxConfig>()

  const saveConfig = async (config: ToolboxConfig) => {
    await configRepository.writeConfiguration(config)
  }

  useEffect(() => {
    const loadConfig = async () => {
      const config = await configRepository.readConfiguration()
      setConfig(config)
      setLoading(false)
    }
    void loadConfig()

    return () => {
      if (config) {
        void saveConfig(config)
      }
    }
  }, [])

  const addAgent = async (agent: AgentConfigRecord) => {
    if (!config) return

    const updatedConfig = { ...config, agents: [agent, ...config.agents] }
    await saveConfig(updatedConfig)
    setConfig(updatedConfig)
  }

  return (
    <configContext.Provider
      value={{
        config,
        loading,
        addAgent,
      }}
    >
      {children}
    </configContext.Provider>
  )
}
