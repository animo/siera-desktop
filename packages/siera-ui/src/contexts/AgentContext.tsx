import type { AgentConfigRecord, AgentDependenciesProvider } from '@animo/siera-core'
import type { Agent } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { agentInitializer } from '@animo/siera-core/src/agent/AgentInitializer'
import AgentProvider from '@aries-framework/react-hooks'
import React, { useEffect, useState } from 'react'

import CredentialFormatDataProvider from './CredentialFormatDataProvider'
import ProofFormatDataProvider from './ProofsFormatDataProvider'

interface AgentContextProps {
  agentRecord?: AgentConfigRecord
  agentDependenciesProvider: AgentDependenciesProvider
}

interface ActiveAgent {
  id: string
  agent: Agent
}

export const AgentContext: React.FunctionComponent<PropsWithChildren & AgentContextProps> = ({
  children,
  agentRecord,
  agentDependenciesProvider,
}) => {
  const [activeAgent, setActiveAgent] = useState<ActiveAgent>()

  useEffect(() => {
    setActiveAgent(undefined)
    void (async () => {
      if (!agentRecord) return

      setActiveAgent({
        id: agentRecord.id,
        agent: await agentInitializer(agentRecord.agentConfig, agentDependenciesProvider),
      })
    })()

    return () => {
      activeAgent?.agent.shutdown()
    }
  }, [agentRecord?.id])

  return (
    <AgentProvider key={activeAgent?.id} agent={activeAgent?.agent}>
      <ProofFormatDataProvider agent={activeAgent?.agent}>
        <CredentialFormatDataProvider agent={activeAgent?.agent}>{children}</CredentialFormatDataProvider>
      </ProofFormatDataProvider>
    </AgentProvider>
  )
}
