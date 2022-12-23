import type { AgentConfigRecord } from '@animo/toolbox-core'
import type { ReactNode } from 'react'

import React, { createContext, useContext, useMemo, useState } from 'react'

import { useConfig } from './ConfigProvider'

export interface IAgentContext {
  agents: AgentConfigRecord[]
  currentAgentId?: string
  setCurrentAgentId: (id: string | undefined) => void
  addAgent: (agent: AgentConfigRecord) => Promise<void>
  loading: boolean,
  logout: () => void
}

const AgentManagerContext = createContext<IAgentContext>({} as IAgentContext)

export const useAgentManager = (): IAgentContext => {
  return useContext(AgentManagerContext)
}

export const useCurrentAgentRecord = (): AgentConfigRecord | undefined => {
  const { currentAgentId, agents } = useAgentManager()

  return useMemo(() => {
    return agents.find((agent) => agent.id === currentAgentId)
  }, [agents, currentAgentId])
}

interface AgentManagerProviderProps {
  children?: ReactNode
}

export const AgentManagerProvider = ({ children }: AgentManagerProviderProps) => {
  const { config, addAgent, loading } = useConfig()
  const [currentAgentId, setCurrentAgentId] = useState<string>()

  const logout = () => {
    setCurrentAgentId(undefined)
  }

  return (
    <AgentManagerContext.Provider
      value={{
        setCurrentAgentId,
        currentAgentId,
        agents: config?.agents || [],
        addAgent,
        loading,
        logout,
      }}
    >
      {children}
    </AgentManagerContext.Provider>
  )
}
