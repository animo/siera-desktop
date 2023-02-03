import type { AgentConfigRecord, ConfigFileRepository, SieraUiConfig } from '@animo/siera-core'
import type { ReactNode } from 'react'

import React, { createContext, useContext, useEffect, useState } from 'react'

type ConfigContext = {
  config?: SieraUiConfig
  loading: boolean
  addAgent: (agent: AgentConfigRecord) => Promise<void>
  setColorScheme: (colorScheme: 'dark' | 'light') => Promise<void>
}

const configContext = createContext<ConfigContext>({ loading: true } as ConfigContext)

export const useConfig = () => {
  const configCtx = useContext(configContext)
  if (!configCtx.config) throw new Error('Config not loaded yet')

  return {
    ...configCtx,
    config: configCtx.config,
  }
}

export const useConfigUnsafe = () => {
  return useContext(configContext)
}

interface ConfigProviderProps {
  children: ReactNode
  configRepository: ConfigFileRepository
}

export const ConfigProvider = ({ children, configRepository }: ConfigProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState<SieraUiConfig>()

  const saveConfig = async (config: SieraUiConfig) => {
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

  const setColorScheme = async (colorScheme: 'dark' | 'light') => {
    if (!config) return

    const updatedConfig = { ...config, colorScheme }
    await saveConfig(updatedConfig)
    setConfig(updatedConfig)
  }

  return (
    <configContext.Provider
      value={{
        config,
        loading,
        addAgent,
        setColorScheme,
      }}
    >
      {children}
    </configContext.Provider>
  )
}
