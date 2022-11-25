import type { IAgentDependenciesProvider } from './IAgentDependenciesProvider'
import type { Agent, InitConfig } from '@aries-framework/core'

import { ConsoleLogger, HttpOutboundTransport, LogLevel, WsOutboundTransport } from '@aries-framework/core'

import { AgentFactory } from './AgentFactory'
import { sampleTransactions } from './SampleTransactions'

export const agentInitializer = async (
  providedConfig: InitConfig,
  dependenciesProvider: IAgentDependenciesProvider
): Promise<Agent> => {
  const agentProvider = new AgentFactory(dependenciesProvider)

  const config: InitConfig = {
    logger: new ConsoleLogger(LogLevel.warn),
    indyLedgers: [
      {
        id: 'bcovin-test-net',
        indyNamespace: 'bcovin-test-net',
        isProduction: false,
        genesisTransactions: sampleTransactions,
      },
    ],
    ...providedConfig,
  }

  const agent = await agentProvider.createAgent(config)

  agent.registerOutboundTransport(new WsOutboundTransport())
  agent.registerOutboundTransport(new HttpOutboundTransport())

  await agent.initialize()

  return agent
}
