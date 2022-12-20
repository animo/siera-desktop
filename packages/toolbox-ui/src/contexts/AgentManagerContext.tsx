import type { IAgentConfigRecord } from '@animo/toolbox-core'
import type { ReactNode } from 'react'

import React, { createContext, useContext, useState } from 'react'

import { useConfig } from './ConfigProvider'

export interface IAgentContext {
  agents: IAgentConfigRecord[]
  currentAgentId?: string
  setCurrentAgentId: (id: string | undefined) => void
  addAgent: (agent: IAgentConfigRecord) => Promise<void>
  loading: boolean
}

const AgentManagerContext = createContext<IAgentContext>({} as IAgentContext)

export const useAgentManager = (): IAgentContext => {
  return useContext(AgentManagerContext)
}

export const useCurrentAgentRecord = (): IAgentConfigRecord | undefined => {
  const { currentAgentId, agents } = useAgentManager()

  return agents.find((agent) => agent.id === currentAgentId)
}

interface AgentManagerProviderProps {
  children?: ReactNode
}

export const AgentManagerProvider = ({ children }: AgentManagerProviderProps) => {
  const { config, addAgent, loading } = useConfig()
  const [currentAgentId, setCurrentAgentId] = useState<string>()

  return (
    <AgentManagerContext.Provider
      value={{
        setCurrentAgentId,
        currentAgentId,
        agents: config?.agents || [],
        addAgent,
        loading,
      }}
    >
      {children}
    </AgentManagerContext.Provider>
  )
}
