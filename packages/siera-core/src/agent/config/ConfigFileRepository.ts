import type { SieraUiConfig } from './SieraUiConfig'

export interface ConfigFileRepository {
  readConfiguration(): Promise<SieraUiConfig>
  writeConfiguration(config: SieraUiConfig): Promise<void>
}
