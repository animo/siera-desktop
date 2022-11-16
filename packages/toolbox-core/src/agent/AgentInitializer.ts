import type { IAgentDependenciesProvider } from './IAgentDependenciesProvider'
import type { Agent, InitConfig } from '@aries-framework/core'

import { ConsoleLogger, LogLevel } from '@aries-framework/core'

import { AgentFactory } from './AgentFactory'

export const agentInitializer = async (
  providedConfig: InitConfig,
  dependenciesProvider: IAgentDependenciesProvider
): Promise<Agent> => {
  const agentProvider = new AgentFactory(dependenciesProvider)

  const config: InitConfig = {
    logger: new ConsoleLogger(LogLevel.warn),
    ...providedConfig,
  }

  const agent = await agentProvider.createAgent(config)

  await agent.initialize()

  return agent
}
