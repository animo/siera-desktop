import type { AgentConfigRecord } from './AgentConfigRecord'

import { ToolboxConfigSchema } from './adapters/ToolBoxConfigValidation'
export interface ToolboxConfig {
  colorScheme: 'dark' | 'light'
  agents: AgentConfigRecord[]
}

export const validateAndParseToolboxConfig = (config: unknown): ToolboxConfig => {
  return ToolboxConfigSchema.parse(config) as ToolboxConfig
}
