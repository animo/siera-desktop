import type { AgentConfigRecord } from './AgentConfigRecord'

export interface ToolboxConfig {
  agents: AgentConfigRecord[]
}
export const validateToolboxConfig = (config: ToolboxConfig) => {
  if (!Array.isArray(config.agents)) throw new Error('agents must be an array')
  config.agents.forEach((agentConfig) => {
    if (typeof agentConfig.id !== 'string') throw new Error('agent name must be a string')
    if (typeof agentConfig.name !== 'string') throw new Error('agent url must be a string')
  })
}
