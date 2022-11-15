import type { InitConfig } from '@aries-framework/core'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

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
  setAgents: Dispatch<SetStateAction<IAgentContext['agents']>>
}

const AgentManagerContext = createContext<IAgentContext>({} as IAgentContext)

export const useAgentManager = (): IAgentContext => {
  return useContext(AgentManagerContext)
}

export const useCurrentAgentRecord = (): IAgentRecord | undefined => {
  const { currentAgentId, agents } = useAgentManager()

  return agents.find((agent) => agent.id === currentAgentId)
}

export const AgentManagerProvider = ({ children }: { children?: ReactNode }) => {
  const [currentAgentId, setCurrentAgentId] = useState<string>()
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
