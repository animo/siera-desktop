import type { AgentDependencies } from '@aries-framework/core'

export interface IAgentDependenciesProvider {
  createAgentDependencies(): Promise<AgentDependencies>
}
