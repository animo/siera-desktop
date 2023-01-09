import type { AgentDependenciesProvider } from './AgentDependenciesProvider'
import type { InitConfig } from '@aries-framework/core'

import { Agent } from '@aries-framework/core'

export interface IAgentFactory {
  createAgent(agentConfig: InitConfig): Promise<Agent>
}

export class AgentFactory implements IAgentFactory {
  public constructor(private readonly agentDependenciesProvider: AgentDependenciesProvider) {}

  public async createAgent(config: InitConfig): Promise<Agent> {
    const dependencies = await this.agentDependenciesProvider.createAgentDependencies()

    return new Agent({
      config,
      dependencies,
    })
  }
}
