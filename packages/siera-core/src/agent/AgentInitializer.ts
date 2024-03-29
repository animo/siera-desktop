import type { AgentDependenciesProvider } from './AgentDependenciesProvider'
import type { Agent, InitConfig } from '@aries-framework/core'

import { ConsoleLogger, HttpOutboundTransport, LogLevel, WsOutboundTransport } from '@aries-framework/core'

import { AgentFactory } from './AgentFactory'
import { sampleTransactions } from './SampleTransactions'

export const agentInitializer = async (
  providedConfig: InitConfig,
  dependenciesProvider: AgentDependenciesProvider
): Promise<Agent> => {
  const agentProvider = new AgentFactory(dependenciesProvider)

  const config: InitConfig = {
    logger: new ConsoleLogger(LogLevel.warn),
    indyLedgers: [
      {
        id: 'bcovrin:test',
        indyNamespace: 'bcovrin:test',
        isProduction: false,
        genesisTransactions: sampleTransactions,
      },
    ],
    autoUpdateStorageOnStartup: true,
    ...providedConfig,
  }

  const agent = await agentProvider.createAgent(config)

  agent.registerOutboundTransport(new WsOutboundTransport())
  agent.registerOutboundTransport(new HttpOutboundTransport())

  await agent.initialize()

  return agent
}
