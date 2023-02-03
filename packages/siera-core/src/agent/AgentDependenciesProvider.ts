import type { AgentDependencies } from '@aries-framework/core'

export interface AgentDependenciesProvider {
  createAgentDependencies(): Promise<AgentDependencies>
}
