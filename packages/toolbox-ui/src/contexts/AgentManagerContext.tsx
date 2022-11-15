import type { InitConfig } from '@aries-framework/core'
import type { ReactNode } from 'react'

import React, { createContext, useContext, useState } from 'react'

export interface IAgentRecord {
  id: string
  name: string
  agentConfig: InitConfig
}

export interface IAgentContext {
  agents: IAgentRecord[]
  currentAgentId?: string
  setCurrentAgentId: (id: string | undefined) => void
  setAgents: (agents: IAgentRecord[]) => void
}

const AgentManagerContext = createContext<IAgentContext | null>(null)

export const useAgentManager = (): IAgentContext => {
  const context = useContext(AgentManagerContext)

  if (!context) {
    throw new Error('Missing the provider for the context')
  }

  return context
}

export const AgentManagerProvider = ({ children }: { children?: ReactNode }) => {
  const [currentAgentId, setCurrentAgentId] = useState<string | undefined>()
  const [agents, setAgents] = useState<IAgentRecord[]>([])

  return (
    <AgentManagerContext.Provider
      value={{
        setCurrentAgentId,
        currentAgentId,
        agents,
        setAgents,
      }}
    >
      {children}
    </AgentManagerContext.Provider>
  )
}
