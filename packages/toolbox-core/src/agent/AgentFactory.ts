import type { IAgentDependenciesProvider } from './IAgentDependenciesProvider'
import type { InitConfig } from '@aries-framework/core'

import { Agent } from '@aries-framework/core'

export interface IAgentFactory {
  createAgent(agentConfig: InitConfig): Promise<Agent>
}

export class AgentFactory implements IAgentFactory {
  public constructor(private readonly agentDependenciesProvider: IAgentDependenciesProvider) {}

  public async createAgent(agentConfig: InitConfig): Promise<Agent> {
    const agentDependencies = await this.agentDependenciesProvider.createAgentDependencies()

    return new Agent(agentConfig, agentDependencies)
  }
}
