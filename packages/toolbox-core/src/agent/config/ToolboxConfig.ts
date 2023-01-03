import type { AgentConfigRecord } from './AgentConfigRecord'

import { z } from 'zod'
export interface ToolboxConfig {
  colorScheme: 'dark' | 'light'
  agents: AgentConfigRecord[]
}

const AgentConfigRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  agentConfig: z.any(),
})

const ToolboxConfigSchema = z.object({
  colorScheme: z.enum(['dark', 'light']).default('light'),
  agents: z.array(AgentConfigRecordSchema).default([]),
})

export const validateAndParseToolboxConfig = (config: unknown): ToolboxConfig => {
  return ToolboxConfigSchema.parse(config) as ToolboxConfig
}
