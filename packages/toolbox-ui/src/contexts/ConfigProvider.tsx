import type { IAgentConfigRecord, IConfigFileRepository, IToolboxConfig } from '@animo/toolbox-core'
import type { ReactNode } from 'react'

import React, { createContext, useContext, useEffect, useState } from 'react'

type ConfigContext = {
  config?: IToolboxConfig
  loading: boolean
  addAgent: (agent: IAgentConfigRecord) => Promise<void>
}

const configContext = createContext<ConfigContext>({ loading: true } as ConfigContext)

export const useConfig = (): ConfigContext => {
  return useContext(configContext)
}

interface ConfigProviderProps {
  children: ReactNode
  configRepository: IConfigFileRepository
}

export const ConfigProvider = ({ children, configRepository }: ConfigProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState<IToolboxConfig>()

  const saveConfig = async (config: IToolboxConfig) => {
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

  const addAgent = async (agent: IAgentConfigRecord) => {
    if (!config) {
      return
    }
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
