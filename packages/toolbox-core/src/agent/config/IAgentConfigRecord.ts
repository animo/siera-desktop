import type { InitConfig } from '@aries-framework/core'

export interface IAgentConfigRecord {
  id: string
  name: string
  agentConfig: InitConfig
}
