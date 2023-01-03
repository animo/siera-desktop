import type { ToolboxConfig } from './ToolboxConfig'

export interface ConfigFileRepository {
  readConfiguration(): Promise<ToolboxConfig>
  writeConfiguration(config: ToolboxConfig): Promise<void>
}
