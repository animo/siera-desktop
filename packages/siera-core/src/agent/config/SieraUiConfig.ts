import type { AgentConfigRecord } from './AgentConfigRecord'

import { SieraUiConfigSchema } from './adapters/SieraUiConfigValidation'
export interface SieraUiConfig {
  colorScheme: 'dark' | 'light'
  agents: AgentConfigRecord[]
}

export const validateAndParseSieraUiConfig = (config: unknown): SieraUiConfig => {
  return SieraUiConfigSchema.parse(config) as SieraUiConfig
}
