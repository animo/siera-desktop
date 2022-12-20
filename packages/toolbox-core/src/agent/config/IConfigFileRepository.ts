import type { IToolboxConfig } from './IToolboxConfig'

export interface IConfigFileRepository {
  readConfiguration(): Promise<IToolboxConfig>
  writeConfiguration(config: IToolboxConfig): Promise<void>
}
