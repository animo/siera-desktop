import type { Agent, InitConfig } from '@aries-framework/core'

import { AgentFactory } from '@animo/toolbox-core'
import { ConsoleLogger, LogLevel } from '@aries-framework/core'

import { ElectronAgentDependenciesProvider } from '../providers/ElectronAgentDependenciesProvider'

export const agentInitializer = async (providedConfig: InitConfig): Promise<Agent> => {
  const agentProvider = new AgentFactory(new ElectronAgentDependenciesProvider())

  const config: InitConfig = {
    logger: new ConsoleLogger(LogLevel.test),
    ...providedConfig,
  }

  const agent = await agentProvider.createAgent(config)

  await agent.initialize()

  return agent
}
