import type { AgentConfigRecord, AgentDependenciesProvider } from '@animo/siera-core'
import type { ReactNode } from 'react'

import { agentInitializer } from '@animo/siera-core/src/agent/AgentInitializer'
import { showNotification } from '@mantine/notifications'
import React, { createContext, useContext, useMemo, useState } from 'react'

import { openConfirmActionModal } from '../modals/ConfirmActionModal'

import { useConfigUnsafe } from './ConfigProvider'

export interface IAgentContext {
  agents: AgentConfigRecord[]
  currentAgentId?: string
  setCurrentAgentId: (id: string | undefined) => void
  addAgent: (agent: AgentConfigRecord) => Promise<void>
  removeAgent: (agentId: string) => Promise<void>
  loading: boolean
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
  agentDependenciesProvider: AgentDependenciesProvider
}

export const AgentManagerProvider = ({ children, agentDependenciesProvider }: AgentManagerProviderProps) => {
  const { config, addAgent, removeAgent: removeAgentFromConfig, loading } = useConfigUnsafe()
  const [currentAgentId, setCurrentAgentId] = useState<string>()

  const logout = () => {
    setCurrentAgentId(undefined)
  }

  const removeAgent = async (agentId: string) => {
    const agentRecord = config?.agents.find((agent) => agent.id === agentId)
    if (!agentRecord) {
      showNotification({
        title: 'Error',
        message: `Agent with id ${agentId} not found`,
      })
      return
    }

    try {
      const loadedAgent = await agentInitializer(agentRecord.agentConfig, agentDependenciesProvider)
      await loadedAgent.wallet.delete()
      await loadedAgent.shutdown()
    } catch (error) {
      openConfirmActionModal({
        title: 'Error while removing agent',
        description: 'Do you want to continue? The agent wallet will not be deleted.',
        onConfirm: async () => {
          await removeAgentFromConfig(agentId)
        },
      })
      return
    }

    await removeAgentFromConfig(agentId)
  }

  return (
    <AgentManagerContext.Provider
      value={{
        setCurrentAgentId,
        currentAgentId,
        agents: config?.agents || [],
        addAgent,
        removeAgent,
        loading,
        logout,
      }}
    >
      {children}
    </AgentManagerContext.Provider>
  )
}
