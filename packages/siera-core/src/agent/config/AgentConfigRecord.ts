import type { InitConfig } from '@aries-framework/core'

export interface AgentConfigRecord {
  id: string
  name: string
  agentConfig: InitConfig
}
